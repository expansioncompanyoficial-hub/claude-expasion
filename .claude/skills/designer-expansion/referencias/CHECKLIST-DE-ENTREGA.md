# Checklist de entrega

Rode antes de mandar qualquer material para o cliente. Achou problema, corrige
antes — não entrega com ressalva.

## O renderizador já conferiu

`gerar-pdf.mjs` reprova sozinho e não gera o PDF nestes casos:

- [x] Conteúdo estourando a caixa da página
- [x] Elemento em fluxo passando da margem útil
- [x] Imagem que não carregou
- [x] Logo ou imagem fora da proporção do arquivo original
- [x] Tamanho de página do PDF (A4 exato ou 16:9 exato)

Se passou, esses cinco estão resolvidos. Os de baixo são seus.

## Conteúdo

- [ ] O nome do cliente está escrito exatamente como ele escreve
- [ ] Todo número, data e valor foi conferido na fonte
- [ ] Nada foi inventado: resultado, prazo, preço, condição, depoimento, case
- [ ] O que não foi confirmado está dentro de `.pendente`
- [ ] Diagnóstico, hipótese, recomendação e decisão não estão misturados
- [ ] Cada ação diz o quê, por quê, como, quem, quando e como se acompanha
- [ ] As responsabilidades estão identificadas — de cada lado
- [ ] Não sobrou texto genérico, frase vaga nem repetição
- [ ] Ortografia e gramática revisadas
- [ ] O material é entendível sem ninguém explicando junto

## Marca

- [ ] A marca do cliente está em posição de destaque
- [ ] A EXPANSION aparece como responsável pela estratégia
- [ ] As duas têm proporção, respiro e alinhamento profissionais
- [ ] Nenhuma foi unida, sobreposta, recolorida ou modificada
- [ ] A assinatura “Estratégia e desenvolvimento: EXPANSION” aparece na capa,
      contracapa, rodapé ou créditos — **e não em toda página**
- [ ] A logo não se repete grande página após página
- [ ] A cor do cliente veio da marca oficial dele, não de estimativa

## Desenho

- [ ] Existe sequência lógica entre as páginas
- [ ] Uma ideia por página (A4) ou por tela (16:9)
- [ ] Hierarquia clara: dá para entender a página só pelos títulos
- [ ] Margens e alinhamentos consistentes entre as páginas
- [ ] Nenhuma página excessivamente carregada
- [ ] Nenhuma página com vazio que pareça descuido — use `.cresce` para ancorar
- [ ] Contraste garante leitura, inclusive no celular e em projeção
- [ ] Laranja não foi usado como cor de texto sobre branco
- [ ] Ícones do mesmo estilo; nenhum emoji
- [ ] Sem gradiente desnecessário, sombra pesada, 3D ou ornamento sem função
- [ ] O material não parece template genérico nem resposta de chatbot
- [ ] **As prévias em PNG foram olhadas, uma a uma**

## Personalização

- [ ] O material parece feito para esta empresa, não para “um cliente”
- [ ] O tom conversa com o público que vai receber
- [ ] Fotos reais do cliente foram usadas quando existiam
- [ ] Nenhuma imagem genérica de banco sem relação com o negócio

## Entrega

- [ ] PDF gerado
- [ ] HTML de arquivo único gerado (`--html`) — a versão editável
- [ ] Resumo curto do que foi criado
- [ ] Lista do que ainda precisa ser validado
- [ ] Orientação de como apresentar ou usar o material
