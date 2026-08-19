#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Modelo de economia unitaria de agente de integracao de estagio.

Toda premissa entra por parametro explicito e sai impressa no relatorio,
para que nenhum numero apareca sem origem declarada.

Convencao central do modelo:
    VALOR DO CONTRATO != RECEITA DA EMPRESA.
    O contrato carrega bolsa + auxilio-transporte + seguro (repasse) e
    a taxa administrativa (receita). Somente a taxa e receita propria.
"""

from dataclasses import dataclass, field, asdict
import json


@dataclass
class Premissas:
    # --- Repasse (dinheiro que atravessa a empresa e vai para o estagiario/segurador)
    bolsa_media: float                  # R$/estagiario/mes
    auxilio_transporte: float           # R$/estagiario/mes
    seguro: float                       # R$/estagiario/mes

    # --- Receita
    taxa_modelo: str                    # 'percentual' | 'fixo'
    taxa_percentual: float              # % sobre a bolsa (se modelo percentual)
    taxa_fixa: float                    # R$/estagiario/mes (se modelo fixo)

    # --- Ocupacao: diferenca entre vagas contratadas e estagiarios ativos
    taxa_ocupacao: float                # 0-1, ativos / vagas previstas

    # --- Tributos sobre a RECEITA (taxa administrativa)
    aliquota_tributos: float            # 0-1, carga total sobre receita bruta de servico

    # --- Custos variaveis por estagiario ativo/mes
    custo_backoffice_por_estagiario: float
    custo_plataforma_por_estagiario: float

    # --- Custo de aquisicao/reposicao
    custo_por_vaga_preenchida: float    # R$ por preenchimento
    turnover_anual: float               # 0-1, fracao reposta por ano

    # --- Estrutura fixa mensal
    custo_fixo_mensal: float

    # --- Capital de giro
    prazo_recebimento_dias: int         # dias entre emitir a nota da taxa e receber
    adianta_bolsa: bool                 # empresa paga o estagiario antes de receber
    dias_retencao_repasse: int          # dias que o dinheiro da bolsa fica com o agente

    rotulo: str = ""


def simular(p: Premissas, vagas_contratadas: int) -> dict:
    ativos = vagas_contratadas * p.taxa_ocupacao

    # ---------- Fluxo bruto do contrato ----------
    repasse_unit = p.bolsa_media + p.auxilio_transporte + p.seguro
    if p.taxa_modelo == "percentual":
        taxa_unit = p.bolsa_media * p.taxa_percentual
    else:
        taxa_unit = p.taxa_fixa

    repasse_mes = repasse_unit * ativos
    receita_bruta_mes = taxa_unit * ativos
    contrato_faturado_mes = repasse_mes + receita_bruta_mes

    # ---------- Receita liquida ----------
    tributos_mes = receita_bruta_mes * p.aliquota_tributos
    receita_liquida_mes = receita_bruta_mes - tributos_mes

    # ---------- Custos ----------
    custo_var_mes = (p.custo_backoffice_por_estagiario +
                     p.custo_plataforma_por_estagiario) * ativos
    reposicoes_mes = ativos * p.turnover_anual / 12
    custo_recrut_mes = reposicoes_mes * p.custo_por_vaga_preenchida

    margem_contrib_mes = receita_liquida_mes - custo_var_mes - custo_recrut_mes
    resultado_op_mes = margem_contrib_mes - p.custo_fixo_mensal

    # ---------- Capital de giro e float ----------
    # Fluxo padrao confirmado em fonte primaria: a concedente transfere ao agente
    # a bolsa MAIS a taxa, e so entao o agente repassa ao estagiario. Logo o agente
    # NAO adianta bolsa no modelo padrao: ele carrega apenas o recebivel da propria
    # taxa, e ainda fica com FLOAT positivo entre o credito recebido e o repasse.
    base_giro_mes = contrato_faturado_mes if p.adianta_bolsa else receita_bruta_mes
    capital_giro = base_giro_mes * (p.prazo_recebimento_dias / 30.0)
    # Float: dinheiro de terceiros em transito. Nao e lucro e nao pode ser gasto,
    # mas dispensa capital de giro para a folha de estagiarios.
    float_medio = 0.0 if p.adianta_bolsa else repasse_mes * (p.dias_retencao_repasse / 30.0)

    pct = lambda num, den: (num / den * 100) if den else 0.0

    return {
        "rotulo": p.rotulo,
        "vagas_contratadas": vagas_contratadas,
        "estagiarios_ativos": round(ativos, 1),
        "contrato_faturado_mes": round(contrato_faturado_mes, 2),
        "contrato_faturado_ano": round(contrato_faturado_mes * 12, 2),
        "repasse_mes": round(repasse_mes, 2),
        "repasse_ano": round(repasse_mes * 12, 2),
        "receita_bruta_mes": round(receita_bruta_mes, 2),
        "receita_bruta_ano": round(receita_bruta_mes * 12, 2),
        "pct_receita_sobre_contrato": round(pct(receita_bruta_mes, contrato_faturado_mes), 2),
        "tributos_ano": round(tributos_mes * 12, 2),
        "receita_liquida_ano": round(receita_liquida_mes * 12, 2),
        "custo_variavel_ano": round(custo_var_mes * 12, 2),
        "custo_recrutamento_ano": round(custo_recrut_mes * 12, 2),
        "margem_contribuicao_ano": round(margem_contrib_mes * 12, 2),
        "custo_fixo_ano": round(p.custo_fixo_mensal * 12, 2),
        "resultado_operacional_ano": round(resultado_op_mes * 12, 2),
        "margem_op_sobre_receita_bruta_pct": round(pct(resultado_op_mes, receita_bruta_mes), 2),
        "margem_op_sobre_contrato_pct": round(pct(resultado_op_mes, contrato_faturado_mes), 2),
        "capital_giro_necessario": round(capital_giro, 2),
        "float_medio_terceiros": round(float_medio, 2),
        "receita_bruta_por_estagiario_mes": round(taxa_unit, 2),
    }


def ponto_de_equilibrio(p: Premissas) -> float:
    """Quantos estagiarios ATIVOS pagam a estrutura fixa."""
    if p.taxa_modelo == "percentual":
        taxa_unit = p.bolsa_media * p.taxa_percentual
    else:
        taxa_unit = p.taxa_fixa
    contrib_unit = (taxa_unit * (1 - p.aliquota_tributos)
                    - p.custo_backoffice_por_estagiario
                    - p.custo_plataforma_por_estagiario
                    - (p.turnover_anual / 12) * p.custo_por_vaga_preenchida)
    if contrib_unit <= 0:
        return float("inf")
    return p.custo_fixo_mensal / contrib_unit


def rodar(cenarios: dict, escalas=(100, 500, 1000, 5000)) -> dict:
    saida = {"premissas": {}, "resultados": {}, "ponto_equilibrio_ativos": {}}
    for nome, p in cenarios.items():
        saida["premissas"][nome] = asdict(p)
        pe = ponto_de_equilibrio(p)
        saida["ponto_equilibrio_ativos"][nome] = (round(pe, 1) if pe != float("inf")
                                                  else "inviavel: contribuicao unitaria <= 0")
        saida["resultados"][nome] = [simular(p, n) for n in escalas]
    return saida


if __name__ == "__main__":
    import sys
    cfg_path = sys.argv[1] if len(sys.argv) > 1 else None
    if not cfg_path:
        print("uso: modelo_financeiro.py <config.json>")
        sys.exit(1)
    with open(cfg_path) as fh:
        raw = json.load(fh)
    cenarios = {k: Premissas(**v) for k, v in raw.items()}
    print(json.dumps(rodar(cenarios), indent=2, ensure_ascii=False))
