-- =====================================================================
-- MÓDULO BASE — a base de consumidores da loja cliente
-- Proposta de migração para expansion-os-prod (pfebvgsrdwmdygpnalhn)
--
-- Status: PROPOSTA. NÃO APLICADA.  Aplicar primeiro em os-expansion-staging.
-- Data: 2026-08-08
-- Contexto: business-model/23-OPERACAO-SEM-OPERADOR.md
--
-- Por que um módulo novo e não o módulo "CRM" já declarado:
--   o módulo CRM do OS é "Leads, pipeline e conversão" — o funil comercial
--   DA EXPANSION. Este aqui é outra coisa: o consumidor final DA LOJA.
--   Misturar os dois é o erro que faz o dado não servir para nenhum dos dois.
--
-- Convenções seguidas, herdadas do que já existe no OS:
--   nomes no singular · português · comentário em toda tabela · RLS ligada
--   em tudo · log append-only com UPDATE barrado por gatilho (padrão da
--   tabela `evento`, migração 0006).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. CONTATO — o consumidor final da loja
-- ---------------------------------------------------------------------
create table if not exists public.contato (
  id                 uuid primary key default gen_random_uuid(),
  cliente_id         uuid not null references public.cliente(id) on delete cascade,

  -- identificação: o telefone é o identificador natural, e é dado pessoal.
  telefone_hash      text not null,          -- sha256(e164 || cliente_id) — é por aqui que se junta
  telefone_e164      text,                   -- NULO quando o canal guarda o número. Ver §LGPD abaixo
  nome               text,

  -- comportamento de compra
  data_1a_compra     date,
  data_ult_compra    date,
  n_compras          integer not null default 0,
  valor_total        numeric(12,2) not null default 0,
  categoria_ult      text,
  origem             text,                   -- ads · organico · indicacao · loja · importacao

  -- estado
  optout             boolean not null default false,
  optout_em          timestamptz,
  criado_em          timestamptz not null default now(),
  atualizado_em      timestamptz not null default now(),

  unique (cliente_id, telefone_hash)
);

comment on table public.contato is
  'O consumidor final da loja cliente. A base é da loja, sempre — a Expansion opera em nome dela. `telefone_hash` é o que permite cruzar comportamento entre lojas sem manter o número identificável na camada analítica.';
comment on column public.contato.telefone_e164 is
  'Preencher SÓ enquanto o canal de disparo não guardar o número. Assim que guardar, apagar esta coluna por cliente. O hash basta para tudo que é análise.';
comment on column public.contato.optout is
  'Quem pediu para sair nunca mais entra em campanha. Sem exceção, sem "só desta vez".';

create index if not exists contato_cliente_idx      on public.contato (cliente_id);
create index if not exists contato_ult_compra_idx   on public.contato (cliente_id, data_ult_compra);
create index if not exists contato_ativos_idx       on public.contato (cliente_id) where optout = false;

-- faixa derivada: é o que a régua e a auditoria consultam
create or replace view public.contato_faixa as
select
  c.*,
  (current_date - c.data_ult_compra)                        as dias_sem_comprar,
  case
    when c.data_ult_compra is null                then 'SEM_DADO'
    when current_date - c.data_ult_compra <=  90  then 'ATIVO'
    when current_date - c.data_ult_compra <= 365  then 'MORNO'
    else                                               'DORMENTE'
  end                                                        as faixa,
  case when c.n_compras > 0
       then round(c.valor_total / c.n_compras, 2) end        as ticket_medio
from public.contato c;

-- ---------------------------------------------------------------------
-- 2. CAMPANHA — uma oferta, para um recorte, num mês
-- ---------------------------------------------------------------------
create table if not exists public.campanha (
  id              uuid primary key default gen_random_uuid(),
  cliente_id      uuid not null references public.cliente(id) on delete cascade,
  disparada_em    timestamptz,
  segmento        text not null,   -- ATIVO · MORNO · DORMENTE · ANIVERSARIO · POS_COMPRA · CATEGORIA:<x>
  tipo_oferta     text,
  copy_texto      text,
  n_enviados      integer not null default 0,
  criado_em       timestamptz not null default now()
);

comment on table public.campanha is
  'Uma campanha por cliente por mês. Somada nas lojas todas, esta tabela é o benchmark de setor da Expansion — o único ativo aqui que não se compra com dinheiro.';

create index if not exists campanha_cliente_idx on public.campanha (cliente_id, disparada_em desc);

-- ---------------------------------------------------------------------
-- 3. INTERACAO — o log. Append-only, como a tabela `evento`
-- ---------------------------------------------------------------------
create table if not exists public.interacao (
  id            bigserial primary key,
  contato_id    uuid not null references public.contato(id) on delete cascade,
  cliente_id    uuid not null references public.cliente(id) on delete cascade,
  campanha_id   uuid references public.campanha(id) on delete set null,
  tipo          text not null check (tipo in ('ENVIO','RESPOSTA','VENDA','OPTOUT','FALHA')),
  ocorrido_em   timestamptz not null default now(),
  valor_venda   numeric(12,2),
  canal         text,             -- oficial · reserva
  detalhe       jsonb
);

comment on table public.interacao is
  'Append-only para a aplicação: UPDATE barrado por gatilho, DELETE só por cascata de contato ou cliente — que é o caminho da exclusão a pedido do titular. Cinco tipos, só esses.';

create index if not exists interacao_contato_idx  on public.interacao (contato_id, ocorrido_em desc);
create index if not exists interacao_campanha_idx on public.interacao (campanha_id, tipo);
create index if not exists interacao_cliente_idx  on public.interacao (cliente_id, ocorrido_em desc);

create or replace function public.interacao_sem_update() returns trigger
language plpgsql as $$
begin
  raise exception 'interacao é append-only: UPDATE não é permitido';
end $$;

drop trigger if exists interacao_sem_update on public.interacao;
create trigger interacao_sem_update
  before update on public.interacao
  for each row execute function public.interacao_sem_update();

-- ---------------------------------------------------------------------
-- 4. REGUA — os gatilhos automáticos, por cliente
-- ---------------------------------------------------------------------
create table if not exists public.regua (
  id            uuid primary key default gen_random_uuid(),
  cliente_id    uuid not null references public.cliente(id) on delete cascade,
  gatilho       text not null check (gatilho in ('SEM_COMPRAR_60D','POS_COMPRA_7D','ANIVERSARIO','CONVERSA_MORTA_48H')),
  ativo         boolean not null default true,
  copy_texto    text not null,
  janela_hora   int not null default 9 check (janela_hora between 8 and 20),
  criado_em     timestamptz not null default now(),
  unique (cliente_id, gatilho)
);

comment on table public.regua is
  'Os quatro gatilhos do EX1. É o que o Make consulta toda manhã. Nenhum humano opera isto depois de configurado uma vez.';

-- ---------------------------------------------------------------------
-- 5. RLS — ligada em tudo, como no resto do OS
--    As políticas seguem o padrão já existente (interno vê a agência,
--    cliente vê o seu). Ajustar os nomes das funções de contexto para os
--    mesmos que as migrações anteriores do OS já usam antes de aplicar.
-- ---------------------------------------------------------------------
alter table public.contato   enable row level security;
alter table public.campanha  enable row level security;
alter table public.interacao enable row level security;
alter table public.regua     enable row level security;

-- ---------------------------------------------------------------------
-- 6. AUDITORIA — a consulta que fecha a venda
--    É esta view que substitui a aba AUDITORIA da planilha.
-- ---------------------------------------------------------------------
create or replace view public.auditoria_base as
select
  cf.cliente_id,
  count(*)                                                      as total_contatos,
  count(*) filter (where faixa = 'ATIVO')                       as ativos,
  count(*) filter (where faixa = 'MORNO')                       as mornos,
  count(*) filter (where faixa = 'DORMENTE')                    as dormentes,
  count(*) filter (where optout)                                as optouts,
  round(avg(ticket_medio), 2)                                   as ticket_medio,
  round(avg(n_compras), 2)                                      as compras_por_cliente,
  sum(valor_total)                                              as faturamento_historico,
  -- venda potencial da 1a campanha: alvo x 8% de resposta x 32% de conversao x ticket
  round(
    (count(*) filter (where faixa in ('MORNO','DORMENTE')))
    * 0.08 * 0.32 * coalesce(avg(ticket_medio), 0), 2)          as venda_potencial_1a_campanha
from public.contato_faixa cf
where cf.optout = false
group by cf.cliente_id;

comment on view public.auditoria_base is
  'A página que fecha a venda do EX1. As taxas de 8% e 32% são referência de mercado (ver 13-MERCADO) — trocar pela média real da casa assim que houver 3 campanhas medidas nesta mesma base.';

-- =====================================================================
-- LGPD — o que esta migração assume e o que ela NÃO resolve
--
--   Resolve:  minimização (hash em vez de número na camada analítica),
--             opt-out como estado de primeira classe, log append-only
--             com trilha de exclusão por cascata.
--
--   NÃO resolve, e nenhuma migração resolve:  a cláusula de contrato.
--             Sem a previsão de uso agregado e anonimizado assinada pela
--             loja, este banco acumula dado que não pode ser usado.
--             Ver A-031 e 20 §5. É a única coisa aqui sem conserto
--             retroativo.
-- =====================================================================
