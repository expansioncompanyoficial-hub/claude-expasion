#!/usr/bin/env python3
"""Transcreve os áudios de uma exportação do WhatsApp (ZIP ou pasta).

Parte determinística da skill `transcrever-whatsapp`: localiza a exportação, casa cada
áudio com remetente/data/hora lidos do arquivo da conversa, decodifica, fatia em trechos
que respeitam o limite do modelo, transcreve e grava transcrição + manifesto.

A análise da conversa e a resposta ao cliente são escritas pelo Claude a partir daqui.

Uso:
    python3 transcribe_whatsapp.py EXPORTACAO [--out DIR] [--model tiny|base|small|medium]
                                   [--lang pt] [--sender NOME] [--since AAAA-MM-DD]
                                   [--engine auto|sherpa|faster-whisper|openai-whisper|mlx]
                                   [--max-audios N] [--no-cache]
"""
from __future__ import annotations
import argparse, hashlib, json, os, platform, re, shutil, sys, tempfile, time, wave, zipfile
from datetime import datetime
from pathlib import Path

AUDIO_EXT = {".opus", ".ogg", ".m4a", ".aac", ".mp3", ".wav", ".webm", ".mp4", ".amr", ".3gp", ".caf", ".flac"}
MAGIC = [(b"OggS", "ogg"), (b"ID3", "mp3"), (b"RIFF", "wav"), (b"fLaC", "flac"), (b"#!AMR", "amr")]
CHUNK_MAX_S, CHUNK_MIN_S, LOOKBACK_S = 28.0, 4.0, 7.0
SR = 16000
CACHE_DIR = Path(os.environ.get("XDG_CACHE_HOME", Path.home() / ".cache")) / "transcrever-whatsapp"
SHERPA_URL = "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-{m}.tar.bz2"

# ---------------------------------------------------------------- exportação

def abrir_exportacao(caminho: Path, destino: Path) -> Path:
    """Devolve uma pasta com o conteúdo da exportação. Nunca altera a origem."""
    if caminho.is_dir():
        return caminho
    if not zipfile.is_zipfile(caminho):
        raise SystemExit(f"[erro] não é ZIP nem pasta: {caminho}")
    alvo = destino / "export"
    alvo.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(caminho) as z:
        for m in z.infolist():
            # trava de path traversal
            dest = (alvo / m.filename).resolve()
            if not str(dest).startswith(str(alvo.resolve())):
                print(f"[aviso] entrada ignorada por caminho suspeito: {m.filename}", file=sys.stderr)
                continue
            z.extract(m, alvo)
    return alvo


def achar_conversa(pasta: Path) -> Path | None:
    cands = [p for p in pasta.rglob("*.txt") if p.is_file()]
    if not cands:
        return None
    def score(p: Path):
        n = p.name.lower()
        return (n.startswith("_chat"), "whatsapp" in n or "conversa" in n or "chat" in n, p.stat().st_size)
    return sorted(cands, key=score, reverse=True)[0]


def achar_audios(pasta: Path) -> list[Path]:
    achados = []
    for p in sorted(pasta.rglob("*")):
        if not p.is_file() or p.stat().st_size == 0:
            continue
        if p.suffix.lower() in AUDIO_EXT:
            achados.append(p); continue
        if p.suffix == "":                      # sem extensão: cheira o cabeçalho
            head = p.open("rb").read(16)
            if any(head.startswith(sig) for sig, _ in MAGIC) or head[4:8] in (b"ftyp",):
                achados.append(p)
    return achados

# ---------------------------------------------------------------- conversa

# iOS:      [dd/mm/aaaa, hh:mm:ss] Fulano: texto
# Android:  dd/mm/aaaa hh:mm - Fulano: texto
RE_IOS = re.compile(r"^\[(\d{1,2})/(\d{1,2})/(\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*\]\s*([^:]{1,80}?):\s?(.*)$")
RE_AND = re.compile(r"^(\d{1,2})/(\d{1,2})/(\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*[-–]\s*([^:]{1,80}?):\s?(.*)$")
RE_ANEXO = re.compile(r"<\s*(?:anexado|attached|adjunto|allegato)\s*:?\s*([^>]+?)\s*>|^\s*([^\s<>]+\.(?:opus|ogg|m4a|aac|mp3|wav|webm|mp4|amr))\s*(?:\((?:arquivo anexado|file attached)\))", re.I)
RE_OCULTO = re.compile(r"(áudio|audio|voice message|mensagem de voz)\s*(ocultad|omitid|omitted|hidden)", re.I)
RE_TS_NOME = re.compile(r"(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})")


def _limpa(s: str) -> str:
    return s.replace("‎", "").replace("‏", "").replace(" ", " ").replace("\xa0", " ")


def ler_conversa(caminho: Path) -> list[dict]:
    bruto = caminho.read_text(encoding="utf-8", errors="replace")
    msgs: list[dict] = []
    for linha in _limpa(bruto).splitlines():
        m = RE_IOS.match(linha) or RE_AND.match(linha)
        if not m:
            if msgs:                                   # continuação da mensagem anterior
                msgs[-1]["texto"] += "\n" + linha
            continue
        d, mo, y, hh, mm, ss, quem, texto = m.groups()
        y = int(y); y += 2000 if y < 100 else 0
        try:
            quando = datetime(y, int(mo), int(d), int(hh), int(mm), int(ss or 0))
        except ValueError:
            continue
        msgs.append({"quando": quando, "remetente": quem.strip(), "texto": texto})
    return msgs


def casar_audios(msgs: list[dict], audios: list[Path]) -> list[dict]:
    """Casa cada arquivo de áudio com a mensagem que o anexou.

    1) pelo nome declarado em <anexado: ...>;  2) pelo carimbo de tempo no nome do arquivo;
    3) pela ordem cronológica dos marcadores de áudio restantes.
    """
    por_nome = {p.name: p for p in audios}
    usados: set[Path] = set()
    itens: list[dict] = []

    for msg in msgs:
        mm = RE_ANEXO.search(msg["texto"])
        if not mm:
            continue
        nome = (mm.group(1) or mm.group(2) or "").strip()
        p = por_nome.get(nome) or next((q for q in audios if q.name.endswith(nome)), None)
        if p and p.suffix.lower() in AUDIO_EXT | {""} and p not in usados:
            usados.add(p)
            itens.append({"arquivo": p, "remetente": msg["remetente"], "quando": msg["quando"], "origem": "anexo"})

    restantes = [p for p in audios if p not in usados]
    for p in list(restantes):
        t = RE_TS_NOME.search(p.name)
        if not t:
            continue
        alvo = datetime(*map(int, t.groups()))
        cand = min(msgs, key=lambda m: abs((m["quando"] - alvo).total_seconds()), default=None)
        if cand and abs((cand["quando"] - alvo).total_seconds()) <= 120:
            usados.add(p); restantes.remove(p)
            itens.append({"arquivo": p, "remetente": cand["remetente"], "quando": cand["quando"], "origem": "carimbo"})

    marcadores = [m for m in msgs if RE_OCULTO.search(m["texto"])]
    for p, msg in zip(sorted(restantes), marcadores):
        itens.append({"arquivo": p, "remetente": msg["remetente"], "quando": msg["quando"], "origem": "ordem"})
        usados.add(p)

    for p in [q for q in audios if q not in usados]:
        itens.append({"arquivo": p, "remetente": "(desconhecido)", "quando": None, "origem": "sem-vinculo"})

    itens.sort(key=lambda i: (i["quando"] is None, i["quando"] or datetime.max))
    return itens

# ---------------------------------------------------------------- áudio

def decodificar(entrada: Path, saida: Path) -> float:
    """Decodifica para WAV PCM 16 bits, mono, 16 kHz. Devolve a duração em segundos."""
    amostras = None
    try:
        import av, numpy as np
        c = av.open(str(entrada))
        res = av.AudioResampler(format="s16", layout="mono", rate=SR)
        partes = []
        for fr in c.decode(c.streams.audio[0]):
            partes += [r.to_ndarray().reshape(-1) for r in res.resample(fr)]
        partes += [r.to_ndarray().reshape(-1) for r in res.resample(None)]
        amostras = np.concatenate(partes) if partes else np.zeros(0, dtype="int16")
    except Exception:
        ff = shutil.which("ffmpeg") or os.environ.get("FFMPEG_BIN")
        if not ff:
            raise
        os.system(f'"{ff}" -nostdin -y -loglevel error -i "{entrada}" -vn -ac 1 -ar {SR} -c:a pcm_s16le "{saida}"')
        with wave.open(str(saida)) as w:
            return w.getnframes() / w.getframerate()
    with wave.open(str(saida), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(amostras.tobytes())
    return len(amostras) / SR


def fatiar(amostras, sr: int = SR):
    """Corta em trechos <= CHUNK_MAX_S, preferindo o ponto mais silencioso perto do fim."""
    import numpy as np
    passo = int(0.02 * sr)
    quadros = amostras[: len(amostras) // passo * passo].reshape(-1, passo)
    energia = np.sqrt((quadros.astype("float64") ** 2).mean(axis=1)) if len(quadros) else np.zeros(0)
    cortes, ini = [], 0
    n = len(amostras)
    while ini < n:
        fim = min(ini + int(CHUNK_MAX_S * sr), n)
        if fim < n:
            a = max(int((ini + CHUNK_MIN_S * sr) // passo), int((fim - LOOKBACK_S * sr) // passo))
            b = int(fim // passo)
            if b > a:
                fim = (a + int(np.argmin(energia[a:b]))) * passo
        cortes.append((ini, fim))
        ini = fim
    return cortes

# ---------------------------------------------------------------- motores

def baixar_sherpa(modelo: str) -> Path:
    destino = CACHE_DIR / "models" / f"sherpa-onnx-whisper-{modelo}"
    if destino.exists():
        return destino
    import tarfile, urllib.request
    destino.parent.mkdir(parents=True, exist_ok=True)
    tgz = destino.parent / f"{modelo}.tar.bz2"
    print(f"[motor] baixando modelo whisper-{modelo} (multilíngue)…", file=sys.stderr)
    urllib.request.urlretrieve(SHERPA_URL.format(m=modelo), tgz)
    with tarfile.open(tgz, "r:bz2") as t:
        t.extractall(destino.parent)
    tgz.unlink(missing_ok=True)
    return destino


def escolher_motor(pedido: str, modelo: str, lang: str):
    """Escada de alternativas. Devolve (nome, versao_modelo, funcao(amostras)->texto)."""
    import importlib.util as iu
    tem = lambda m: iu.find_spec(m) is not None
    apple = platform.system() == "Darwin" and platform.machine() == "arm64"
    ordem = [pedido] if pedido != "auto" else (
        (["mlx"] if apple else []) + ["faster-whisper", "sherpa", "openai-whisper"])

    for nome in ordem:
        try:
            if nome == "mlx" and tem("mlx_whisper"):
                import mlx_whisper
                repo = f"mlx-community/whisper-{modelo}-mlx"
                return nome, repo, lambda a: mlx_whisper.transcribe(
                    a, path_or_hf_repo=repo, language=lang, task="transcribe")["text"]

            if nome == "faster-whisper" and tem("faster_whisper"):
                from faster_whisper import WhisperModel
                mdl = WhisperModel(modelo, device="auto", compute_type="int8")
                def _fw(a):
                    segs, _ = mdl.transcribe(a, language=lang, task="transcribe",
                                             beam_size=5, vad_filter=True)
                    return " ".join(s.text.strip() for s in segs)
                return nome, modelo, _fw

            if nome == "sherpa" and tem("sherpa_onnx"):
                import sherpa_onnx
                d = baixar_sherpa(modelo)
                pref = "int8." if (d / f"{modelo}-encoder.int8.onnx").exists() else ""
                rec = sherpa_onnx.OfflineRecognizer.from_whisper(
                    encoder=str(d / f"{modelo}-encoder.{pref}onnx"),
                    decoder=str(d / f"{modelo}-decoder.{pref}onnx"),
                    tokens=str(d / f"{modelo}-tokens.txt"),
                    language=lang, task="transcribe", num_threads=max(1, (os.cpu_count() or 2)))
                def _sh(a):
                    s = rec.create_stream(); s.accept_waveform(SR, a); rec.decode_stream(s)
                    return s.result.text.strip()
                return nome, f"whisper-{modelo} (onnx)", _sh

            if nome == "openai-whisper" and tem("whisper"):
                import whisper
                mdl = whisper.load_model(modelo)
                return nome, modelo, lambda a: mdl.transcribe(a, language=lang, task="transcribe")["text"]
        except Exception as e:
            print(f"[motor] {nome} indisponível: {e}", file=sys.stderr)
    raise SystemExit("[erro] nenhum motor de transcrição disponível "
                     "(instale sherpa-onnx, faster-whisper, openai-whisper ou mlx_whisper)")

# ---------------------------------------------------------------- principal

def hms(s: float) -> str:
    return f"{int(s)//60:02d}:{int(s)%60:02d}"


def dur_br(s: float) -> str:
    return f"{int(s)//60}min{s % 60:04.1f}s"


def main() -> int:
    ap = argparse.ArgumentParser(description="Transcreve áudios de uma exportação do WhatsApp.")
    ap.add_argument("exportacao", type=Path)
    ap.add_argument("--out", type=Path, default=None)
    ap.add_argument("--model", default="small")
    ap.add_argument("--lang", default="pt")
    ap.add_argument("--engine", default="auto",
                    choices=["auto", "sherpa", "faster-whisper", "openai-whisper", "mlx"])
    ap.add_argument("--sender", default=None, help="transcreve só os áudios deste remetente (substring)")
    ap.add_argument("--since", default=None, help="só áudios a partir desta data (AAAA-MM-DD)")
    ap.add_argument("--max-audios", type=int, default=0)
    ap.add_argument("--no-cache", action="store_true")
    a = ap.parse_args()

    saida = a.out or Path.cwd() / f"transcricao-whatsapp-{datetime.now():%Y%m%d-%H%M%S}"
    saida.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="wa-"))
    avisos: list[str] = []

    try:
        pasta = abrir_exportacao(a.exportacao, tmp)
        chat = achar_conversa(pasta)
        audios = achar_audios(pasta)
        if not audios:
            print(json.dumps({"erro": "exportação sem arquivos de áudio — provavelmente exportada "
                                      "SEM MÍDIA; refaça com a opção 'Anexar mídia'",
                              "conversa_encontrada": bool(chat)}, ensure_ascii=False, indent=2))
            return 2
        msgs = ler_conversa(chat) if chat else []
        if not msgs:
            avisos.append("arquivo da conversa não encontrado ou ilegível: áudios sem remetente/hora")
        itens = casar_audios(msgs, audios)

        if a.sender:
            itens = [i for i in itens if a.sender.lower() in i["remetente"].lower()]
        if a.since:
            lim = datetime.fromisoformat(a.since)
            itens = [i for i in itens if i["quando"] and i["quando"] >= lim]
        if a.max_audios:
            itens = itens[-a.max_audios:]
        if not itens:
            print(json.dumps({"erro": "nenhum áudio após os filtros"}, ensure_ascii=False)); return 2

        motor, versao, transcrever = escolher_motor(a.engine, a.model, a.lang)
        print(f"[motor] {motor} · {versao} · {len(itens)} áudios", file=sys.stderr)
        import numpy as np
        cache_dir = CACHE_DIR / "transcricoes"; cache_dir.mkdir(parents=True, exist_ok=True)

        registros = []
        for n, it in enumerate(itens, 1):
            p: Path = it["arquivo"]
            h = hashlib.sha256(p.read_bytes()).hexdigest()
            ck = cache_dir / f"{h[:24]}-{motor}-{a.model}-{a.lang}.json"
            wavp = tmp / (p.stem + ".wav")
            try:
                dur = decodificar(p, wavp)
            except Exception as e:
                avisos.append(f"{p.name}: falha ao decodificar ({e})")
                registros.append({**it, "erro": str(e), "duracao_s": 0, "trechos": [], "hash": h})
                continue

            if ck.exists() and not a.no_cache:
                dados = json.loads(ck.read_text(encoding="utf-8"))
                print(f"[{n}/{len(itens)}] {p.name} — cache", file=sys.stderr)
            else:
                with wave.open(str(wavp)) as w:
                    amostras = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
                sinal = amostras.astype(np.float32) / 32768.0
                trechos = []
                t0 = time.time()
                for ini, fim in fatiar(amostras):
                    txt = transcrever(sinal[ini:fim])
                    trechos.append({"inicio_s": ini / SR, "fim_s": fim / SR, "texto": txt})
                dados = {"trechos": trechos, "duracao_s": dur, "segundos_cpu": round(time.time() - t0, 1)}
                ck.write_text(json.dumps(dados, ensure_ascii=False), encoding="utf-8")
                print(f"[{n}/{len(itens)}] {p.name} — {dur:.0f}s em {dados['segundos_cpu']:.0f}s", file=sys.stderr)
            registros.append({**it, **dados, "hash": h})

        # ---- saídas
        linhas = ["# Transcrição integral — áudios do WhatsApp", ""]
        linhas += [f"- Exportação: `{a.exportacao.name}`",
                   f"- Motor: **{motor}** · modelo **{versao}** · idioma `{a.lang}`",
                   f"- Áudios: **{len(registros)}** · duração total: "
                   f"**{sum(r.get('duracao_s',0) for r in registros)/60:.1f} min**", ""]
        if avisos:
            linhas += ["> **Avisos:** " + " · ".join(avisos), ""]
        for n, r in enumerate(registros, 1):
            q = r["quando"].strftime("%d/%m/%Y %H:%M:%S") if r["quando"] else "(sem data)"
            linhas += [f"## {n}. {r['remetente']} — {q}", "",
                       f"`{r['arquivo'].name}` · {dur_br(r.get('duracao_s', 0))}"
                       f" · vínculo: {r['origem']}", ""]
            if r.get("erro"):
                linhas += [f"> ⚠️ falhou: {r['erro']}", ""]; continue
            for t in r["trechos"]:
                linhas.append(f"**[{hms(t['inicio_s'])}]** {t['texto']}")
            linhas.append("")
        (saida / "transcricao_integral.md").write_text("\n".join(linhas), encoding="utf-8")

        manifesto = {
            "exportacao": str(a.exportacao), "gerado_em": datetime.now().isoformat(timespec="seconds"),
            "motor": motor, "modelo": versao, "idioma": a.lang,
            "conversa": chat.name if chat else None,
            "audios_encontrados": len(audios), "audios_processados": len(registros),
            "duracao_total_s": round(sum(r.get("duracao_s", 0) for r in registros), 1),
            "avisos": avisos,
            "arquivos": [{"arquivo": r["arquivo"].name, "remetente": r["remetente"],
                          "quando": r["quando"].isoformat() if r["quando"] else None,
                          "duracao_s": round(r.get("duracao_s", 0), 1), "sha256": r["hash"],
                          "vinculo": r["origem"], "trechos": len(r.get("trechos", [])),
                          "status": "erro" if r.get("erro") else "ok"} for r in registros],
        }
        (saida / "manifesto.json").write_text(json.dumps(manifesto, ensure_ascii=False, indent=2), encoding="utf-8")
        if chat:
            shutil.copy(chat, saida / "conversa.txt")
        print(json.dumps({"saida": str(saida), "audios": len(registros),
                          "duracao_min": round(manifesto["duracao_total_s"] / 60, 1),
                          "motor": motor, "modelo": versao}, ensure_ascii=False, indent=2))
        return 0
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
