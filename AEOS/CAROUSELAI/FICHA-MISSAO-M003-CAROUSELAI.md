# FICHA DE MISSÃO — AEOS-M003

> **Alvo:** CarouselAI — https://www.twobaddesigners.com/pt
> **Instrumento:** Claude na extensão do Chrome, na máquina do Nicolas, com a
> conta dele já autenticada.
> **Por que não daqui:** o domínio é recusado pela política de egress do
> ambiente remoto (`403 CONNECT`, verificado em curl, WebFetch e Chromium).
> **Rito:** Vol. III — PROMETHEUS. Digital Twin antes de qualquer proposta.

---

## 1. O PEDIDO, LITERAL

> "Estude a fundo o site para automatizarmos 100% a criação dos carrosséis
> virais inteiros."

---

## 2. CONVERSÃO EM MISSÃO

Não é "olhar o site". É **levantar o Digital Twin do CarouselAI em sete
camadas que casam uma a uma com as sete seções da nossa especificação**, para
que a comparação seja mecânica em vez de impressionista.

O produto desta missão é **um documento**, não uma opinião. Quem o receber
(o Claude do repositório da Expansion) não tem acesso ao site nem à sessão
autenticada, e vai tratar o documento como única evidência.

---

## 3. A DISCIPLINA — o que separa esta missão de um passeio

Herdada da M001 (Organify), onde ela evitou que um bug inexistente entrasse
no relatório:

1. **`Ø` marca o que NÃO foi observado.** Camada sem observação fica vazia e
   marcada, nunca preenchida por dedução.
2. **Confiança por afirmação**, em porcentagem. Abaixo de 60% vai como
   hipótese, não como fato.
3. **Limitações do instrumento vêm ANTES de qualquer número.** Se o clique
   automatizado erra coordenada, se a medição foi feita sob concorrência, se
   o extrator capturou lixo — isso se declara antes da tabela.
4. **Hipótese refutada se registra de propósito.** Na M001, "os botões de
   período estão quebrados" chegou a 85% de confiança e era defeito do
   instrumento, não do produto.
5. **Nada por suposição.** Se não foi visto, não entra.

---

## 4. LIMITES DE CONDUTA — inegociáveis

- **Não gastar crédito sem perguntar.** A geração de imagem custa de 1 a 8
  créditos por imagem. Antes de qualquer geração, dizer quanto vai custar e
  esperar o "pode".
- **Não publicar nada em lugar nenhum.** Nem no Instagram, nem no LinkedIn,
  nem dentro da própria ferramenta.
- **Não mexer em configuração de conta**, plano, assinatura ou dado de
  pagamento.
- **Não acessar dado de terceiro.** Só o que a conta do Nicolas já vê.
- **Não fazer download de nada que não seja um carrossel gerado por ele
  nesta sessão.**
- Toda ação destrutiva ou irreversível: **pergunta antes**.

---

## 5. AS SETE CAMADAS

Cada camada abaixo é irmã de uma seção da especificação da Expansion. Preencher
na ordem.

### Camada 1 · Superfícies e navegação
Que telas existem entre "entrar" e "carrossel pronto na mão". Rota, nome,
o que faz. Onde o fluxo bifurca. O que existe fora do fluxo principal
(biblioteca, histórico, marca, equipe).

### Camada 2 · O contrato de entrada
**A camada mais importante para nós.** O que exatamente ele aceita como
insumo, campo a campo:
- URL de artigo? Texto colado? Link de Short/vídeo? Arquivo?
- Existe campo de tema, público, tom, objetivo, CTA?
- Existe ficha de marca — cor, fonte, logo, @ — e onde ela é preenchida?
- Quantos slides ele decide sozinho, e dá para forçar o número?
- O que é obrigatório e o que é opcional.

Transcrever os **rótulos e placeholders reais**, não parafrasear. O texto de
interface revela o modelo mental do produto.

### Camada 3 · Modelos e custo
Os seis modelos: nome de cada um, o que a interface promete de cada um,
custo em crédito. Onde a escolha aparece no fluxo. O que muda no resultado —
se der para observar sem gastar demais.

### Camada 4 · A régua visual — MEDIDA, não olhada
Aqui é onde a extensão vale mais que qualquer print. Com o carrossel na tela,
rodar no console e colar o resultado bruto:

```js
// mede o slide e a tipografia REAL, sem depender de olho
(() => {
  const alvo = document.querySelector('[class*=slide],[class*=canvas],[class*=carousel] > *');
  if (!alvo) return 'não achei o slide — ajuste o seletor';
  const r = alvo.getBoundingClientRect();
  const texto = [...alvo.querySelectorAll('*')]
    .filter(e => e.children.length === 0 && e.textContent.trim())
    .map(e => {
      const s = getComputedStyle(e), b = e.getBoundingClientRect();
      return {
        txt: e.textContent.trim().slice(0, 42),
        fonte: s.fontFamily.split(',')[0], px: s.fontSize, peso: s.fontWeight,
        lh: s.lineHeight, tracking: s.letterSpacing, cor: s.color,
        align: s.textAlign,
        x: Math.round(b.left - r.left), y: Math.round(b.top - r.top),
        larg: Math.round(b.width),
      };
    });
  return JSON.stringify({slide: {w: Math.round(r.width), h: Math.round(r.height)},
    fundo: getComputedStyle(alvo).backgroundColor, blocos: texto}, null, 1);
})()
```

Depois responder: proporção do slide, margem, largura útil, tamanho e peso de
headline e corpo por tipo de slide, entrelinha, tracking, alinhamento, e a
paleta. **Números, não adjetivos.**

### Camada 5 · A régua editorial
Como ele divide o texto: quantos slides, quantos caracteres por slide, o que
vai na capa contra o que vai no corpo. Ele destaca palavra? Como — cor, peso,
marca-texto? Quantos destaques por slide? Existe CTA no último slide, e ele
sai de onde? Existe legenda, e ela é gerada junto?

**Copiar o texto integral de um carrossel gerado**, slide a slide. É o dado
mais útil desta camada.

### Camada 6 · O editor — o que dá para ajustar
Depois de gerado, o que a pessoa consegue mudar: texto, tamanho, cor, fonte,
imagem, enquadramento, ordem dos slides, template. E — igualmente importante —
**o que ele NÃO deixa mexer**. Cada trava é uma decisão de produto.

Como a imagem é enquadrada: arrasta? zoom? grade de pontos? nada?

### Camada 7 · A saída
Formatos oferecidos, tamanho em pixel, se vem ZIP ou arquivo a arquivo, se dá
para baixar tudo de uma vez, e se a legenda sai junto. Se houver limite ou
marca d'água no plano atual, registrar.

### Camadas transversais
- **Estados e erros.** URL que ele não consegue ler, texto curto demais,
  crédito insuficiente, geração falhando. O que aparece na tela.
- **Negócio.** Preço, planos, limites, o que o plano atual libera.

---

## 6. O QUE JÁ SABEMOS — não gaste tempo aqui

Levantado por busca, sem ter visto o produto (confiança ~70%, não confirmado):

- Cola URL, Short ou texto e devolve carrossel editável para LinkedIn e
  Instagram.
- Seis modelos de IA, de "rápido" a "extraordinário".
- Geração de imagem custa de 1 a 8 créditos, conforme o modelo.
- Público declarado: criadores de conteúdo, empreendedores, marketing.
- `/pt/entry` é tela de entrada.

**Confirme ou derrube cada um destes cinco.** Item derrubado vale mais que
item novo.

---

## 7. O QUE NOSSO SISTEMA JÁ FAZ — para a comparação ter lado

Para saber onde olhar, e para não voltar impressionado com o que já temos:

| | Expansion hoje |
|---|---|
| Saída | 9 slides, 1080 × 1350, PNG ou JPEG |
| Régua | medida no Canva: margem 108, largura útil 864, headline de capa 111,5 px, caixa de foto 864 × 442,2 |
| Templates | 5, e o template é escolhido **por slide**, não pela peça |
| Ênfase | `*trecho*` troca a cor, `**trecho**` sobe o peso; a cor sai do fundo — degradê na capa, branco sobre o slide de destaque |
| Dosagem | 1 destaque na capa, 0-1 na headline interna, 1-2 no corpo. Medido em 10 peças |
| Imagem | foco contínuo + zoom até 4×, com garantia de nunca abrir canto vazio |
| Marca | ficha por cliente: cor, degradê próprio, logo, @, palavra do CTA |
| Aprendizado | diário de decisões por peça, e calibração da régua pelo uso |

**As perguntas que decidem se vale copiar alguma coisa:**

1. A régua deles é **medida** ou é template genérico esticado?
2. Eles resolvem o enquadramento de imagem melhor que arrastar com zoom?
3. Eles têm alguma coisa parecida com **aprender com o uso**, ou geram sempre
   do zero?
4. O contrato de entrada deles é mais rico que o nosso — pedem algo que a
   gente não pede e que melhora o resultado?
5. Como eles fazem a **capa**, que é onde a gente mais sofre?

---

## 8. FORMATO DA ENTREGA

Um documento markdown único, em português do Brasil, com:

1. **Método e limitações** — o que foi usado, o que o instrumento não
   conseguiu fazer, o que ficou fora.
2. **As sete camadas**, na ordem, com `Ø` no que não foi observado.
3. **Matriz de conhecimento** — uma linha por camada, com status
   (`✔` confirmada · `△` parcial · `Ø` não observada) e confiança em %.
4. **Achados**, cada um com evidência e confiança. **Nenhum é recomendação** —
   recomendação vem depois, com o twin fechado.
5. **Hipóteses refutadas**, se houver.
6. **O que destrava o resto** — o que faltou e o que seria preciso para obter.

Anexar: os prints do fluxo, o JSON bruto da medição da Camada 4, e o texto
integral de um carrossel gerado.

**Se algo não deu para observar, isso é resultado — não é falha.** A M001
fechou com 4 de 10 critérios reprovados e foi útil exatamente por dizer isso.
