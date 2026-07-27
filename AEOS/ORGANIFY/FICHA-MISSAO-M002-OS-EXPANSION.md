# FICHA DE MISSÃO — AEOS-M002

> **Rito:** Vol. XI — PHOENIX (Zero Legado) · **Aberta em:** 27/07/2026
> **Dono (Conselho de Administração):** Nicolas — Expansion
> **Status:** aberta · aguardando fechamento das lacunas bloqueantes
> **Substitui o alvo da M001:** o Organify deixa de ser objeto de redesenho e passa a ser **benchmark**

---

## 1. O PEDIDO, LITERAL

> "quero fazer algo inovador e disruptivo… minha empresa é de assessoria de marketing, eu preciso ter toda operação centralizada, eu ter um OS de gestão disso… tava usando esse organify, porém eu acho ele neném… preciso criar algo nessa pegada só que com todas melhorias que você pode fazer, preciso elevar ao nível máximo de tecnologia hoje permitida, preciso que seja totalmente automatizado e real time o sistema"

## 2. CONVERSÃO EM MISSÃO (Vol. V, Art. 43)

Uma tarefa ("criar um sistema") não é uma missão. A missão é:

**Construir o sistema operacional da Expansion: a superfície única onde a operação de uma assessoria de marketing é executada, observada e corrigida — de forma que o trabalho que hoje depende de alguém lembrar passe a acontecer sozinho, e que o estado real da operação seja visível no instante em que muda.**

O produto não é um painel. É a **redução do trabalho humano de coordenação a zero** onde isso for possível, e a **detecção precoce** onde não for.

## 3. O QUE MUDA EM RELAÇÃO À M001

| | M001 (encerrada) | M002 (esta) |
|---|---|---|
| Alvo | app.organifybr.com | O sistema operacional da Expansion |
| Papel do Organify | objeto de redesenho | benchmark e fonte de anti-padrões |
| Portão que bloqueia | Art. 30 (Digital Twin do alvo) | Art. 43 + Art. 118 (missão e problema, não produto) |
| Pergunta central | "como melhorar isto?" | "se isto nunca tivesse existido, como se faria hoje?" |

O Digital Twin do Organify **continua válido e útil** — como registro de como um concorrente resolveu, e de onde ele cobra caro. Não precisa mais ser completado até 80%.

## 4. CENTRO DE GRAVIDADE — A DECISÃO MAIS IMPORTANTE DESTA MISSÃO

O Organify organiza a agência em torno do **dinheiro**: dashboard financeiro, DRE, movimentações, recorrências, inadimplência, CRM. Tarefas e time são periferia.

Pelo registro das sessões anteriores, a operação da Expansion dói em outro lugar:

| Dor registrada | Onde o Organify a trata |
|---|---|
| Giro de time (dor nº 1) | Ø — só cadastro de usuário e permissão |
| Churn de cliente | mede `churn rate` depois que já aconteceu |
| Atendimento como gargalo | Ø — WhatsApp é caixa de mensagem, não processo |
| Dependência de freelancer | Ø |
| Onboarding de cliente novo | Ø |
| Padrão de entrega por nicho | Ø |

**Hipótese central da missão (confiança 65%, precisa ser confirmada pelo dono):** um OS de assessoria de marketing que centraliza dinheiro resolve contabilidade, não operação. O que trava a Expansion não é saber o saldo — é que **o trabalho depende de pessoas lembrarem de fazer, e pessoas saem.**

Se essa hipótese estiver certa, o centro do produto é **o trabalho e quem o executa**, e o financeiro é consequência instrumentada, não a tela principal.

## 5. TRADUÇÃO DOS DOIS REQUISITOS VAGOS

"Totalmente automatizado" e "real time" não são especificação. Pelo Vol. IX, Art. 91, automação tem uma escada, e o nível a alcançar precisa ser declarado por processo:

| Nível | O que significa | Exemplo na agência |
|---|---|---|
| 1 Assistir | mostra o que existe | painel de tarefas atrasadas |
| 2 Sugerir | propõe a próxima ação | "esse cliente não recebe post há 6 dias" |
| 3 Pré-preencher | entrega o rascunho pronto | relatório mensal já montado |
| 4 Executar com confirmação | faz e pede o ok | cobrança disparada após aprovação |
| 5 Executar sozinho, reversível | faz e avisa | recorrência lançada, com desfazer |
| 6 **Eliminar** | a etapa deixa de existir | ninguém "monta relatório" — ele nunca precisou ser montado |

**Regra da missão:** todo processo entra com um nível-alvo declarado. Automatizar um passo que não deveria existir é perpetuar desperdício (Vol. I, Art. 11).

"Real time" também se decompõe. Não existe um só:

- **Estado compartilhado ao vivo** — duas pessoas veem a mesma coisa mudar sem recarregar
- **Reação a evento externo** — mensagem de cliente, pagamento, prazo vencendo
- **Alerta antecipatório** — o sistema avisa antes de o problema acontecer

O terceiro é o que gera valor real numa agência. Os dois primeiros são infraestrutura para ele.

> **Nota de arquitetura, ainda como hipótese:** o Organify é Laravel + Livewire, com round-trip ao servidor a cada interação (605–1424 ms medidos). Essa escolha **impede** o item 1 acima de forma natural. Um produto cujo requisito declarado é estado ao vivo não pode nascer desse padrão — o que já é, por si, um achado de benchmark: o limite do Organify é arquitetural, não de esforço.

## 6. RESTRIÇÕES A CONFIRMAR COM O DONO

Do meu registro das sessões anteriores — **confirme, corrija ou descarte, porque decisão sobre memória velha é chute:**

- Time entre 6 e 15 pessoas
- Nicho declarado: loja de roupa
- Caixa historicamente apertado
- Edição de vídeo com freelancer
- Churn observado na faixa de 17 clientes em 90 dias

## 7. LACUNAS — ESTADO EM 27/07/2026

**Fechadas pelo dono:**

1. ~~É produto ou é interno?~~ → **Interno, uma agência só (Expansion), organizado por módulos.** Mas com uma correção importante de leitura: *"os clientes vão ter os acessos deles para ver o que precisam"*. Isso significa **usuários externos dentro do sistema**. Não é multi-inquilino entre agências, é **multi-parte dentro de uma agência**: time interno + clientes externos.
2. ~~Qual a primeira fatia?~~ → **"faça algo disruptivo"** — corte delegado à análise. Tratado como delegação explícita, resolvido por concepção competitiva (4 desenhos independentes → painel de juízes → síntese), não por escolha de improviso.

**Consequência de segurança da lacuna 1, elevada a requisito duro:** com cliente externo autenticando no sistema, o isolamento entre clientes passa a ser risco de gravidade máxima (G4 na escala do Vol. X). Um cliente ver dado de outro não é bug menor — é falha inaceitável, não sujeita a aceitação de risco.

**Reforço do benchmark:** o Organify resolve esse mesmo problema autenticando o cliente **apenas com CPF/CNPJ** (achado A-11 do Digital Twin). É o anti-padrão de referência desta missão: o que **não** fazer, com evidência de que alguém já fez.

**Ainda abertas:**

3. **Quem vai operar e manter?** Você sozinho comigo, ou existe alguém técnico no time? Define o teto de complexidade sustentável.
4. **Substitui o Organify quando?** Convivência ou corte seco — e o que acontece com os dados que já estão lá.
5. **Confirmação das restrições da seção 6** — são registro de sessões anteriores, não fato confirmado hoje.

## 8. ROTA PROPOSTA

1. Fechar as quatro lacunas acima.
2. **Mapa da operação real** — não do software: os processos da Expansion, quem executa, onde trava, o que se perde quando alguém sai.
3. **Zero Legado** (Vol. XI, Art. 118): projetar sem olhar tela de ninguém.
4. **Dupla proposta obrigatória** (Vol. XI): rota incremental e rota de reinvenção, com custo, risco e prazo de cada uma. A escolha é sua, não minha.
5. Arquitetura, fatia fina, e ponte de migração.

## 9. CONCERNS REGISTRADOS

**C-01.** Construir um OS completo é um projeto grande, e o próprio AEOS (Vol. I, Art. 4; Vol. IV, Art. 38) trata complexidade como falha até prova em contrário. O risco concreto: gastar meses construindo software enquanto a operação continua doendo. **Mitigação proposta, não imposta:** primeira fatia resolve um processo de ponta a ponta e entra em uso real antes de existir segunda fatia.

**C-02.** "Nível máximo de tecnologia hoje permitida" é critério de escolha ruim — tecnologia nova é custo de manutenção futuro. O critério do Vol. IV, Art. 32 é o inverso: parte-se do problema, e a tecnologia serve. Vou registrar cada escolha de stack com o gatilho que a justifica.
