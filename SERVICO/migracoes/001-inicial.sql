-- Estúdio Expansion — esquema inicial
--
-- Roda em Supabase (Postgres). Ordem das tabelas segue a dependência, então dá
-- para aplicar de cima para baixo sem reordenar.
--
-- Duas decisões de modelagem carregam o resto do sistema:
--
--   `blocos` é jsonb, não tabela de slides. O contrato de 18 textos é a
--   interface entre o agente e o renderizador; mantê-lo como array simples
--   permite trocar de template sem migrar dado. Slide é uma *projeção* do
--   bloco, calculada na renderização.
--
--   `calibracao_usada` nunca é nulo. É o campo que permite responder "a
--   recalibração melhorou alguma coisa?". Sem ele a fase 5 fica sem grupo de
--   controle, e aí vira superstição com cara de dado.

create extension if not exists "pgcrypto";

-- ── Marca do cliente. Espelha CLIENTES/<X>/FICHA-CARROSSEL-<X>.md ──────────
create table clientes (
  id              uuid primary key default gen_random_uuid(),
  nome            text not null,
  handle          text not null unique,
  nicho           text not null,
  unidade         text,

  token_fundo     text not null,
  token_destaque  text not null,
  token_claro     text not null,
  gradiente       text,
  fonte_titulo    text not null default 'Montserrat',
  fonte_corpo     text not null default 'Poppins',
  fonte_serif     text not null default 'Source Serif 4',
  logo_url        text,

  -- A palavra que a pessoa comenta. É por ela que o disparo automático
  -- reconhece o lead, então não muda de peça para peça.
  cta_palavra     text not null,

  regras_editoriais jsonb not null default '{}'::jsonb,  -- compliance, vetos, tom
  publicos          jsonb not null default '[]'::jsonb,

  criado_em       timestamptz not null default now(),
  atualizado_em   timestamptz not null default now()
);

-- ── Template é dado, não código. Template novo entra sem deploy. ───────────
create table templates (
  id        text primary key,          -- expansion-01, expansion-02, ...
  nome      text not null,             -- EXPANSION 01 (MEIO FUNIL)
  etapa     text not null check (etapa in ('topo','meio')),
  n_slides  int  not null default 9,
  familia   text not null check (familia in ('grade','sangrada','cartao')),
  ritmo     jsonb not null,            -- ['capa','claro','destaque',...]
  layout    jsonb not null,            -- tipografia, margens, elementos fixos
  ativo     boolean not null default true
);

insert into templates (id, nome, etapa, familia, ritmo, layout) values
 ('expansion-01','EXPANSION 01 (MEIO FUNIL)','meio','grade',
  '["capa","claro","destaque","claro","escuro","escuro","claro","escuro","cta"]',
  '{"medido":true,"origem":"DAHSNnmhwz0"}'),
 ('expansion-02','EXPANSION 02','topo','sangrada','[]',
  '{"medido":false,"align":"left","tam":88.3}'),
 ('expansion-03','EXPANSION 03','topo','sangrada','[]',
  '{"medido":false,"align":"center","fonte":"serif","tam":84}'),
 ('expansion-04','EXPANSION 04','topo','sangrada','[]',
  '{"medido":false,"align":"center","tam":100}'),
 ('expansion-twitter','EXPANSION TWITTER','topo','cartao','[]',
  '{"medido":false}');

-- ── A peça ────────────────────────────────────────────────────────────────
create table carrosseis (
  id            uuid primary key default gen_random_uuid(),
  cliente_id    uuid not null references clientes(id) on delete restrict,
  template_id   text not null references templates(id),
  modo          text not null check (modo in ('topo','meio','newsroom')),

  titulo        text not null,
  publico       text,
  tema          text,

  blocos        jsonb not null,   -- o contrato de 18 textos
  spec          jsonb not null,   -- o spec completo do renderizador
  metadados     jsonb not null default '{}'::jsonb,  -- padrao_headline, gatilhos, eixo

  -- Nunca nulo: sem ele não dá para medir se a recalibração adiantou.
  calibracao_usada text not null default 'brandsdecoded-default',

  status        text not null default 'rascunho'
                check (status in ('rascunho','revisao','aprovado','publicado','recusado')),

  criado_por    text,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index on carrosseis (cliente_id, criado_em desc);
create index on carrosseis (status);

-- ── Aprovação. O aceite do cliente é o que dispara a publicação. ──────────
create table aprovacoes (
  id           uuid primary key default gen_random_uuid(),
  carrossel_id uuid not null references carrosseis(id) on delete cascade,
  papel        text not null check (papel in ('interno','cliente')),
  quem         text not null,
  decisao      text not null check (decisao in ('aprovado','refazer')),
  comentario   text,
  em           timestamptz not null default now()
);

create index on aprovacoes (carrossel_id, em desc);

-- Link sem senha longa para o cliente. CPF/CNPJ basta como segundo fator —
-- é interno, e senha longa por WhatsApp é o que ninguém usa.
create table convites_aprovacao (
  token        text primary key,
  carrossel_id uuid not null references carrosseis(id) on delete cascade,
  documento    text,             -- CPF/CNPJ esperado, só os dígitos
  expira_em    timestamptz not null,
  usado_em     timestamptz
);

-- ── Publicação. `media_id` é a chave que liga tudo ao desempenho. ─────────
create table publicacoes (
  id           uuid primary key default gen_random_uuid(),
  carrossel_id uuid not null references carrosseis(id) on delete restrict,
  canal        text not null default 'instagram',
  media_id     text not null,
  permalink    text,
  publicado_em timestamptz not null default now(),
  unique (canal, media_id)
);

create table desempenho (
  id              uuid primary key default gen_random_uuid(),
  publicacao_id   uuid not null references publicacoes(id) on delete cascade,
  coletado_em     timestamptz not null default now(),
  alcance         int,
  impressoes      int,
  salvamentos     int,
  compartilhamentos int,
  comentarios     int,
  curtidas        int,
  unique (publicacao_id, coletado_em)
);

-- ── Recalibração por nicho E por modo ─────────────────────────────────────
-- Um educativo com 40 salvamentos e um viral com 8 mil de alcance não
-- competem no mesmo ranking.
create table calibracao (
  id         uuid primary key default gen_random_uuid(),
  nicho      text not null,
  versao     int  not null,
  modo       text not null check (modo in ('topo','meio','newsroom')),
  padrao     text not null,     -- morte-fim | geracional | dois-pontos ...

  -- Nenhuma linha sem contagem de peças por trás. "Testado em 3 peças" é
  -- honesto; "funciona melhor" sem número não é.
  n_pecas    int  not null check (n_pecas > 0),
  metrica    text not null,     -- salvamentos | alcance | compartilhamentos
  valor      numeric not null,
  gerada_em  timestamptz not null default now(),
  unique (nicho, versao, modo, padrao, metrica)
);

-- ── atualizado_em automático ──────────────────────────────────────────────
create or replace function toca_atualizado_em() returns trigger
language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

create trigger t_clientes_touch before update on clientes
  for each row execute function toca_atualizado_em();
create trigger t_carrosseis_touch before update on carrosseis
  for each row execute function toca_atualizado_em();
