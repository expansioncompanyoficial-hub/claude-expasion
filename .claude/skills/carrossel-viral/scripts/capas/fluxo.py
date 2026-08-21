#!/usr/bin/env python3
"""Orquestração da geração de fundo de capa.

Entra depois que a headline é aprovada e sai antes da composição — a capa
final continua sendo montada pelo mecanismo que já existe (`render_carrossel`
no lado Python, o Estúdio no lado do navegador), com a fonte e a régua da
marca. Este módulo nunca escreve texto em imagem.

A ordem é a do pedido, e cada passo tem uma razão para estar onde está:

    marca → contexto → conceitos → padrões → prompt → orçamento
         → provedor → processamento → QA → estados → registro

Orçamento **antes** do provedor: é o último ponto em que dá para desistir sem
gastar. Depois disso a imagem já custou.
"""
from pathlib import Path

from . import estrategia, imagem, memoria, padroes, prompt as compositor, provedor as prov
from . import qa as visual_qa
from .esquema import valida_entrada, valida_saida
from .marca import resolve
from .raiz import relativo

TETO_REGENERACOES = 2


def abre_job(brand_id, texto_carrossel, pedido=None, leitura=None):
    """Monta o job em `draft`, com tudo que precede a geração."""
    marca = resolve(brand_id)

    # O carrossel é lido ANTES da validação, e não depois: a headline mora
    # nele, não no pedido. Validar primeiro obrigaria quem chama a repetir a
    # frase — e frase repetida à mão é frase que diverge na terceira vez.
    pedido = dict(pedido or {})
    conteudo = dict(pedido.get("content") or {})
    contexto = estrategia.contexto(
        texto_carrossel, marca, conteudo.get("objective") or "alcance")

    # Quando o pedido traz headline, ela tem de ser a mesma do carrossel.
    # Divergência significa que alguém editou o texto depois de aprovar a
    # capa, e o fundo passaria a ilustrar uma frase que não existe mais.
    if conteudo.get("headline") and contexto["headline"]:
        a = str(conteudo["headline"]).strip().lower()
        b = contexto["headline"].strip().lower()
        if a != b:
            raise ValueError(
                "a headline do pedido não é a do carrossel.\n"
                f"  pedido:    {conteudo['headline']}\n"
                f"  carrossel: {contexto['headline']}\n"
                "Aprove de novo antes de gerar: fundo feito para outra frase "
                "ilustra o carrossel errado.")
    conteudo.setdefault("headline", contexto["headline"])
    pedido["content"] = conteudo
    entrada = valida_entrada({"brand_id": brand_id, **pedido}, marca)

    if leitura is not None:
        estrategia.valida_leitura(leitura)

    diag = padroes.diagnostico(marca["capa"], marca["nicho"])
    job = {
        "job_id": memoria.novo_id(brand_id),
        "status": "draft",
        "brand_id": marca["brand_id"],
        "criado_em": memoria.agora(),
        "entrada": entrada,
        "contexto": contexto,
        "leitura": leitura,
        "padroes": diag,
        "conceitos": [],
        "variations": [],
        "recommended": None,
        "provider": None,
        "warnings": [],
        "limitations": [],
        "qa": {"tecnico": None, "semantico": None},
        "historico": [],
        "feedback": [],
        "regeneracoes": 0,
    }
    if marca["faltando"]:
        job["warnings"].append(
            "ficha incompleta para geração de capa: "
            + ", ".join(marca["faltando"])
            + ". O sistema segue sem inventar identidade — preencha na ficha "
              "do cliente quando quiser mais controle.")
    if diag["limitacao"]:
        job["limitations"].append(diag["limitacao"])
    memoria.grava(job)
    return job, marca


def prepara(job, marca, conceitos):
    """Valida os conceitos e compõe um prompt para cada um."""
    estrategia.valida_conceitos(
        conceitos, minimo=job["entrada"]["output"]["variations"],
        # Com biblioteca carregada, cada conceito tem de declarar de qual
        # padrão saiu — é o que alimenta o cooldown. Sem biblioteca, exigir
        # isso obrigaria a inventar um id.
        exige_padrao=job["padroes"]["biblioteca"]["completa"])
    saida = job["entrada"]["output"]
    contexto = {**job["contexto"],
                "forbidden_elements": job["entrada"]["content"]["forbidden_elements"]}
    preparados = []
    for c in conceitos:
        p = compositor.compoe(c, marca, saida, contexto)
        preparados.append({**c, **p})
    job["conceitos"] = preparados
    memoria.grava(job)
    return job


def orcamento(job, provedor):
    return prov.orcamento(provedor, len(job["conceitos"]), TETO_REGENERACOES)


def gera(job, marca, provedor, arquivos=None, quem="operador"):
    """Executa a geração e o QA técnico. Nunca chama prompt de imagem."""
    if not job["conceitos"]:
        raise ValueError("prepare os conceitos antes de gerar.")
    memoria.transiciona(job, "generating", quem)
    job["provider"] = provedor.nome
    destino = memoria.pasta(job["job_id"])
    saida = job["entrada"]["output"]
    posicao = saida["text_position"]

    variacoes, avisos, custo = [], [], 0.0
    arquivos = list(arquivos or [])
    for i, c in enumerate(job["conceitos"]):
        pedido = {"prompt": c["prompt"], "negative_prompt": c["negative_prompt"],
                  "width": saida["width"], "height": saida["height"],
                  "seed": saida.get("seed"), "n": 1}
        if provedor.nome == "manual":
            if i >= len(arquivos):
                break
            pedido["arquivos"] = [arquivos[i]]
        try:
            r = provedor.gera(pedido, destino / c["id"])
        except prov.ErroProvedor as e:
            avisos.append(f"{c['id']}: {e}")
            continue
        custo += r.get("custo", 0.0)
        avisos.extend(r.get("avisos", []))
        for caminho in r["arquivos"]:
            img = imagem.abre(caminho)
            enquadrada = imagem.enquadra(
                img, saida["width"], saida["height"],
                c.get("foco", "50% 50%"), posicao)
            base = f"{c['id']}-fundo"
            arquivo = imagem.salva(enquadrada, destino / f"{base}.png")
            derivadas = imagem.derivadas(enquadrada, destino, base)
            variacoes.append({
                "id": c["id"], "concept": c["nome"], "file": relativo(arquivo),
                "thumbnail": relativo(derivadas["miniatura"]),
                "preview": relativo(derivadas["previa"]),
                "width": enquadrada.width, "height": enquadrada.height,
                "prompt": c["prompt"], "negative_prompt": c["negative_prompt"],
                "pattern": c.get("padrao"), "seed": saida.get("seed"),
                "qa": qa_de(enquadrada, saida, posicao),
            })

    job["variations"] = variacoes
    job["warnings"].extend(avisos)
    job["custo"] = round(custo, 4)

    if not variacoes:
        memoria.transiciona(
            job, "generation_failed", quem,
            "nenhuma imagem foi produzida" if provedor.gera_imagem
            else "modo briefing: prompt pronto, imagem nenhuma")
        if not provedor.gera_imagem:
            job["limitations"].append(
                "nenhum provedor de imagem configurado nesta conta. O que saiu "
                "daqui é briefing: conceito, prompt e negative prompt. Traga o "
                "arquivo pelo provedor manual para seguir o fluxo.")
        memoria.grava(job)
        return job

    memoria.transiciona(job, "generated", quem)
    reprovadas = [v for v in variacoes if not v["qa"]["tecnico"]["aprovado"]]
    if len(reprovadas) == len(variacoes):
        memoria.transiciona(job, "qa_failed", "qa",
                            "todas as variações reprovaram no QA técnico")
    else:
        memoria.transiciona(job, "ready_for_review", "qa")
        melhor = max((v for v in variacoes if v["qa"]["tecnico"]["aprovado"]),
                     key=lambda v: v["qa"]["tecnico"]["notas"].get("nitidez", 0))
        job["recommended"] = melhor["id"]
    job["qa"] = {
        "tecnico": {"aprovadas": len(variacoes) - len(reprovadas),
                    "total": len(variacoes)},
        # Explícito de propósito: enquanto ninguém olhar, o semântico está em
        # aberto. Não existe nota semântica calculada.
        "semantico": {"respondido": False,
                      "perguntas": list(visual_qa.PERGUNTAS_SEMANTICAS)},
    }
    memoria.grava(job)
    return job


def qa_de(img, saida, posicao):
    return visual_qa.avalia(img, saida, posicao)


def seleciona(job, variacao_id, quem="operador"):
    ids = [v["id"] for v in job["variations"]]
    if variacao_id not in ids:
        raise ValueError(
            f"{variacao_id!r} não está entre as variações ({', '.join(ids) or 'nenhuma'}).")
    job["selected"] = variacao_id
    memoria.transiciona(job, "selected", quem)
    memoria.grava(job)
    return job


def aprova(job, marca, quem="operador"):
    memoria.transiciona(job, "approved", quem)
    escolhida = next((v for v in job["variations"] if v["id"] == job.get("selected")), None)
    if escolhida and escolhida.get("pattern"):
        memoria.marca_padrao_usado(marca["capa"], escolhida["pattern"])
    memoria.registra_feedback(job, job.get("selected"), "aprovado", quem=quem)
    memoria.grava(job)
    return job


def saida_publica(job):
    """O payload da API, já validado contra o schema de saída."""
    corpo = {
        "job_id": job["job_id"], "status": job["status"],
        "brand_id": job["brand_id"], "provider": job.get("provider"),
        "variations": job["variations"], "recommended": job.get("recommended"),
        "selected": job.get("selected"),
        "warnings": job["warnings"], "limitations": job["limitations"],
        "qa": job["qa"], "custo": job.get("custo", 0.0),
    }
    return valida_saida(corpo)
