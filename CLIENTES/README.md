# CLIENTES

Uma pasta por cliente. Cada uma reúne o contexto que o Claude precisa para
trabalhar naquela conta sem depender do Drive, do WhatsApp ou da memória de
ninguém.

| Cliente | Nicho | Status | Pasta |
|---|---|---|---|
| DiCastro / BBM | Missão empresarial — Macedônia e Bulgária | Ciclo abr–jul/2026 encerrado. Retomada em aberto | [`DICASTRO/`](DICASTRO/) |

## Padrão de cada pasta

| Arquivo | Papel |
|---|---|
| `CONTEXTO-<CLIENTE>.md` | **Documento vivo.** Quem é, o que vende, para quem, posicionamento, elenco, status. Sem data no nome — é atualizado, não substituído |
| `DIAGNOSTICO-<CLIENTE>-AAAA-MM-DD.md` | Análise datada de um ciclo. Rodadas novas viram `-RODADA2`, nunca edição destrutiva |
| `ACERVO-DRIVE-<CLIENTE>.md` | Mapa do que existe no Drive, o que está vazio e o que se perdeu |
| `ROTEIROS-<CLIENTE>-*.md` | Roteiros consolidados — o Drive é frágil, aqui é versionado |
| `LEADS-*-AAAA-MM-DD.md` | Análise de base de leads, quando houver |
| `_whatsapp/` | Transcrições dos grupos, **redigidas** (ver abaixo) |

## Regras

1. **Português do Brasil**, como todo o repositório.
2. **Nada de credencial.** Senha, token, chave de API não entram aqui em nenhuma
   hipótese — nem em transcrição de WhatsApp. O documento de acessos guarda
   *quem* tem acesso, não a credencial.
3. **Nada de link de compartilhamento do Drive.** Um link de pasta compartilhada
   como "qualquer pessoa com o link" é uma chave de acesso. Enquanto o
   repositório for público, referenciar por nome.
4. **Dado pessoal de terceiro** — nome e telefone de lead, por exemplo — fica
   fora. Análise agregada pode; lista nominal não.
5. **Transcrição de WhatsApp entra redigida.** Remover senha, telefone, payload
   de PIX, endereço e link de compartilhamento antes de commitar. O original
   fica no ZIP e nos backups do app.

> ⚠️ **Este repositório está público no GitHub.** Todas as regras acima existem
> por causa disso. Se ele for tornado privado, as regras 3 e 4 podem ser
> relaxadas — as regras 2 e 5 valem de qualquer forma.
