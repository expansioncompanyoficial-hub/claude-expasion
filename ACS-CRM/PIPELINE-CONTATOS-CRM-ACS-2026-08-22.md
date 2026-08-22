# PIPELINE DE CONTATOS WHATSAPP → CRM ACS

Registro do processo criado em 22/08/2026 para exportar a base de contatos
do WhatsApp da ACS, qualificar as clientes e alimentar o futuro CRM.

## ⚠️ Regra de privacidade (inegociável)

**Este repositório é PÚBLICO.** Nenhum arquivo com nome, telefone ou
qualquer dado pessoal de cliente pode ser commitado aqui — nem CSV, nem
XLSX, nem prints. Os dados vivem no Google Drive da conta (privado) e nos
arquivos enviados no chat da sessão. Aqui ficam só os scripts e a
documentação do processo. Se um dia o repositório virar privado, essa
decisão pode ser revista.

## O processo (reproduzível em ~5 minutos)

1. **Exportar contatos** — abrir `web.whatsapp.com` logado, F12 → Console,
   colar `SCRIPT-EXPORT-CONTATOS-WHATSAPP.js`. Baixa
   `contatos-whatsapp.csv` (abre direto no Excel BR) e
   `contatos-whatsapp.json`. Extração instantânea, direto da memória do
   WhatsApp Web — sem extensão, sem rolar lista.
2. **Exportar conversas** — mesmo procedimento com
   `SCRIPT-EXPORT-CONVERSAS-WHATSAPP.js`. Baixa `conversas-whatsapp.csv`
   com `Nome;Telefone;UltimaConversa;DiasAtras` (data da última mensagem
   de cada conversa individual).
3. **Gerar a planilha** — `GERAR-PLANILHA-CONTATOS.py` (Python + openpyxl)
   limpa, deduplica, classifica os números (celular BR novo/antigo, fixo,
   0800, internacional) e monta o XLSX com abas Resumo, Todos os
   Contatos, Disparo Celular BR e Fixos-Internacional-Outros.
4. **Cruzar 1+2** para qualificação térmica (feito na sessão do Claude).

Ambos os scripts têm dois métodos: A (módulos internos `WAWebCollections`)
e B (IndexedDB `model-storage`, reserva). Se o WhatsApp mudar os módulos
internos, o método B segura; se os dois quebrarem, atualizar os scripts.

## Fotografia da base em 22/08/2026 (números agregados)

- 1.190 contatos válidos e únicos (1.191 exportados, 1 descartado)
- 1.138 celulares Brasil (1.038 formato novo, 100 formato antigo)
- 52 fixos/0800/internacionais
- 112 registros sem nome salvo
- Concentração de DDD 19 e 11 (Campinas/região e São Paulo)

## Qualificação térmica (régua definida para o CRM)

| Classe | Última conversa | Uso |
|---|---|---|
| **Quente** | ≤ 60 dias | prioridade de disparo (vídeo-convite de evento) |
| **Morno** | 61–180 dias | segunda onda, mensagem de reaquecimento |
| **Frio** | 181–365 dias | nutrição antes de oferta |
| **Inativa** | > 365 dias | ação estratégica de reativação, separada |

## Campos do CRM — o que já existe e o que falta

| Campo | Origem | Status |
|---|---|---|
| Nome | export WhatsApp | ✅ |
| Telefone | export WhatsApp | ✅ |
| Última conversa | script de conversas | ✅ (roda o script 2) |
| Qualificação quente/morno/frio | régua acima | ✅ (derivado) |
| **Data da última compra** | **NÃO existe no WhatsApp** | ⚠️ precisa vir do controle de vendas da ACS (planilha, notinhas, maquininha). Sem isso, a coluna fica vazia no CRM |

## Disparo em massa — resumo de risco

Disparar para a base inteira de uma vez via extensão do Chrome tem risco
real de bloqueio do número. Regras acordadas: começar só pelas quentes
(≤60 dias), lotes pequenos com intervalo, mensagem personalizada com o
vídeo, e parar imediatamente se aparecer aviso do WhatsApp ou queda de
entrega. A análise completa de risco fica registrada na sessão do Claude.
