# -*- coding: utf-8 -*-
"""Aplica a régua de destaque na peça aberta da Expansion.

A régua, e ela vale para qualquer cliente:

  capa      · UM trecho. O sujeito da tensão — o que faz a frase valer.
              Nunca a frase inteira, nunca dois.
  headline  · um trecho, e só quando ela carrega o dado (data, número, prazo).
  corpo     · um trecho, dois no máximo. O que se marca é o NÚMERO, a DATA ou
              o PRAZO — o que a pessoa lembra depois de fechar o carrossel.
              Nunca o adjetivo, nunca o verbo.
  fonte     · nunca. "Fonte: CNC, 2026" é rodapé, não argumento.
  CTA       · o parágrafo inteiro já vai na cor; ali `**palavra**` é o peso.
"""
import json, pathlib, sys

MARCADO = [
 "texto 1 - COMO SUA LOJA COMPETE COM UMA BLUSINHA QUE CHEGA COM *OUTRA TRIBUTAÇÃO*?",
 "texto 2 - A CLIENTE COMPARA OS PREÇOS. SÓ QUE AS DUAS PEÇAS PAGAM CONTAS DIFERENTES.",
 "texto 3 - UMA REGRA MUDOU O PREÇO DO IMPORTADO EM *12 DE MAIO*",
 "texto 4 - Desde 12/05/2026, compras de até *US$ 50* no Remessa Conforme têm *alíquota federal de importação zerada*. O ICMS continua sendo cobrado, mas aquela cobrança federal deixou de entrar na conta. Fonte: Receita Federal, 2026.",
 "texto 5 - ESSA REGRA TEM *DATA PARA SER DECIDIDA*",
 "texto 6 - A *MP 1.357/2026* tem prazo de deliberação até *08/09*. A comissão já foi instalada e tem uma nova reunião marcada para 1º/09. Por isso, setembro pode trazer outra mudança na regra que chega ao preço das compras internacionais. Fonte: Congresso Nacional, 2026.",
 "texto 7 - A DIFERENÇA DE TRIBUTAÇÃO APARECE *ANTES DA CLIENTE ENTRAR NA LOJA*",
 "texto 8 - A CNC comparou os 22 produtos mais importados e calculou uma carga média de *76,48% no mercado nacional*, contra *25% nas plataformas do Remessa Conforme*. São 51,48 pontos de diferença dentro desse recorte. Fonte: CNC, agosto de 2026.",
 "texto 9 - NA TELA, A CLIENTE ENXERGA *O PREÇO FINAL*",
 "texto 10 - Ela encontra uma blusinha no aplicativo e outra na loja, compara os valores e decide a partir do que aparece na tela. Só que a etiqueta local carrega *uma estrutura de custos diferente*. Por isso, tentar acompanhar qualquer preço importado pode *apertar uma margem que já era curta*.",
 "texto 11 - A LOJA LOCAL TEM VANTAGENS QUE *O PACOTE NÃO CONSEGUE ENTREGAR*",
 "texto 12 - A cliente consegue *provar a peça no corpo*, conferir o tamanho, trocar com rapidez e *levar a compra no mesmo dia*. Por isso, a disputa melhora quando a loja transforma essas vantagens em motivo de compra, em vez de responder à comparação baixando a etiqueta.",
 "texto 13 - O CONTEÚDO PRECISA EXPLICAR POR QUE *A EXPERIÊNCIA LOCAL TEM VALOR*",
 "texto 14 - Um provador mostrando o caimento, uma vendedora orientando o tamanho e uma troca resolvida rapidamente *dão contexto ao preço*. Quando a comunicação mostra essas diferenças antes da objeção aparecer, a cliente consegue comparar *mais do que duas etiquetas*.",
 "texto 15 - O *DIA 8 DE SETEMBRO* PRECISA ESTAR NO CALENDÁRIO DA LOJA",
 "texto 16 - A regra atual ainda está em discussão, então a comunicação precisa acompanhar o que for decidido até *08/09*. Aí a loja consegue ajustar o discurso com o fato novo, mas continua vendendo aquilo que controla: *a peça, o atendimento, a curadoria e a experiência*.",
 "texto 17 - IMPOSTO MUDA. A MARGEM DA LOJA *CONTINUA PRECISANDO FECHAR*",
 "texto 18 - Uma mudança tributária pode alterar o preço do importado, mas não paga uma decisão ruim de desconto dentro da loja. Comenta **DIAGNÓSTICO** para olhar a conta e o posicionamento da sua operação. E, antes de mexer em preço por causa de imposto, leve isso pro seu contador.",
]

def nu(s):
    return s.replace('*', '')

est = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
exp = [c for c in est['clientes'] if c['id'] == 'expansion'][0]
peca = exp['pecas'][0]
antes = peca['txt'].split('\n')
# A caixa de texto deixa linhas em branco no fim; elas voltam como estavam.
cheias = [l for l in antes if l.strip()]
cauda = antes[len(cheias):]

assert len(cheias) == len(MARCADO), f'{len(cheias)} linhas, marquei {len(MARCADO)}'
for i, (a, b) in enumerate(zip(cheias, MARCADO), 1):
    assert a.strip() == nu(b).strip(), f'linha {i} mudou de conteúdo:\n  antes: {a}\n  agora: {nu(b)}'

peca['txt'] = '\n'.join(MARCADO + cauda)
pathlib.Path(sys.argv[2]).write_text(json.dumps(est, ensure_ascii=False), encoding='utf-8')

total = sum(b.count('*') // 2 for b in MARCADO)
print(f'texto idêntico ao original, só com marcação · {total} trechos marcados')
for i in range(9):
    h, c = MARCADO[i*2], MARCADO[i*2+1]
    print(f'  slide {i+1}: {h.count("*")//2} no título · {c.count("*")//2} no corpo')
