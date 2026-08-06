# Content Machine — FAQ

> Transcrição fiel do PDF `originais/faq-content-machine.pdf`.
> **5.5 Claude Edition** · BrandsDecoded 2026
> 25 perguntas que cobrem os erros mais comuns, dúvidas técnicas e situações que você pode encontrar ao usar o Content Machine.

---

## INSTALAÇÃO E CONFIGURAÇÃO

### 1. Preciso pagar algo pro Claude?

Não! O Content Machine funciona com a conta gratuita do Claude.ai. Basta criar sua conta em claude.ai, criar o Projeto e subir os arquivos. Sem custo nenhum pra começar.

### 2. Funciona no celular?

Sim. O Claude.ai tem app para iOS e Android que suporta Projetos. O fluxo de criação funciona normalmente. Porém, para revisar o HTML e exportar PNGs, o ideal é usar um computador com navegador.

### 3. Posso usar no Claude Desktop em vez do claude.ai?

O sistema foi otimizado para Projetos no claude.ai. No Claude Desktop funciona como conversa normal (sem Projeto), mas você perde a persistência dos knowledge files entre conversas. Recomendamos o claude.ai.

### 4. Colei o system prompt mas o Claude responde como assistente genérico.

Três causas possíveis: (1) O texto não foi colado inteiro — verifique se o início diz '# Máquina de Carrosséis' e o final diz 'O sistema é invisível. O carrossel é tudo.' (2) Os knowledge files não foram upados. (3) A Memória do projeto tem dados antigos — limpe completamente.

### 5. Quantos arquivos preciso subir nos Knowledge Files?

Exatamente 6 arquivos .md: `brandsdecoded-design-system`, `brandsdecoded-principios-design`, `brandsdecoded-banco-de-headlines`, `brandsdecoded-filtro-editorial`, `brandsdecoded-manual-de-qualidade` e `brandsdecoded-referencias`. O system prompt (sétimo arquivo) vai nas **Instruções**, não nos Knowledge Files.

### 6. O sistema assume que minha marca é BrandsDecoded sem eu ter informado.

A Memória do projeto provavelmente tem dados antigos. Vá em Memória no painel direito, clique em editar e apague todo o conteúdo. Abra uma conversa nova e teste novamente.

---

## FLUXO DE CRIAÇÃO

### 7. O sistema pula o briefing e vai direto gerar conteúdo.

Isso acontece quando a Memória do projeto tem marca configurada. Limpe a Memória. Também pode ser que o system prompt esteja numa versão antiga — verifique se menciona '7 coisas rápidas' no briefing.

### 8. Posso usar o sistema sem responder as 7 perguntas do briefing?

Não. As 7 perguntas definem cores, fontes, estilo e layout do carrossel. Sem elas, o sistema não tem como personalizar. Mas você pode responder tudo numa linha só para ir mais rápido.

### 9. As headlines estão genéricas / parecem AI.

Peça 'refazer headlines' ou ajuste uma específica ('a 3 mais provocativa', 'mistura a 2 com a 7'). O sistema tem filtro anti-slop mas às vezes precisa de um empurrão. Quanto mais específico o seu insumo original, melhores as headlines.

### 10. A headline da capa ficou diferente da que eu escolhi.

A regra é usar a headline completa na capa. Se ficou diferente, peça: 'usa a headline completa na capa'. O sistema só encurta se a headline não couber em 5 linhas.

### 11. Os títulos internos dos slides estão vagos.

Peça ajuste: 'os títulos internos estão genéricos, reescreve com dados e nomes concretos'. O sistema tem regras contra títulos genéricos, mas pode precisar de reforço.

### 12. Posso pular a aprovação de texto e ir direto pro visual?

Não recomendamos. A aprovação de texto existe para evitar retrabalho — é muito mais fácil ajustar texto do que refazer o HTML inteiro. Digite 'aprovado' quando o texto estiver ok.

### 13. O sistema não gerou a legenda do Instagram.

Peça: 'gera a legenda'. Ela normalmente vem junto com o HTML ou após o export PNG.

---

## DESIGN E VISUAL

### 14. As cores do carrossel ficaram diferentes do que eu pedi.

Verifique se informou o hex corretamente (#E8421A, com #). Se disse 'laranja vibrante', o sistema interpreta e pode escolher um tom diferente. Use hex para precisão.

### 15. Quero mudar o estilo depois de já ter gerado.

Mudar o estilo (Clássico → Bold) exige regerar o HTML do zero. Diga 'reiniciar' e comece com o novo estilo. Ajustes menores (cor, fonte) podem ser feitos no HTML.

### 16. As imagens que enviei não apareceram no carrossel.

Verifique se enviou as imagens DEPOIS de aprovar o texto e ANTES do render. O sistema espera as imagens numa etapa específica. Se já renderizou sem imagens, peça: 'adiciona as imagens' e reenvie.

### 17. A imagem da capa está cortada de um jeito estranho.

O slide tem 1080×1350px (4:5). Se a imagem original é quadrada ou paisagem, ela será cortada. Use imagens em formato retrato (vertical) para a capa.

### 18. Quero mais ou menos slides do que o padrão.

Informe no briefing: '5 slides', '7 slides' ou '12 slides'. O sistema adapta a estrutura narrativa automaticamente.

### 19. Não gostei de um slide específico. Preciso refazer tudo?

Não. Diga 'trocar slide 4' ou 'ajusta o texto do slide 6' e o sistema modifica apenas aquele slide.

---

## EXPORT E PUBLICAÇÃO

### 20. O PNG ficou com fontes diferentes do HTML.

O sistema embute as fontes como base64 no HTML para evitar isso. Se mesmo assim houver diferença, peça: 'verifica se as fontes estão embutidas no HTML como base64'.

### 21. O export PNG deu erro ou travou.

O Playwright pode precisar ser reinstalado em conversas novas. Diga 'exportar' novamente. Se persistir, peça: 'instala o playwright e exporta'.

### 22. Os PNGs não estão em 1080×1350px.

Verifique se o HTML usa slides com `width: 1080px` e `height: 1350px`. O export usa `slide.screenshot()` no elemento, que captura o tamanho exato.

### 23. Como publico no Instagram?

Baixe os PNGs. No Instagram, crie um novo post, selecione todas as imagens na ordem (slide 01 a 09), e cole a legenda gerada pelo sistema. Publique como carrossel.

---

## USO AVANÇADO

### 24. Posso criar mais de um carrossel na mesma conversa?

Sim, mas recomendamos abrir uma conversa nova para cada carrossel. O contexto acumula e pode ultrapassar o limite da janela de contexto do modelo, causando perda de qualidade.

### 25. Posso usar o sistema para criar carrosséis em inglês ou espanhol?

O sistema foi calibrado para português brasileiro. Funciona em outros idiomas, mas as headlines, o banco de hooks e o filtro anti-slop são todos em português. Para outros idiomas, a qualidade editorial será menor.

---

_Content Machine | 5.5 Claude Edition — Desenvolvido por BrandsDecoded, 2026_
