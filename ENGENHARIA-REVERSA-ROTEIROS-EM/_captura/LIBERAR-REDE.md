# LIBERAR O INSTAGRAM NO AMBIENTE — rota escolhida

O ambiente atual está no nível **Trusted** (padrão): só registries de pacote,
GitHub e SDKs de nuvem. Por isso `instagram.com` volta 403 no gateway.
Para liberar, o nível precisa virar **Custom**.

## Passos

1. Em **claude.ai/code**, clicar no **ícone de nuvem** com o nome do ambiente —
   fica na linha logo acima da caixa de mensagem.
   *(Não existe página de settings nem URL direta para isso.)*
2. Passar o mouse sobre o ambiente e clicar no **ícone de engrenagem** à direita
   (ou **Add cloud environment** para criar um novo).
3. Em **Network access**, trocar `Trusted` por **`Custom`**.
4. No campo **Allowed domains**, colar — um por linha:

```
instagram.com
*.instagram.com
*.cdninstagram.com
*.fbcdn.net
*.facebook.com
```

> As três últimas linhas não são enfeite. O `instagram.com` entrega só o HTML;
> **o vídeo e as imagens vêm de `cdninstagram.com` e `fbcdn.net`**. Sem elas a
> página abre sem mídia — que é justamente o que precisamos assistir.
> `facebook.com` cobre o redirect de login.

5. Marcar **"Also include default list of common package managers"** — senão o
   ambiente perde GitHub e registries, e a sessão não consegue nem dar push.
6. Salvar.

## Depois de salvar: abrir uma sessão NOVA

**Esta sessão aqui não vai enxergar a mudança.** A política de rede é fixada
quando o container é criado; o VM em execução mantém a antiga. É preciso iniciar
uma sessão nova no ambiente editado, no mesmo repositório e na mesma branch
(`claude/elias-maman-roteiros-reversa-yyo9sd`).

Na sessão nova, o primeiro comando deve ser o teste:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://www.instagram.com/elias.maman/
```

- `200` → liberado. Seguir para a coleta (§ abaixo).
- `403` → a política não pegou. Conferir se salvou como `Custom` e se a sessão é nova.
- `301/302` para `/accounts/login/` → rede liberada, **mas barrou no login**. Ver abaixo.

## O obstáculo que a liberação de rede não resolve

Vale saber antes de investir tempo: **liberar a rede resolve o transporte, não o
acesso.** O Instagram exige sessão logada para quase tudo, e trata IP de
datacenter com desconfiança — que é exatamente o que o container é. Dois pontos
concretos:

- **Contagem de visualizações** — o dado que define quais são "os 40 mais virais"
  — em geral só aparece logado.
- Sem cookie de sessão, a navegação anônima costuma parar num muro de login após
  poucas requisições.

Se cair no muro de login, **não force**: não vale tentar contornar com
credenciais suas dentro do container. O caminho limpo é o do Mac, com o seu Chrome
já logado — `PROMPT-COLETA-MAC.md`, na mesma pasta. Mesma coleta, mesmos arquivos
de saída; muda só quem abre o navegador.

## Se abrir: o que coletar

Está tudo especificado em `01_BASE_DE_EVIDENCIAS.md` §2. Resumo operacional:

- **EM01–EM40** — os 40 Reels de maior visualização.
- **EM41–EM55** — 15 Reels medianos/baixos do mesmo período (**grupo de controle,
  confirmado**). Sem eles não se separa "isto funciona" de "isto ele sempre faz".
- Por vídeo: linha no `INVENTARIO-EM.csv` + ficha em
  `transcricoes/EMxx.md` no formato de `MODELO-TRANSCRICAO.md`.
- **A transcrição literal com timestamp a cada ~5s é o item crítico.** Sem ela não
  existem as seções 5.3, 5.4 e 5.7 da análise.

Commitar a cada 5 vídeos. Não acumular 55 fichas na memória da sessão.
