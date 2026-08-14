# 01 · BASE DE EVIDÊNCIAS

## 1. Metodologia

**Coleta.** Extração completa da aba Reels do perfil via a própria API web do Instagram (sessão autenticada do usuário, conteúdo público), paginada até o fim: **682 Reels**, com código, data, duração, views, curtidas, comentários e legenda.

**Transcrição.** Coleta realizada em 14/08/2026 (as contagens variam alguns dígitos por hora). O criador queima legendas no vídeo em blocos de 2 a 4 palavras. Foi construído um extrator que baixa o arquivo do Reel, faz seek quadro a quadro (intervalo de 0,85–0,9s), recorta a faixa da legenda e monta mosaicos de 70–88 quadros por leitura. Assim a fala foi reconstruída **sem áudio**, com marcação de tempo. Blocos podem se repetir (a legenda dura ~0,9–1,1s), e podem existir lacunas entre amostras — marcadas com `[...]` ou colchetes. **Cobertura efetiva:** 8 vídeos com transcrição integral (EM01–EM07, EM09); 1 com abertura e fecho (EM11); 5 apenas com a abertura, ~0–40s (EM12, EM14, EM18, EM19, EM20). Em trechos de b-roll sem locução legendada existem intervalos sem amostra de até ~20s; onde isso ocorre, a ficha registra o salto de tempo.

**Classificação de evidência.** Todo item deste relatório recebe um dos rótulos:
`FATO` (observável no vídeo) · `PADRÃO` (recorrência medida) · `INTERPRETAÇÃO` (objetivo estratégico provável) · `HIPÓTESE` (não comprovado) · `LIMITE` (não verificável).

---

## 2. Retrato do inventário (682 Reels)

| Métrica | Valor |
|---|---|
| Período | 24/07/2023 → 10/08/2026 |
| Reels mapeados | 682 (de 791 posts totais) |
| Seguidores | ~1,50 milhão |
| Views — mediana | **69.631** |
| Views — média | 308.997 |
| Duração — mediana | **159 s** |
| Bio | "Marketing da Atenção / O mais conhecido vence o melhor, até que o melhor se torne o mais conhecido / Concorra a um Diagnóstico de Perfil" |

**Volume e média por ano** — `FATO`

| Ano | Reels | Views médias |
|---|---|---|
| 2023 | 106 | 190.172 |
| 2024 | 84 | 197.929 |
| 2025 | 297 | 429.140 |
| 2026 (até ago) | 195 | 238.448 |

**Leitura.** A média é 4,4× a mediana: a distribuição é extremamente assimétrica — um punhado de conteúdos carrega quase todo o alcance. `INTERPRETAÇÃO` → Isso já enfraquece qualquer promessa de "fórmula infalível": o próprio criador erra a maioria das vezes por esse critério. `INTERPRETAÇÃO`: o sistema dele não é "acertar sempre", é **manter um chassi barato de reproduzir e apostar muitas vezes** (297 Reels só em 2025 ≈ 1 a cada 1,2 dia).

---

## 3. As duas eras de formato — `PADRÃO` (alta confiança)

| | **Era 1 — 2023 a meados de 2024** | **Era 2 — 2025 a 2026** |
|---|---|---|
| Enquadramento | Selfie na mão, close no rosto, ambiente doméstico | Set fixo, terno, fundo escuro com luz quente pontual atrás; variante "podcast" (mesa + microfone) |
| Legenda queimada | **Ausente** | **Presente**, dourada, 2–4 palavras por bloco, centralizada |
| Cartela de título | Estática, fixa no topo, durante todo o vídeo ("Leia Esses 4 Livros e Fique Irreconhecível Ainda em 2023") | Ausente — a função foi absorvida pela legenda dinâmica |
| B-roll | Praticamente nenhum | Pesado: cenas de filmes, desenhos, reportagens, prints de perfis, gráficos |
| Duração típica | 78–90 s | 130–180 s |
| CTA | Palavra-chave nos comentários ("LIVRO", "GRUPO") | Palavra-chave ("DIAGNÓSTICO", "AUDIÊNCIA") + direct automatizado |
| Verificação | EM16, EM17 (mosaicos sem qualquer legenda) | EM01–EM15, EM18, EM19 |

`INTERPRETAÇÃO`: a Era 2 é uma **industrialização**. O criador trocou "ele falando" por "ele narrando um documentário curto". Isso permite (a) alongar a duração sem cansar, porque o olho recebe informação nova mesmo quando o argumento anda devagar; (b) emprestar autoridade das imagens de terceiros; (c) manter compreensão total com som desligado.

`HIPÓTESE`: a queda da média de 2025 (429k) para 2026 (238k) pode refletir aumento de volume, saturação do formato, mudança de distribuição da plataforma, ou pura variação amostral. **Não há como separar essas causas com dados públicos.** `LIMITE`

---

## 4. Inventário dos conteúdos analisados

### 4.1 Alto desempenho

**Legenda de cobertura:** ● integral · ◐ abertura + fecho · ○ só abertura

| Cód. | Código do post | Views | Curtidas | Coment. | Data | Dur. | Tema | Arquétipo |
|---|---|---|---|---|---|---|---|---|
| EM01 | DHHRlDeybAd | 8.942.323 | 498.892 | 21.591 | 12/03/25 | 159s | 4 filmes que "o sistema" não quer que você veja | Curadoria-Conspiração |
| EM02 | DHOWnFOMJpK | 8.754.349 | 591.930 | 13.852 | 15/03/25 | 167s | Desenhos infantis viciam bebês | Alerta-Protetivo |
| EM03 | DKdFL_PO2WL | 7.758.670 | 573.397 | 10.004 | 03/06/25 | 146s | Brain rot italiano e blasfêmia oculta | Investigação-Revelação |
| EM04 | DOL1o68DmfM | 7.189.253 | 382.354 | 12.249 | 04/09/25 | 159s | Aliciamento de crianças no Roblox | Alerta-Protetivo |
| EM05 | DQW4l6jDhkE | 4.702.066 | 390.649 | 5.179 | 28/10/25 | 131s | Desenhos de 30 anos atrás vs. hoje | Comparação-Nostalgia |
| EM06 | DIT3KhHRImo | 3.628.879 | 265.652 | 11.650 | 11/04/25 | 176s | Por que a rotina do Ashton Hall viralizou | Diagnóstico-de-Caso |
| EM07 | DJZvZFSOobC | 3.559.921 | 260.086 | 3.287 | 08/05/25 | 180s | Recusar 50 milhões das bets | Denúncia-Mecanismo |
| EM09 | DWHty7HBDX6 | 3.353.664 | 271.537 | 13.962 | 20/03/26 | 174s | 4 documentários obrigatórios | Curadoria-Conspiração |
| EM11 ◐ | DVqw8w6jnuS | 3.018.684 | 237.352 | 4.534 | 09/03/26 | 179s | Neurocientista e a queda cognitiva pós-2010 | Estudo-Revelação |
| EM12 ○ | DT1EkvmjpT_ | 2.832.191 | 323.546 | 13.506 | 22/01/26 | 165s | A regra dos 3,5% e movimentos políticos | Mecanismo-Oculto |
| EM14 ○ | DIXRQsSy2jD | 2.740.954 | 234.013 | 10.855 | 12/04/25 | 167s | Alcance digital de figuras políticas | Comparação-de-Dados |

### 4.2 Era 1, alto desempenho (não transcritos — sem legenda em vídeo)

| Cód. | Código | Views | Curtidas | Coment. | Data | Dur. | Observação |
|---|---|---|---|---|---|---|---|
| EM16 | CyWyRgyOAG5 | 6.281.238 | 163.442 | 55.890 | 13/10/23 | 78s | Sorteio de livros; **55,9 mil comentários**. `INTERPRETAÇÃO`: o CTA é o próprio conteúdo |
| EM17 | C5GjK35OLcm | 5.820.440 | 12.050 | 302 | 29/03/24 | 85s | "Técnica infalível para destravar as views dos Stories". **Curtidas = 0,21% das views** |

### 4.3 Controles (anti-viés de sobrevivência)

| Cód. | Código | Views | Curtidas | Coment. | Data | Dur. | Formato | Papel no estudo |
|---|---|---|---|---|---|---|---|---|
| EM18 ○ | Db0tdsEOny7 | 258.121 | 19.454 | 1.689 | 09/08/26 | 177s | Era 2 completo | ~3,7× a mediana, ~35× abaixo do maior |
| EM19 ○ | Da8HHrYOA3M | 70.703 | 3.275 | 150 | 18/07/26 | 173s | Era 2 completo | **Praticamente na mediana do perfil** (+1,5%) |
| EM20 ○ | DbjAPc5J0CR | 26.965 | 1.098 | 35 | 02/08/26 | 146s | Selfie, sem legenda, sem b-roll | Baixo desempenho recente |

### 4.4 Por que estes conteúdos

- **EM01/EM02/EM03/EM04** — os quatro maiores da Era 2. Precisam entrar para descrever o teto do sistema.
- **EM05** — único do topo em split-screen e em set de podcast: testa se a arquitetura sobrevive à mudança de formato visual. `INTERPRETAÇÃO, n=1`: sobrevive — os blocos permanecem; só o CTA migra da fala para uma cartela.
- **EM06** — o único do topo cujo tema **já é** o negócio dele (viralização). Serve para isolar quanto do desempenho vem do tema "tribo" e quanto vem da estrutura.
- **EM07** — tema adulto (apostas), sem criança envolvida. Testa se o gatilho protetivo é indispensável. `INTERPRETAÇÃO, n=1`: não é — no lugar da proteção entra a indignação moral.
- **EM09/EM11/EM12** — três de 2026. Testam se a arquitetura mudou com o tempo. `INTERPRETAÇÃO, n=3`: o esqueleto se manteve e ficou mais padronizado.
- **EM14** — tema político/dados. Testa a arquitetura fora do eixo "criança/geração".
- **EM16/EM17** — Era 1. Existem para provar que o formato atual é uma escolha, não um default, e para expor um outlier suspeito de impulsionamento.
- **EM18/EM19/EM20** — controles. **Sem eles, todo padrão descrito aqui seria viés de sobrevivência.**

---

## 5. Fichas de evidência (paráfrase + fragmentos curtos)

> As transcrições completas foram usadas como base de trabalho, mas **não são reproduzidas aqui**. O que segue é a estrutura funcional de cada roteiro com marcação de tempo, paráfrases e fragmentos curtos apenas onde a formulação exata é a evidência.

### EM01 — 4 filmes / 159s / 8,94M
`0–4s` Abertura: acusa uma emissora nomeada de esconder do público quatro filmes. `FATO`
`4–8s` Tríade do inimigo: um "sistema" descrito como interessado em manter o espectador pobre, ignorante e sem esperança. `FATO`
`8–15s` Promessa: as obras ajudariam a "despertar" e a vencer apesar das circunstâncias.
`15–17s` **Comando de micro-compromisso**: salvar o vídeo. `FATO`
`17–54s` Filme 1: sinopse em ritmo de trailer + moral aplicada ao espectador ("o que você está deixando entrar na sua mente").
`54–79s` Filme 2: sinopse + tese espiritual — a afirmação de que o ser humano não se reduz ao corpo físico.
`79–101s` Filme 3: sinopse + escalada de urgência — recomenda que a geração nascida depois de 2000 interrompa o que estiver fazendo para assistir.
`101–106s` **CTA social**: compartilhar com quem estiver na situação descrita. `FATO`
`106–125s` Item 4 é um documentário sobre redes sociais → **ponte**: horas no celular, algoritmo.
`125–133s` **Frase-dobradiça**: a tese do "mundo de 3 segundos" e uma dicotomia entre ser consumido e produzir. `FATO`
`133–142s` Prova social visual: prints de perfis de clientes com seta vermelha sobre a contagem de seguidores. `FATO`
`142–159s` **CTA comercial**: comentar a palavra "DIAGNÓSTICO" + olhar o direct + agendar call com a equipe.

### EM02 — desenhos infantis / 167s / 8,75M
`0–4s` Gancho-acusação com advérbio de ocultação: bebês estariam sendo "secretamente" afetados. `FATO`
`4–8s` **Qualificação de público**: o vídeo é declarado como um alerta dirigido a pais. `FATO`
`8–35s` Nomeia marcas reais (Cocomelon, Galinha Pintadinha, Baby Shark, Patrulha Canina) + explica o mecanismo visual (corte rápido, contraste, cor). *Intervalo sem amostra de legenda entre ~9s e ~24s (trecho de b-roll).*
`35–42s` Reenquadramento de vilão: os desenhos são feitos por "cientistas da atenção".
`42–75s` **Prova-experimento**: bebê entre duas telas; medem o desvio do olhar; reprogramam o trecho. Narrativa causal passo a passo.
`75–95s` **Prova numérica**: 196 bilhões de views, 190 milhões de crianças, corte a cada 2 segundos, picos de dopamina.
`95–101s` Consequência futura: a realidade tenderia a parecer sem graça para essas crianças.
`101–106s` **CTA social**: compartilhar com o conjunto dos pais conhecidos.
`106–120s` **Pattern interrupt narrativo**: pergunta bíblica fora de contexto (como Davi matou Golias) → resposta contraintuitiva (com a espada do próprio gigante).
`120–140s` **Ponte**: usar a arma do inimigo = usar as técnicas de atenção para o bem; "os bons profissionais estão no anonimato".
`140–167s` Identidade + missão + prova social visual + CTA "DIAGNÓSTICO".

### EM03 — brain rot / 146s / 7,76M
`0–8s` Gancho de correção-de-si: o fenômeno "está fazendo algo bem pior" do que se pensa. `FATO`
`8–24s` **Bloco de silêncio narrativo**: ~16 segundos de b-roll do meme, precedidos por um convite a observar. `FATO` → `INTERPRETAÇÃO`: converte o espectador em investigador, o que sustenta a permanência num trecho sem argumento novo.
`24–48s` Revelação: uma frase blasfema circula dentro dos vídeos; explica o peso cultural dela.
`48–68s` Escalada: a ofensa se estende a outra religião. Reenquadramento: a intenção de quem emite pesaria mais do que o conteúdo da mensagem.
`68–95s` Generalização (músicas, vídeos, mensagens subconscientes) + posicionamento espiritual pessoal — a tese de que o caráter de quem emite pesa mais que a mensagem.
`95–102s` **CTA social**: compartilhar com jovens.
`102–124s` **Ponte**: a tese do mundo de 3 segundos, com uma enumeração paralelística de quatro tipos de "vazio" (alimentar, informacional, afetivo). `FATO`
`124–146s` Missão + prova social + CTA "DIAGNÓSTICO".

### EM04 — Roblox / 159s / 7,19M
`0–8s` Gancho-caso: uma adulta se passou por criança de dez anos no jogo, e o resultado é apresentado como alerta a pais. `FATO`
`8–43s` **Prova bruta**: legenda do diálogo gravado com o aliciador — o criador sai de cena e deixa o material falar. `FATO` *Intervalo sem amostra entre ~21s e ~43s: trecho de b-roll com o áudio original.*
`43–62s` **Prova numérica**: 137 minutos/dia; casos de 14 h; 42% abaixo de 13 anos.
`62–84s` Prova de autoridade: psicólogos relatam isolamento, irritabilidade, queda escolar → "sinais claros de dependência". Depois, o vetor de risco (chat aberto).
`84–90s` **CTA social**: compartilhar com pais. `FATO`
`90–99s` **Ponte** (mundo de 3 segundos / produto ou produtor).
`99–130s` **Virada positiva**: a mesma tecnologia que permite o mal permite alcançar 1 milhão de pessoas de graça → mini-case nominal de um cliente.
`130–159s` Pergunta binária ("ao seu favor ou contra você?") + prova social + CTA.

### EM05 — desenhos antigos vs. hoje / 131s / 4,70M · ≈26,7 mil compartilhamentos observados na interface
`0–12s` Gancho-contraste geracional puro, sem inimigo nomeado. Split-screen: anime em cima, ele embaixo. `FATO` *Ordem cronológica das amostras conferida; o bloco de 102–105s foi reordenado nesta ficha.*
`12–54s` Banco de memórias específicas (personagens, cenas, o horário da TV depois do almoço) → identificação por nostalgia.
`54–82s` Inversão: os desenhos de hoje são "só barulhinho, cor", sem mensagem.
`82–104s` Projeção de futuro sobre a geração que hoje tem cinco anos + **ponte**.
`104–126s` Prova de hipocrisia: afirma que quem construiu o produto não permite que o próprio filho o consuma. `FATO` *(afirmação sem fonte na tela)*
`126–131s` **CTA em cartela estática de texto**, sem locução. `FATO` — variação relevante: o CTA sai da fala e vira placa.

### EM06 — Ashton Hall / 176s / 3,63M
`0–18s` Gancho de negação dupla: "não viralizou por X, nem por Y" → cria lacuna sobre o verdadeiro motivo. `FATO`
`18–60s` Reconstrução detalhada e quase cômica da rotina alheia (b-roll do vídeo original).
`60–73s` **Prova numérica**: 750 milhões de views; +660 milhões em valor de mercado para a marca de água.
`73–80s` **Reabertura da lacuna**: lembra que o formato já havia sido feito por muita gente e volta a perguntar por que só aquele caso funcionou. `FATO`
`80–110s` **Entrega dos 3 motivos** (formato de corte rápido, exploração do ponto forte, gatilho de disrupção) — a recompensa prometida no segundo 0.
`110–131s` **Reposicionamento de crença** (o núcleo persuasivo do perfil): a causa do fracasso é deslocada da competência para a visibilidade. `FATO`
`131–176s` Prova social + CTA para uma aula ao vivo com palavra-chave "AUDIÊNCIA" + anúncio de lançamento com data.

### EM07 — bets / 180s / 3,56M
`0–14s` Gancho de terceiro nomeado + **confissão pessoal com número**: também recebeu uma oferta de 50 milhões e recusou. `FATO`
`18–46s` Prova emocional bruta: fala sobre quem "pega ônibus das 5h às 20h" e aposta na esperança.
`46–70s` Explicação do modelo de negócio de criadores (produto, anúncio, patrocínio) — didática, aumenta credibilidade.
`70–118s` **Mecanismo neuro em cadeia**: dopamina → reforço positivo → perseguir perdas → comprometimento do córtex pré-frontal → perda de freio moral.
`118–145s` Elogio público ao terceiro + acusação genérica aos pares.
`145–180s` CTA social + missão + CTA "DIAGNÓSTICO".

### EM09 — 4 documentários / 174s / 3,35M (2026)
Mesma arquitetura de EM01, com quatro diferenças: (a) o público é qualificado por faixa geracional já no primeiro segundo; (b) a urgência é datada pelo ano corrente; (c) cada item traz onde assistir (YouTube/Netflix) — **redução de fricção**; (d) o fecho oferece uma escolha binária dura entre abandonar a plataforma ou passar a produzir nela. `FATO`

### EM11 — neurociência / 179s / 3,02M (2026)
`0–10s` Gancho de revelação científica sobre o declínio cognitivo de uma geração nomeada. Autoridade coletiva anônima primeiro ("os cientistas"), nome próprio depois. `FATO`
`10–13s` Comando de salvar.
`13–30s` Autoridade nominal (neurocientista) + anomalia histórica ("pela primeira vez na história moderna").
`30–65s` Cadeia causal: 2010 → tecnologia na escola → queda de desempenho.
`140–179s` Reenquadramento — opõe acúmulo raso de informação a construção de conhecimento com profundidade — + ponte + prova social + CTA.

### EM12 — regra dos 3,5% / 165s / 2,83M (2026)
Gancho de polarização política com pessoa nomeada + **regra numérica nomeada** ("a regra dos 3,5%") + prova de autoridade acadêmica + exemplos históricos. Confirma que o chassi funciona em tema político. `FATO`

### EM14 — dados de alcance político / 167s / 2,74M
Gancho 100% numérico-comparativo (seguidores e views de duas figuras públicas), com prints e recortes de tela. Depois, a mesma tese: audiência decide. `FATO`

### EM18 — carne cultivada / 177s / 258k (controle)
Gancho de conflito de classe ("se nem os ricos vão comer X, o que sobra para…"), b-roll, prints de notícia, legenda queimada — formato completo da Era 2. Desempenho ~3,7× a mediana, mas 30× abaixo do topo. `FATO`

### EM19 — atenção / 173s / 70,7k (controle = mediana)
Gancho de dado histórico: um estudo dos anos 1940 sobre tempo de foco. **Sem agente, sem afetado, sem ocultação, sem tribo.** `FATO` (abertura transcrita). O formato visual — set, terno, legenda queimada, b-roll, duração — é o mesmo dos campeões `FATO` (observado nos quadros), mas **o corpo e o CTA deste vídeo não foram transcritos**, portanto a afirmação de "estrutura idêntica" é `HIPÓTESE`, não fato. → Leitura sugerida: **mesma produção, gancho sem carga social, 124× menos alcance que EM02** — `HIPÓTESE DE TRABALHO`, n=1.

### EM20 — parceria/estudo / 146s / 26,9k (controle = baixo)
Selfie casual, sem legenda queimada, sem b-roll, sem gancho de conflito, menção a parceiro logo no início. `FATO`

---

## 6. Hipóteses pré-registradas × resultado

Quatro hipóteses foram registradas em 14/08/2026, **antes** da coleta (íntegra no
histórico git do projeto). Veredito após a análise:

| ID | Hipótese (resumo) | Veredito |
|---|---|---|
| H1 | Retenção em conteúdo longo é o diferencial dele | **COMPATÍVEL** — mediana de 159s com chassi de recompensa a cada 20–40s; incomprovável sem curva de retenção (`LIMITE`) |
| H2 | O método que ele vende ("3 níveis de atenção", "7 gatilhos", "7 formatos") descreveria a prática | **NÃO CONFIRMADA** — o que emerge dos dados é um chassi de 9 blocos, 4 arquiteturas narrativas e ~12 estruturas de gancho. Nenhuma contagem "7" emergiu do corpus. Ou o empacotamento comercial e a prática são objetos distintos, ou o mapeamento não é visível de fora |
| H3 | A edição carrega parte da retenção que se creditaria ao roteiro | **SUSTENTADA COMO HIPÓTESE DE TRABALHO** — EM20 (sem produção): 26,9k · mediana do perfil: 69,6k · topo com produção completa: 8,9M. Divisão roteiro × execução não quantificável (`LIMITE`) |
| H4 | YouTube/Facebook serviriam de espelho para coleta mais fácil | **NÃO UTILIZADA** — a coleta rodou no Instagram autenticado, tornando o espelho desnecessário |

**Nota sobre H2 — o achado transferível:** os "7 gatilhos" são alegação de copy de
venda; a lista exata não é pública, então a correspondência um-a-um é intestável.
O que a engenharia reversa recomenda é replicar **o que ele faz**, não o que ele
diz que faz — e o que ele faz está nos arquivos 02 a 05.
