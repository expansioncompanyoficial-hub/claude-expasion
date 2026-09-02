# M003 — O que o CarouselAI muda para a Expansion

> Leitura do Digital Twin (`DIGITAL-TWIN-CAROUSELAI-2026-09-02.md`) contra a
> nossa especificação (`docs/ESPECIFICACAO-INTEGRACAO-CARROSSEL-2026-09-01.md`).
> As sete camadas foram desenhadas para casar uma a uma, então a comparação
> abaixo é mecânica, não impressionista.

---

## 1. O comparativo, camada a camada

| | CarouselAI | Expansion | Quem está à frente |
|---|---|---|---|
| **Canvas** | 1080 × 1350, proporção única 4:5 | 1080 × 1350 | empate |
| **Exportação** | PNG 2160 × 2700 (2×), ~6 MB por slide, ~54 MB o carrossel | PNG/JPEG 1080 × 1350, 0,2 a 2 MB | **nós** — eles exportam 2× e pesam 25× mais |
| **Empacotamento** | 1 arquivo por slide, sem ZIP, com aviso de "download múltiplo" | idem, com **retomada** se o navegador cortar | **nós**, por pouco |
| **Régua** | medida **por template**, mas **fixa por papel** — corpo 40 px com 137 ou 61 caracteres | medida no Canva + **auto-ajuste** por volume, com pisos | **nós** |
| **Templates** | 13 (7 livres, 6 pagos), troca preserva 100% do texto, grátis | 5, e escolhido **por slide** | eles em variedade, **nós** em granularidade |
| **Ênfase** | token existe (`#ADADAD`) e a geração **nunca usa** — 15 slides, zero palavras coloridas | régua medida em 10 peças: 1 na capa, 0-1 na headline, 1-2 no corpo | **nós, com folga** |
| **Marca** | cores + @handle + 2 tags, **e só nos templates que implementam**. Sem fonte, sem logo | ficha por cliente: cor, degradê próprio, logo, @, palavra do CTA | **nós** |
| **Imagem** | 4 campos numéricos, sem arrasto, sem grade. No FREE o painel inteiro está morto | foco contínuo + zoom 4×, com invariante de nunca abrir canto vazio | **nós, com folga** |
| **Legenda** | Ø não existe | gerada junto | **nós** |
| **Aprendizado** | Ø nenhum. Plano pago dá **arquivo**, não aprendizado | diário de decisões + calibração da régua pelo uso | **nós** |
| **Entrada** | 4 campos: agente, nº de slides, idioma, tópico | tema + ficha do cliente | ver §2 |
| **Brief** | **"Melhorar Prompt": 46 → 1.300 caracteres, grátis** | Ø não temos | **eles** |

---

## 2. A única coisa que vale copiar, e vale muito

**"Melhorar Prompt".** Grátis, 0 crédito, transforma o tópico do operador no
briefing que o formulário não pediu.

Medido: `reter cliente de agencia depois do terceiro mes` (46 caracteres) virou
1.300 caracteres contendo **público-alvo nomeado · ângulo central · segmentação
de nicho · estrutura slide a slide · tipo de exemplo · restrição de compliance
· instrução de gancho · instrução de CTA com duas ações**.

A inversão é o ponto: **em vez de perguntar o brief ao usuário, o produto
escreve o brief e mostra para ele editar.** O formulário deles é mais pobre que
o nosso — não tem público, tom livre, CTA nem marca — e mesmo assim o resultado
chega com brief, porque a máquina o redigiu.

Para nós isso encaixa exatamente onde hoje há atrito: o operador manda "carrossel
pra Prime sobre X" e a skill parte daí. Escrever o brief e mostrar para aprovação
é uma etapa que não existe e deveria.

---

## 3. O que eles resolveram abrindo mão, e nós não

**Consistência sem adaptação.** A régua deles é boa e é *fixa por papel de
slide*. O corpo do Big Idea é 40 px com 137 caracteres e com 61 — medido em duas
gerações. A única adaptação é o fluxo vertical.

É uma escolha defensável: nunca sai feio, e nunca sai ajustado. Nossa aposta é a
oposta — auto-ajuste com pisos e aviso de quanto encolheu. **A calibração pelo
uso só faz sentido no nosso desenho**; no deles não haveria o que calibrar.

**Densidade editorial.** Medido nos 15 slides gerados:

| | CarouselAI | Expansion |
|---|---|---|
| Título de conteúdo | 19 a 36 caracteres (média 25,5) | — |
| Corpo | 141 a 168 (média 152) | 230-260 topo/base · 280-310 meio · 420-520 sem foto |
| Capa | 25 a 38 | 45 a 70 |

**Nossas peças são 50 a 100% mais densas que as deles.** Isso não é
automaticamente melhor nem pior — é uma diferença editorial real, medida, que
vale decidir de propósito em vez de por inércia.

---

## 4. Defeitos deles que são aula para nós

Três, todos da mesma família — **o produto sabe uma coisa e a tela mostra outra**:

1. **Placeholder vaza para o arquivo final.** Os toggles `Tag #1` e `Tag #2`
   vêm ligados com o input vazio, e o renderizador imprime o rótulo literal em
   todos os 5 slides, **inclusive no PNG exportado**.
2. **Conteúdo gerado é descartado em silêncio.** A IA escreveu a descrição do
   gancho, ela aparece no painel de edição, e o template do hook não a
   renderiza. Provado por cruzamento: ao trocar de template, o texto apareceu.
3. **Controle desabilitado sem sinal visual.** Nove controles do painel de
   imagem com `pointer-events: none` e `opacity: 1` — parecem ativos e não são.

O terceiro é exatamente a classe de defeito que a nossa auditoria de agosto
encontrou no Estúdio, e que a régua "toda trava carrega o motivo" existe para
impedir. Ver bem o mesmo erro num produto pago é confirmação de que a régua vale.

---

## 5. O que isso valida do nosso lado

**O problema do ZIP não era incompetência nossa.** Eles têm o mesmo: um arquivo
por slide, sem ZIP, com aviso de "download múltiplo" pedindo permissão ao
navegador. É a forma do problema no navegador, não uma falha de implementação.
Nossa retomada depois do corte é uma coisa a mais, não a menos.

**A capa não está resolvida por ninguém.** Eles delegam ao template e deixam a
IA escrever um título de 25 a 38 caracteres. Não há gerador de gancho separado,
nem variações para escolher, nem limite específico, nem teste. Nosso módulo de
fundo de capa — com QA semântico devolvido como pergunta em aberto — não tem
equivalente ali.

---

## 6. O que o twin deixou em aberto, e o custo de fechar

Treze itens marcados `Ø`. Os três que mudariam alguma conclusão:

| | O que falta | Custo |
|---|---|---|
| Ø1 | **Geração de imagem por IA** — a metade paga do produto, e a única onde eles poderiam estar à frente | plano Hobby, R$ 30 por um ciclo |
| Ø5 | **11 dos 13 templates** — a régua visual de cada um | grátis, via "Trocar Template" sobre um carrossel já gerado |
| Ø6 | **Efeito dos 4 agentes de IA** sobre o texto, com template fixo | 2 créditos |

O Ø5 é grátis e o próprio levantamento registra não tê-lo explorado a fundo —
o autor chama de erro de sequenciamento dele. É o melhor custo-benefício se
alguém voltar lá.

---

## 7. Veredito

**Não há nada na régua visual, na ênfase, no enquadramento ou na marca que valha
copiar.** Em todos esses eixos o nosso sistema está à frente, e agora isso é
medido, não suposto.

**Há uma coisa que vale copiar inteira: a escrita do brief.** É barata de
implementar, resolve um atrito real e é a parte mais inteligente do produto
deles.

**E há uma decisão editorial a tomar de propósito:** nossas peças são bem mais
densas que as deles. Vale escolher isso, não herdar.
