# A EXPANSION NÃO TEM BUSINESS MANAGER PRÓPRIO
**Achado de 06/08/2026, 21h · grupo GESTÃO TRÁFEGO**

Documento curto e é para ser lido inteiro. Não é urgente hoje, e fica caro se
esperar.

---

## O QUE APARECEU

Conversa do grupo, 21h:

> **Nicolas:** *"a expansion empresa não tem um BM próprio né? Usamos a do Kauã
> mesmo, se não estou enganado."*
> **Matheus:** *"isso, do Kauã."*

E o Matheus, no mesmo fio, detalhou o que já está construído em cima disso:

- **Token de app da Expansion** criado no Meta para Desenvolvedores
- **Todos os clientes adicionados** a esse token, um por um
- **System user token** para os clientes — *"menos CIES que não tem acesso à BM"*
- **Rastreamento e pixel** configurados
- Um **dashboard funcionando** com métrica em tempo real de todas as contas

---

## POR QUE ISSO É RISCO, E NÃO DETALHE TÉCNICO

Todo esse ativo está pendurado num Business Manager registrado **numa pessoa
física do time**, não no CNPJ da empresa.

| O que está lá dentro | O que acontece se o vínculo com o Kauã acabar |
|---|---|
| Token do app e system users | Perde |
| Pixels de todos os clientes | Perde, e não dá para recriar histórico |
| Acesso às contas de anúncio dos clientes | Perde, e precisa pedir de novo, cliente por cliente |
| Histórico de campanha e públicos | **Perde, e isso não se refaz** |
| O dashboard que o Matheus montou | Para de funcionar |

Público personalizado e aprendizado de campanha são os ativos que **não se
recompram**. Verba a gente repõe; três anos de sinal de conversão, não.

### E a ironia é grande

**É exatamente o problema que a Expansion está diagnosticando na Ciés.**

A BM da Ciés está presa no nome do gestor de tráfego anterior. Está documentado
como risco operacional ativo desde o parecer de crise, foi levantado de novo na
call de 04/08, e **hoje ele custou concreto**: a Ciés é a única conta que ficou
de fora do system user token e do dashboard do Matheus, justamente por isso.

A Expansion está vivendo do lado de dentro a mesma falha que cobra do lado de
fora. A diferença é que aqui ainda dá tempo de arrumar sem pedir favor a
ninguém.

---

## O QUE FAZER

**Não é para hoje e não toca em nada do dia 22.** É trilha paralela.

| # | Ação | Dono |
|---|---|---|
| 1 | Abrir Business Manager no **CNPJ da Expansion** | Nicolas |
| 2 | Migrar o app e o token para essa BM | Matheus |
| 3 | Repassar os acessos de cliente para a BM nova | Matheus |
| 4 | Kauã e Matheus entram como **admin**, não como donos | Nicolas |
| 5 | Recuperar a BM da Ciés do gestor antigo | Kauan Queiroz |

**Faz antes do sistema crescer.** Cada cliente novo adicionado ao token atual é
mais um aceite para refazer depois. Migrar hoje é burocracia; migrar em três
meses é projeto.

---

## A RESPOSTA À PERGUNTA TÉCNICA DO MATHEUS

Ele perguntou (áudio 21h05): *"vocês vão usar o token que eu já criei ou vão
criar um novo? Quero entender essa parte técnica."*

**Usa o que ele já criou.** Motivos:

1. **O trabalho caro já foi feito** — adicionar cliente por cliente ao app é a
   parte que demora, e ele já fez
2. **Token novo = refazer todos os aceites**, com o cliente na linha
3. **Dois tokens são dois pontos de falha** e duas fontes de número divergente

E o dashboard dele **é o oficial até o sistema ficar de pé.** Ele mesmo propôs
isso (*"vou me basear nesse até ter o dash oficial"*) e está certo. Quando o
sistema entrar, ele lê do mesmo token — nenhum retrabalho para o Matheus.

### Sobre o sistema, uma regra

**Não dar data que não se cumpre, nem para o time.** O padrão que quase custou a
Ciés foi prometer mais do que a operação entrega. Fazer isso internamente
custa a mesma coisa, só que o preço aparece depois, quando o time para de
acreditar no que é anunciado.

O honesto é: está sendo construído, o dashboard é uma parte dele, ainda não tem
data, e quando tiver ele puxa do token que já existe.
