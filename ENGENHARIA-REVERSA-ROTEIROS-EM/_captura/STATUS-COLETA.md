# STATUS DA COLETA — Engenharia reversa dos roteiros de Elias Maman

**Sessão:** COLETA (branch `claude/elias-maman-roteiros-reversa-yyo9sd`)
**Data/hora do teste:** 2026-08-14 10:47:53 UTC

## Teste de rede (Passo 1)

Comando: `curl -sS -o /dev/null -w "%{http_code}" -m 20 <url>`

| Domínio | Resultado |
|---|---|
| https://www.instagram.com/elias.maman/ | `curl: (56) CONNECT tunnel failed, response 403` |
| https://www.instagram.com/ | `curl: (56) CONNECT tunnel failed, response 403` |
| https://scontent.cdninstagram.com/ | `curl: (56) CONNECT tunnel failed, response 403` |
| https://www.youtube.com/ | `curl: (56) CONNECT tunnel failed, response 403` |
| https://huggingface.co/ | `curl: (56) CONNECT tunnel failed, response 403` |

## Veredito

**A política de rede do ambiente NÃO foi alterada: todos os domínios necessários (Instagram, CDN do Instagram, YouTube, Hugging Face) retornam 403 no CONNECT do proxy de egress. Coleta impossível por acesso anônimo — sessão encerrada sem tentar contornar o gateway.**

## Consequências

- Nenhum reel foi enumerado, baixado ou transcrito (EM01–EM55 não iniciados).
- `INVENTARIO-EM.csv` e `transcricoes/` não foram criados — não há dado bruto para registrar.
- ASR (faster-whisper) também estaria indisponível: huggingface.co bloqueado para download do modelo.

## Próximo passo (fora desta sessão)

Para a coleta rodar, o dono do ambiente precisa liberar na política de egress
do Claude Code na web (configuração do environment) os domínios:
`instagram.com`, `cdninstagram.com` e `huggingface.co` (este último só para o
modelo de transcrição). Depois, disparar novamente a sessão de coleta.
