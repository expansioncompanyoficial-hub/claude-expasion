# CLIENTES

Contexto consolidado de cada cliente da Expansion. Uma pasta por cliente,
numerada como no Drive (`Expansion Company › Assessoria › Clientes`).

Cada sessão de Claude Code dedicada a um cliente começa lendo o
`CONTEXTO-<CLIENTE>.md` da pasta dele.

| Pasta | Cliente | Nicho | Status |
|---|---|---|---|
| [`007-CLAUKIDS/`](007-CLAUKIDS/) | Clau Kids — Ana Cláudia | Moda infantil | Ativo |

## Convenção

```
CLIENTES/
└── NNN-NOME/
    ├── CONTEXTO-NOME.md          documento vivo, sem data — ponto de entrada
    ├── ESTRATEGIA-...-AAAA-MM-DD.md   entregas datadas
    └── PARECER-... + ANEXOS-...       pares análise + evidência
```

- `CONTEXTO-*.md` é **vivo**: atualiza no lugar, sem sufixo de data.
- Qualquer análise ou entrega é **arquivo novo com data**, nunca edição
  destrutiva do anterior. O histórico é o valor.
- Rodadas de revisão viram `-RODADA2`, `-RODADA3`.

## 🔒 Credenciais

**Nenhuma senha, token ou credencial entra neste repositório.** Os docs de
`Acessos` ficam no Drive. Aqui só se registra *qual* acesso existe e *qual*
está pendente — nunca o valor.
