# Ficha de carrossel — Expansion

A conta da casa. É onde o Template 01 foi medido e é onde tudo se testa antes de
ir para cliente.

## Identidade

| | |
|---|---|
| Perfil | `@assessoriaexpansion` |
| Marca na barra | `EXPANSION` |
| Copyright | `2026 ®` |
| Nicho | marketing para lojas de roupas femininas |
| Público | dona de loja de roupa feminina |

## Paleta

| Token | Hex | Papel |
|---|---|---|
| `dark` | `#000000` | fundo dominante |
| `accent` | `#FF9901` | ênfase, CTA, elementos de marca |
| `claro` | `#F0EEEC` | fundo dos slides claros |
| `gradiente` | `linear-gradient(180deg,#fa7e01,#ff6522 50%,#fa7e01)` | fundo do slide de destaque |
| `gradiente_texto` | `linear-gradient(90deg,#ff9901,#ff6c01)` | ênfase da **capa**, só dela |

`dark`, `accent`, `claro` e `gradiente` foram medidos no Canva da própria conta.
O `gradiente` é **fundo de slide**, nunca preenchimento de escrita.

O `gradiente_texto` é outra coisa e veio depois: é o estilo de degradê que o
Nicolas criou no Canva e mandou pelo seletor de cor. Preenche o `*trecho*` da
**capa** e nada mais — no corpo dos slides internos a ênfase segue em `accent`
chapado, que é o que está medido. **É ativo de marca da Expansion**: cliente sem
`gradiente_texto` na ficha pinta a ênfase da capa com o próprio `accent`.

## Tipografia

Montserrat (título) + Poppins (corpo), nos pesos 600/700 e 400/500/700.

> **Aproximação declarada:** as fontes reais do Canva vêm da API como
> `YAFdJjbTu24` (título) e `YAFdJvSyp_k` (corpo), sem nome, e o brand kit da
> conta está vazio. Montserrat + Poppins dão o mesmo peso e a mesma cor de
> mancha. Para fechar: abrir um design no Canva e ler os dois nomes no seletor
> de fonte.

## CTA — palavra fixa

**`DIAGNÓSTICO`**

Formato, sempre o mesmo:

> Para [ganho concreto], comenta **DIAGNÓSTICO**.

A palavra não muda de peça para peça: é por ela que o disparo automático
reconhece o lead.

## Régua editorial

- **Modo padrão:** `meio` — educativo, segunda pessoa. É o registro da conta.
- Nada de estatística de mercado sem fonte. Sem `CALIBRACAO/moda-feminina.md`,
  usar só o que é verificável, e dizer quando uma leitura é tese e não dado.
- Tese de comportamento de compra pode entrar, escrita como argumento — nunca
  vestida de número.

## Template

Template 01, 9 slides, conforme
`.claude/skills/carrossel-viral/references/template-01.md`.
