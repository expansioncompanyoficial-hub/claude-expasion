#!/usr/bin/env python3
"""Testes da geração de fundo de capa.

    python3 -m unittest discover -s tests -v

Sem pytest e sem jsonschema de propósito: o projeto não tem dependência
Python nenhuma e os testes precisam rodar em qualquer máquina que tenha o
repositório, sem passo de instalação.

Nenhum teste recebe caminho por variável de ambiente para começar a funcionar.
A raiz é descoberta — foi um dos defeitos apontados no pacote de origem, e a
regressão está em `TestPortabilidade`.
"""
import json
import os
import sys
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ_TESTE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RAIZ_TESTE / ".claude/skills/carrossel-viral/scripts"))

from PIL import Image  # noqa: E402

from capas import esquema, estrategia, imagem, memoria, padroes, prompt, provedor, qa, raiz  # noqa: E402
from capas.marca import MarcaDesconhecida, resolve  # noqa: E402


def pedido(**over):
    base = {"brand_id": "expansion",
            "content": {"headline": "Sua coleção tem prazo de validade"},
            "output": {}}
    base.update(over)
    return base


CONCEITO = {
    "id": "C1", "nome": "Poeira no ombro", "explicacao": "o tempo visível",
    "metafora": "poeira acumulando no ombro da peça",
    "padrao": "", "cena": "a rack of unsold garments in a closing store",
    "ponto_focal": "the shoulder line of one dress under hard light",
    "area_headline": "terço inferior", "emocao": "urgencia",
    "risco": "poeira pode ler como glitter", "compatibilidade": "alta",
    "nota": "8",
}


def conceitos(n=3):
    variantes = [
        ("C1", "poeira acumulando no ombro da peça", "the shoulder line of one dress"),
        ("C2", "calendário impresso na etiqueta", "an oversized garment tag"),
        ("C3", "arara esvaziando ao longo do mês", "an emptying clothing rail"),
    ]
    return [dict(CONCEITO, id=i, nome=i, metafora=m, ponto_focal=f)
            for i, m, f in variantes[:n]]


# ── configuração ──────────────────────────────────────────────────────────
class TestMarca(unittest.TestCase):
    def test_carrega_cliente(self):
        m = resolve("expansion")
        self.assertEqual(m["cta"], "DIAGNÓSTICO")
        self.assertEqual(m["paleta"]["accent"], "#FF9901")

    def test_recusa_cliente_inexistente(self):
        with self.assertRaises(MarcaDesconhecida) as c:
            resolve("cliente-que-nao-existe")
        self.assertIn("expansion", str(c.exception))

    def test_herda_da_ficha(self):
        m = resolve("expansion")
        e = esquema.valida_entrada(pedido(), m)
        self.assertEqual(e["output"]["boldness"], m["boldness"])
        self.assertEqual(e["content"]["audience"], m["publico"])

    def test_nao_mistura_clientes(self):
        a, b = resolve("expansion"), resolve("prime")
        self.assertNotEqual(a["cta"], b["cta"])
        self.assertNotEqual(a["nicho"], b["nicho"])

    def test_nao_inventa_identidade(self):
        # A ficha da Expansion não tem estilo fotográfico. O resolver precisa
        # dizer que falta, e não preencher com o padrão de outra marca.
        m = resolve("expansion")
        self.assertEqual(m["capa"]["photographic_style"], "")
        self.assertIn("cover_generation.photographic_style", m["faltando"])


# ── entrada ───────────────────────────────────────────────────────────────
class TestEntrada(unittest.TestCase):
    def setUp(self):
        self.m = resolve("expansion")

    def test_headline_valida(self):
        e = esquema.valida_entrada(pedido(), self.m)
        self.assertTrue(e["content"]["headline"])

    def test_tema_sozinho_basta(self):
        p = pedido(content={"theme": "janela de venda pelo preço cheio"})
        e = esquema.valida_entrada(p, self.m)
        self.assertEqual(e["content"]["headline"], "")
        self.assertTrue(e["content"]["theme"])

    def test_headline_ou_tema_obrigatorio(self):
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(pedido(content={"audience": "x"}), self.m)
        self.assertIn("headline", str(c.exception))

    def test_campos_aninhados_em_content(self):
        # No pacote de origem `headline` era validada na raiz. Aqui a raiz só
        # aceita brand_id, content e output.
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(
                {"brand_id": "expansion", "headline": "x", "content": {"theme": "y"}},
                self.m)
        self.assertIn("headline", str(c.exception))

    def test_forbidden_elements_precisa_ser_lista(self):
        p = pedido()
        p["content"]["forbidden_elements"] = "texto"
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(p, self.m)
        self.assertIn("esperava lista", str(c.exception))

    def test_forbidden_elements_padrao_e_lista(self):
        e = esquema.valida_entrada(pedido(), self.m)
        self.assertEqual(e["content"]["forbidden_elements"], [])

    def test_boldness_precisa_ser_numero(self):
        p = pedido(); p["output"]["boldness"] = "alto"
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(p, self.m)
        self.assertIn("boldness", str(c.exception))

    def test_boldness_bool_nao_passa_por_numero(self):
        p = pedido(); p["output"]["boldness"] = True
        with self.assertRaises(esquema.EntradaInvalida):
            esquema.valida_entrada(p, self.m)

    def test_emotion_sem_padrao_fora_do_enum(self):
        e = esquema.valida_entrada(pedido(), self.m)
        self.assertIsNone(e["content"]["emotion"])
        p = pedido(); p["content"]["emotion"] = "raiva"
        with self.assertRaises(esquema.EntradaInvalida):
            esquema.valida_entrada(p, self.m)

    def test_include_text_sempre_falso(self):
        e = esquema.valida_entrada(pedido(), self.m)
        self.assertIs(e["output"]["include_text"], False)
        p = pedido(); p["output"]["include_text"] = True
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(p, self.m)
        self.assertIn("include_text", str(c.exception))

    def test_campo_desconhecido_recusado(self):
        p = pedido(); p["output"]["estilo"] = "x"
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_entrada(p, self.m)
        self.assertIn("desconhecido", str(c.exception))


# ── saída ─────────────────────────────────────────────────────────────────
class TestSaida(unittest.TestCase):
    def corpo(self, **over):
        base = {"job_id": "x", "status": "ready_for_review", "brand_id": "expansion",
                "provider": "manual", "variations": [], "recommended": None,
                "warnings": [], "limitations": [], "qa": {}}
        base.update(over)
        return base

    def test_vazia_com_status_de_sucesso_e_invalida(self):
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_saida(self.corpo())
        self.assertIn("lista vazia", str(c.exception))

    def test_vazia_com_falha_e_valida(self):
        esquema.valida_saida(self.corpo(status="generation_failed"))

    def test_variacao_incompleta_recusada(self):
        with self.assertRaises(esquema.EntradaInvalida) as c:
            esquema.valida_saida(self.corpo(variations=[{"id": "C1"}]))
        self.assertIn("variations[0]", str(c.exception))

    def test_campo_obrigatorio_faltando(self):
        c = self.corpo(status="generation_failed"); del c["provider"]
        with self.assertRaises(esquema.EntradaInvalida) as e:
            esquema.valida_saida(c)
        self.assertIn("provider", str(e.exception))


# ── conceitos ─────────────────────────────────────────────────────────────
class TestConceitos(unittest.TestCase):
    def test_tres_conceitos_distintos_passam(self):
        estrategia.valida_conceitos(conceitos(3))

    def test_menos_de_tres_recusado(self):
        with self.assertRaises(ValueError):
            estrategia.valida_conceitos(conceitos(2))

    def test_conceitos_quase_iguais_recusados(self):
        c = conceitos(3)
        c[1]["metafora"] = c[0]["metafora"] + " em azul"
        c[1]["ponto_focal"] = c[0]["ponto_focal"]
        with self.assertRaises(ValueError) as e:
            estrategia.valida_conceitos(c)
        self.assertIn("mesmo conceito", str(e.exception))

    def test_conceito_incompleto_recusado(self):
        c = conceitos(3); c[0]["ponto_focal"] = ""
        with self.assertRaises(ValueError):
            estrategia.valida_conceitos(c)

    def test_leitura_precisa_cobrir_os_eixos(self):
        with self.assertRaises(ValueError) as e:
            estrategia.valida_leitura({"assunto": "x"})
        self.assertIn("metafora", str(e.exception))

    def test_contexto_le_o_carrossel_inteiro(self):
        txt = "\n".join(f"texto {i} - linha {i}" for i in range(1, 19))
        ctx = estrategia.contexto(txt, resolve("expansion"))
        self.assertEqual(ctx["n_slides"], 9)
        self.assertEqual(len(ctx["argumento"]), 7)
        self.assertTrue(ctx["cta"])

    def test_contexto_recusa_conteudo_vazio(self):
        with self.assertRaises(ValueError) as e:
            estrategia.contexto("", resolve("expansion"))
        self.assertIn("headline isolada", str(e.exception))


# ── padrões e cooldown ────────────────────────────────────────────────────
class TestPadroes(unittest.TestCase):
    def test_sem_biblioteca_declara_limitacao(self):
        d = padroes.diagnostico({"pattern_cooldown_days": 30}, "moda")
        if not d["biblioteca"]["completa"]:
            self.assertTrue(d["limitacao"])
            self.assertEqual(d["disponiveis"], [])

    def test_cooldown_respeita_a_janela(self):
        hoje = datetime(2026, 8, 21, tzinfo=timezone.utc)
        perfil = {"pattern_cooldown_days": 30, "recent_pattern_ids": [
            {"id": "P03", "em": (hoje - timedelta(days=6)).isoformat()},
            {"id": "P07", "em": (hoje - timedelta(days=90)).isoformat()}]}
        presos = padroes.em_cooldown(perfil, hoje)
        self.assertIn("P03", presos)
        self.assertNotIn("P07", presos)

    def test_id_sem_data_conta_como_recente(self):
        presos = padroes.em_cooldown({"recent_pattern_ids": ["P01"]})
        self.assertIn("P01", presos)


# ── prompt ────────────────────────────────────────────────────────────────
class TestPrompt(unittest.TestCase):
    def setUp(self):
        self.m = resolve("expansion")
        self.saida = esquema.valida_entrada(pedido(), self.m)["output"]

    def test_headline_nunca_entra_no_prompt(self):
        mau = dict(CONCEITO,
                   cena="a poster reading sua colecao tem prazo de validade")
        with self.assertRaises(ValueError) as e:
            prompt.compoe(mau, self.m, self.saida,
                          {"headline": "Sua coleção tem prazo de validade"})
        self.assertIn("headline", str(e.exception))

    def test_negativo_sempre_proibe_texto(self):
        r = prompt.compoe(CONCEITO, self.m, self.saida, {"headline": "x"})
        for termo in ("text", "letters", "watermark", "logo"):
            self.assertIn(termo, r["negative_prompt"])

    def test_area_de_headline_declarada_no_prompt(self):
        r = prompt.compoe(CONCEITO, self.m, self.saida, {"headline": "x"})
        self.assertIn("bottom third", r["prompt"])

    def test_proibidos_da_ficha_entram_no_negativo(self):
        m = dict(self.m, capa=dict(self.m["capa"], forbidden_elements=["manequim"]))
        r = prompt.compoe(CONCEITO, m, self.saida, {"headline": "x"})
        self.assertIn("manequim", r["negative_prompt"])


# ── provedor ──────────────────────────────────────────────────────────────
class TestProvedor(unittest.TestCase):
    def test_manual_sem_arquivo_recusa(self):
        # REGRESSÃO: é o equivalente ao teste que falhava no pacote de origem
        # (comando de ingestão sem URL nem arquivo). Antes seguia em frente e
        # devolvia sucesso com lista vazia.
        with self.assertRaises(provedor.ErroProvedor) as e:
            provedor.Manual().gera({"prompt": "x"}, tempfile.mkdtemp())
        self.assertIn("sem arquivo", str(e.exception))

    def test_manual_com_arquivo_inexistente_recusa(self):
        with self.assertRaises(provedor.ErroProvedor) as e:
            provedor.Manual().gera(
                {"arquivos": ["/nao/existe.png"]}, tempfile.mkdtemp())
        self.assertIn("não encontrado", str(e.exception))

    def test_formato_nao_suportado_recusa(self):
        with tempfile.TemporaryDirectory() as d:
            ruim = Path(d) / "x.gif"; ruim.write_bytes(b"GIF89a")
            with self.assertRaises(provedor.ErroProvedor) as e:
                provedor.Manual().gera({"arquivos": [str(ruim)]}, d)
            self.assertIn("formato", str(e.exception))

    def test_briefing_nao_finge_geracao(self):
        r = provedor.Briefing().gera({"prompt": "x"}, tempfile.mkdtemp())
        self.assertEqual(r["arquivos"], [])
        self.assertTrue(r["avisos"])

    def test_provedor_indisponivel_recusa(self):
        with self.assertRaises(provedor.ErroProvedor):
            provedor.escolhe("provedor-que-nao-existe")

    def test_orcamento_antes_de_gerar(self):
        o = provedor.orcamento(provedor.Manual(), 3, 2)
        self.assertEqual(o["imagens"], 5)
        self.assertIn("custo_total", o)

    def test_disponiveis_nao_vaza_credencial(self):
        os.environ["FAKE_TOKEN_TESTE"] = "segredo-que-nao-pode-vazar"
        try:
            provedor.POR_API["falso"] = "FAKE_TOKEN_TESTE"
            texto = json.dumps(provedor.disponiveis())
            self.assertNotIn("segredo-que-nao-pode-vazar", texto)
            self.assertIn("FAKE_TOKEN_TESTE", texto)
        finally:
            provedor.POR_API.pop("falso", None)
            del os.environ["FAKE_TOKEN_TESTE"]


# ── processamento ─────────────────────────────────────────────────────────
def imagem_de_teste(w=1600, h=1200, cor=(40, 30, 20)):
    img = Image.new("RGB", (w, h), cor)
    for x in range(0, w, 40):
        for y in range(0, h, 40):
            img.putpixel((x, y), (250, 200, 60))
    return img


class TestProcessamento(unittest.TestCase):
    def test_enquadra_nos_tres_formatos(self):
        img = imagem_de_teste()
        for f, (w, h) in esquema.FORMATOS.items():
            r = imagem.enquadra(img, w, h)
            self.assertEqual(r.size, (w, h), f)

    def test_corte_protege_a_faixa_da_headline(self):
        # Fonte mais larga que alta: o corte é vertical. Com texto embaixo, o
        # topo é que tem de ceder — o assunto não pode descer para a faixa.
        alta = Image.new("RGB", (1080, 2000), (10, 10, 10))
        for y in range(0, 200):
            for x in range(0, 1080, 7):
                alta.putpixel((x, y), (255, 255, 255))
        r = imagem.enquadra(alta, 1080, 1350, "50% 50%", "bottom")
        topo = r.crop((0, 0, 1080, 100))
        self.assertLess(qa.densidade_borda(topo), 0.9)

    def test_foco_muda_o_recorte(self):
        larga = Image.new("RGB", (2400, 1350), (0, 0, 0))
        for x in range(0, 300):
            for y in range(0, 1350, 5):
                larga.putpixel((x, y), (255, 255, 255))
        esquerda = imagem.enquadra(larga, 1080, 1350, "0% 50%")
        direita = imagem.enquadra(larga, 1080, 1350, "100% 50%")
        self.assertGreater(qa.densidade_borda(esquerda), qa.densidade_borda(direita))

    def test_derivadas_menores_que_o_original(self):
        with tempfile.TemporaryDirectory() as d:
            img = imagem.enquadra(imagem_de_teste(), 1080, 1350)
            r = imagem.derivadas(img, d, "t")
            self.assertLess(Image.open(r["miniatura"]).width, 400)
            self.assertLess(Image.open(r["previa"]).width, 700)

    def test_imagem_pequena_recusada(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "p.png"
            Image.new("RGB", (200, 250), (0, 0, 0)).save(p)
            with self.assertRaises(imagem.ImagemInvalida) as e:
                imagem.abre(p)
            self.assertIn("pequeno", str(e.exception))

    def test_arquivo_invalido_recusado(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "x.png"; p.write_bytes(b"nao sou png")
            with self.assertRaises(imagem.ImagemInvalida):
                imagem.abre(p)


# ── QA ────────────────────────────────────────────────────────────────────
SAIDA = {"width": 1080, "height": 1350}


class TestQA(unittest.TestCase):
    def test_baixo_contraste_reprova(self):
        chapada = Image.new("RGB", (1080, 1350), (128, 128, 128))
        r = qa.avalia(chapada, SAIDA)
        self.assertFalse(r["tecnico"]["aprovado"])
        self.assertTrue(any("contraste" in a for a in r["tecnico"]["alertas"]))

    def test_sem_ponto_focal_alerta(self):
        chapada = Image.new("RGB", (1080, 1350), (128, 128, 128))
        r = qa.avalia(chapada, SAIDA)
        self.assertTrue(any("ponto focal" in a for a in r["tecnico"]["alertas"]))

    def test_dimensao_errada_reprova(self):
        r = qa.avalia(Image.new("RGB", (800, 800), (0, 0, 0)), SAIDA)
        self.assertFalse(r["tecnico"]["aprovado"])

    def test_faixa_de_texto_poluida_alerta(self):
        img = Image.new("RGB", (1080, 1350), (0, 0, 0))
        for y in range(900, 1350, 2):
            for x in range(0, 1080, 2):
                img.putpixel((x, y), (255, 255, 255))
        r = qa.avalia(img, SAIDA, "bottom")
        self.assertTrue(any("faixa da headline" in a or "texto dentro" in a
                            for a in r["tecnico"]["alertas"]))

    def test_semantico_nunca_vem_respondido(self):
        r = qa.avalia(imagem.enquadra(imagem_de_teste(), 1080, 1350), SAIDA)
        self.assertFalse(r["semantico"]["respondido"])
        self.assertIsNone(r["semantico"]["nota"])
        self.assertTrue(r["semantico"]["perguntas"])


# ── estados e memória ─────────────────────────────────────────────────────
class TestMemoria(unittest.TestCase):
    def test_caminho_feliz(self):
        j = {"job_id": "t", "status": "draft"}
        for e in ("generating", "generated", "ready_for_review", "selected", "approved"):
            memoria.transiciona(j, e)
        self.assertEqual(j["status"], "approved")

    def test_pulo_de_estado_recusado(self):
        with self.assertRaises(memoria.TransicaoInvalida):
            memoria.transiciona({"status": "draft"}, "approved")

    def test_recusa_sem_motivo_recusada(self):
        with self.assertRaises(ValueError):
            memoria.registra_feedback({}, "C1", "recusado", "")

    def test_aprovado_e_estado_final(self):
        with self.assertRaises(memoria.TransicaoInvalida):
            memoria.transiciona({"status": "approved"}, "generating")

    def test_id_de_job_e_seguro_para_caminho(self):
        d = memoria.pasta(memoria.novo_id("../../etc"))
        self.assertNotIn("..", str(d))
        self.assertTrue(str(d).startswith(str(raiz.capas())))


# ── portabilidade e segurança ─────────────────────────────────────────────
class TestPortabilidade(unittest.TestCase):
    def test_raiz_descoberta_sem_variavel(self):
        self.assertNotIn("EXPANSION_RAIZ", os.environ)
        self.assertEqual(raiz.raiz(), RAIZ_TESTE)

    def test_variavel_pode_sobrescrever(self):
        with tempfile.TemporaryDirectory() as d:
            (Path(d) / "CLAUDE.md").write_text("x")
            (Path(d) / ".claude").mkdir()
            os.environ["EXPANSION_RAIZ"] = d
            try:
                self.assertEqual(raiz.raiz(), Path(d).resolve())
            finally:
                del os.environ["EXPANSION_RAIZ"]

    def test_relativo_nao_vaza_a_maquina(self):
        r = raiz.relativo(RAIZ_TESTE / "CARROSSEIS")
        self.assertFalse(r.startswith("/"))
        self.assertNotIn("Users", r)


class TestSemCaminhoAbsoluto(unittest.TestCase):
    """Nenhum caminho de outra máquina no código — nem em comentário.

    Os padrões são montados em pedaços de propósito: escritos por extenso,
    este próprio arquivo passaria a conter o que ele proíbe, e o teste
    reprovaria a si mesmo. Foi o que aconteceu na primeira versão.
    """

    def test_nenhum_caminho_de_outra_maquina_no_codigo(self):
        base = RAIZ_TESTE / ".claude/skills/carrossel-viral/scripts/capas"
        proibidos = ("/" + "Users/", "C:" + chr(92), "/home/" + "escritorio")
        achados = []
        for arq in sorted(base.glob("*.py")) + [Path(__file__)]:
            texto = arq.read_text(encoding="utf-8")
            for p in proibidos:
                if p in texto:
                    achados.append(f"{arq.name}: {p!r}")
        # Mensagem curta: `assertNotIn` despejaria o arquivo inteiro no log.
        self.assertEqual(achados, [], "caminho de outra máquina: " + "; ".join(achados))


if __name__ == "__main__":
    unittest.main(verbosity=2)
