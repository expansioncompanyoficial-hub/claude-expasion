# 01 — BASE DE EVIDÊNCIAS

Engenharia reversa dos roteiros de **@elias.maman**.
Documento vivo. Registra o que foi observado — nunca o que foi suposto.

---

## 1. VALIDAÇÃO DE ACESSO (§3 do prompt mestre)

**Status: ACESSO ZERO ao material primário.** Verificado em 14/08/2026, por três
caminhos independentes, nesta sessão (Claude Code na web, container Linux efêmero).

| Caminho testado | Resultado |
|---|---|
| `WebFetch https://www.instagram.com/elias.maman/` | `EGRESS_BLOCKED` |
| `curl` direto ao perfil | `CONNECT tunnel failed, response 403` |
| Log do proxy (`/__agentproxy/status`) | `connect_rejected · gateway answered 403 · www.instagram.com:443` |
| Chromium local do container (Playwright instalado) | Sai pelo mesmo gateway — bloqueio idêntico |
| Conector de navegador (Claude in Chrome) | Não existe nesta sessão (`ListConnectors` → vazio) |

O bloqueio **não é do Instagram**. É a política de egress do ambiente: o gateway
negou também `lp.eliasmaman.com.br`, `erupcaodeseguidores.com`, `eliasmaman.com.br`
e `youtube.com`. Passam apenas `anthropic.com`, registries de pacote e os
conectores MCP (Drive, Gmail, GitHub, etc.).

### 1.1 O que está disponível / indisponível

| Elemento (§3.2) | Disponível? |
|---|---|
| Vídeo, áudio, legenda queimada, capa | ✗ |
| Data, duração, visualizações, curtidas, comentários | ✗ |
| Legenda do post, link individual | ✗ |
| Compartilhamentos e salvamentos | ✗ — **métrica privada**: só o dono do perfil vê. Indisponível por qualquer rota |

### 1.2 Consequência metodológica

Nenhuma análise de conteúdo foi produzida e nenhuma será produzida até a base
existir. O §2.2 e o §3.4 do prompt mestre são explícitos: *"nunca invente falas,
métricas, intenções ou bastidores"* e *"nunca finja ter assistido a um conteúdo
inacessível"*. Um playbook escrito agora seria um apanhado genérico de dicas de
rede social com o nome do Elias Maman colado em cima — exatamente o que o §"Resultado
Esperado" proíbe.

### 1.3 Material correlato encontrado (não substitui a base)

Busca no Drive por "Elias Maman" retornou:

- **`AAA07 - MAMAN`** (Drive, `expansiontimeproducoes@gmail.com`) — 11 arquivos MP4,
  ~2,7 GB, gravados em 31/07/2026. Pela vizinhança das pastas (`AAA01 CREDENCIAMENTO`,
  `AAA02 ENTRADA`, `AAA03 PALESTRA`, `AAA04 DEPOIMENTO`), é **bruto de câmera de um
  evento** — provavelmente Maman palestrando, filmado pela Expansion.
  **Não são os Reels dele.** É oratória de palco, não roteiro de vídeo curto: outro
  formato, outra função, outra mecânica de retenção. Serve como material
  complementar, jamais como base da engenharia reversa.
  *Obs.: o container não tem `ffmpeg` nem ASR — transcrever esses MP4 aqui é inviável.*
- **`Briefing Video Posicionamento - Nicolas Nascimento`** (Drive) — cita
  `@elias.maman` como *"referência principal"* para **cor, ritmo e retenção em
  conteúdo longo**. É a leitura que a casa já faz do estilo dele, e vale como
  hipótese a testar (H1, §4), não como evidência.

---

## 2. O QUE PRECISA CHEGAR (especificação de intake)

A profundidade exigida pelo prompt mestre (§5.2 a §5.9) depende de **texto literal
com marcação de tempo**. Assistir e resumir não basta: "frases incompletas",
"pausas", "tamanho médio das frases" e "tempo até a tensão" só são analisáveis
sobre transcrição cronometrada.

### 2.1 Por vídeo — obrigatório

| Campo | Por que é indispensável |
|---|---|
| **Transcrição literal com timestamps (~5s)** | Base de §5.3 (unidades funcionais), §5.4 (retenção), §5.7 (oralidade). Sem isso não há análise, só impressão |
| Link + data + duração exata | Ancoragem e ordenação temporal (§7 — evolução ao longo do tempo) |
| Views, curtidas, comentários | Único proxy público de desempenho |
| Legenda do post (copiada) | §5.9 — CTA muitas vezes mora na legenda, não na fala |
| Texto da capa | Primeiro estímulo antes do play (§5.2) |
| Descrição dos 3 primeiros segundos | O que **aparece**, não só o que é dito (§5.2, §5.8) |
| Sinais de edição | §5.8 — separar o que é roteiro do que é execução |

### 2.2 Sinais de edição — o mínimo utilizável

Não precisa de decupagem quadro a quadro. Precisa de:
`nº de cortes nos primeiros 10s` · `% do tempo em b-roll vs. câmera` ·
`legenda queimada (sim/não, estilo)` · `trilha (entra quando?)` ·
`zoom/pattern interrupt (onde?)`.

### 2.3 Formato de entrega

- Inventário → `_captura/INVENTARIO-EM.csv` (55 linhas já preparadas)
- Transcrições → `_captura/transcricoes/EM01.md`, `EM02.md`, … (modelo em
  `_captura/MODELO-TRANSCRICAO.md`)

---

## 3. CRITÉRIO DE SELEÇÃO — e uma correção necessária

O pedido foi **"os 40 mais virais"**. Está atendido: `EM01–EM40` são os de maior
desempenho. Mas registro o problema, porque ele é do método, não de gosto.

**Analisar só os virais mede sobreviventes.** O §4.1 do prompt mestre nomeia isso:
*"não selecione apenas os maiores resultados — isso criaria viés de sobrevivência"*.
Se todo vídeo analisado deu certo, todo padrão encontrado parece causar sucesso.
Sem os que **usaram a mesma estrutura e não performaram**, é impossível distinguir
*"isto funciona"* de *"isto ele sempre faz"* — e a diferença entre as duas é o
playbook inteiro.

Por isso o CSV reserva `EM41–EM55`: **15 vídeos de desempenho mediano ou baixo**,
do mesmo período. É o grupo de controle. Com ele, cada padrão ganha um teste real:
aparece nos virais **e falta** nos medianos? Então é candidato a causa. Aparece nos
dois? É assinatura de estilo, não alavanca de desempenho — distinção que o §7 exige.

**Custo:** ~35% mais coleta. **Sem isso:** a seção 7 (padrões) e o DNA (§8) saem
com confiança rebaixada de ALTA para MÉDIA, e assim serão marcados.

Se optar por não coletar o controle, a análise roda mesmo assim — com a limitação
declarada em cada conclusão afetada.

---

## 4. HIPÓTESES REGISTRADAS ANTES DA EVIDÊNCIA

Registradas agora, com data, para não serem confundidas depois com achados. São
**perguntas**, não conclusões. Cada uma será confirmada, refutada ou refinada.

| ID | Hipótese | Origem | Status |
|---|---|---|---|
| H1 | Retenção em conteúdo longo é o diferencial dele — sustentar vídeo acima da média sem perder audiência | Briefing interno da Expansion | ABERTA |
| H2 | O material público sugere ênfase em "níveis de atenção" e estrutura de gancho como sistema, não intuição | Descrição pública dos produtos dele | ABERTA — fonte é copy de venda, não o conteúdo orgânico |
| H3 | A edição (corte curto, b-roll pesado, legenda queimada) carrega parte da retenção que se creditaria ao roteiro | Padrão do formato; o briefing interno o descreve | ABERTA — é o teste central de §5.8 |

H3 é a mais importante. Se a retenção vier majoritariamente da execução, o playbook
precisa dizer isso com todas as letras — senão entrega-se a clientes um método
que não funciona sem o mesmo padrão de edição.

---

## 5. INVENTÁRIO

`EM01–EM55` — **0 preenchidos.** Aguardando coleta.

Nenhuma linha será preenchida por inferência.
