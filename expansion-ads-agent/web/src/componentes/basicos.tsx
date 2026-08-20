import type { ReactNode } from 'react';
import type { Achado, Severidade } from '../lib/tipos';
import { rotuloOrigem } from '../lib/formato';

export function Selo({
  tom = 'neutro',
  children,
  ponto = false,
}: {
  tom?: string;
  children: ReactNode;
  ponto?: boolean;
}) {
  return (
    <span className={`selo selo--${tom}`}>
      {ponto && <span className="ponto" />}
      {children}
    </span>
  );
}

export function Card({
  titulo,
  acoes,
  children,
  semCorpo = false,
}: {
  titulo?: ReactNode;
  acoes?: ReactNode;
  children: ReactNode;
  semCorpo?: boolean;
}) {
  return (
    <section className="card">
      {(titulo || acoes) && (
        <header className="card__topo">
          {titulo && <h2 className="card__titulo">{titulo}</h2>}
          {acoes && <div className="card__acoes">{acoes}</div>}
        </header>
      )}
      {semCorpo ? children : <div className="card__corpo">{children}</div>}
    </section>
  );
}

export function Indicador({
  rotulo,
  valor,
  nota,
  tom,
  indisponivel,
  tecnico,
}: {
  rotulo: string;
  valor?: ReactNode;
  nota?: ReactNode;
  tom?: 'destaque' | 'sucesso' | 'atencao' | 'erro';
  /** Motivo de o número não existir. Nunca mostramos zero no lugar. */
  indisponivel?: string;
  /** Valor é rótulo técnico (ex.: OUTCOME_LEADS), não número. */
  tecnico?: boolean;
}) {
  return (
    <div className={`indicador${tom ? ` indicador--${tom}` : ''}`}>
      <div className="indicador__rotulo">{rotulo}</div>
      {indisponivel ? (
        <>
          <div className="indicador__indisponivel">—</div>
          <div className="indicador__nota">{indisponivel}</div>
        </>
      ) : (
        <>
          <div className={`indicador__valor${tecnico ? ' indicador__valor--tecnico' : ''}`}>
            {valor}
          </div>
          {nota && <div className="indicador__nota">{nota}</div>}
        </>
      )}
    </div>
  );
}

const ICONE_SEVERIDADE: Record<Severidade | 'sucesso', string> = {
  info: 'ℹ',
  recomendacao: '◆',
  alerta: '▲',
  bloqueio: '✕',
  sucesso: '✓',
};

export function Aviso({
  tipo,
  titulo,
  children,
}: {
  tipo: Severidade | 'sucesso';
  titulo?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className={`aviso aviso--${tipo}`} role={tipo === 'bloqueio' ? 'alert' : 'status'}>
      <span className="aviso__icone" aria-hidden="true">
        {ICONE_SEVERIDADE[tipo]}
      </span>
      <div className="aviso__corpo">
        {titulo && <div className="aviso__titulo">{titulo}</div>}
        {children}
      </div>
    </div>
  );
}

/** Achado do Gestor IA, sempre carimbado com a origem da informação. */
export function AchadoItem({ achado }: { achado: Achado }) {
  return (
    <Aviso tipo={achado.severidade} titulo={achado.titulo}>
      <span className="origem">{rotuloOrigem(achado.origem)}</span>
      {achado.detalhe}
      {achado.suporte && Object.keys(achado.suporte).length > 0 && (
        <details className="detalhe-tecnico">
          <summary>Dados de suporte</summary>
          <pre>{JSON.stringify(achado.suporte, null, 2)}</pre>
        </details>
      )}
    </Aviso>
  );
}

export function Vazio({
  icone = '○',
  titulo,
  children,
  acao,
}: {
  icone?: string;
  titulo: string;
  children?: ReactNode;
  acao?: ReactNode;
}) {
  return (
    <div className="vazio">
      <div className="vazio__icone" aria-hidden="true">
        {icone}
      </div>
      <div className="vazio__titulo">{titulo}</div>
      {children && <div className="vazio__desc">{children}</div>}
      {acao && <div style={{ marginTop: 16 }}>{acao}</div>}
    </div>
  );
}

export function Esqueleto({ altura = 20, largura = '100%' }: { altura?: number; largura?: string }) {
  return <div className="esqueleto" style={{ height: altura, width: largura }} />;
}

export function EsqueletoIndicadores({ quantidade = 4 }: { quantidade?: number }) {
  return (
    <div className="grade-indicadores">
      {Array.from({ length: quantidade }, (_, i) => (
        <div className="indicador" key={i}>
          <Esqueleto altura={11} largura="55%" />
          <div style={{ height: 9 }} />
          <Esqueleto altura={26} largura="72%" />
        </div>
      ))}
    </div>
  );
}

export function Campo({
  rotulo,
  obrigatorio,
  ajuda,
  erro,
  children,
  contador,
}: {
  rotulo: string;
  obrigatorio?: boolean;
  ajuda?: ReactNode;
  erro?: string | null;
  children: ReactNode;
  contador?: { atual: number; maximo: number };
}) {
  const estourado = contador ? contador.atual > contador.maximo : false;
  return (
    <div className="campo">
      <label className="campo__rotulo">
        {rotulo}
        {obrigatorio && (
          <span className="campo__obrigatorio" aria-label="obrigatório">
            *
          </span>
        )}
      </label>
      {ajuda && <div className="campo__ajuda">{ajuda}</div>}
      {children}
      {contador && (
        <div className={`campo__contador${estourado ? ' campo__contador--estourado' : ''}`}>
          {contador.atual} / {contador.maximo}
        </div>
      )}
      {erro && <div className="campo__erro">{erro}</div>}
    </div>
  );
}

/**
 * Erro vindo do backend. Mostra a frase em português e guarda o detalhe
 * técnico numa área expansível — o operador não precisa ler JSON da Meta.
 */
export function ErroBloco({ erro }: { erro: unknown }) {
  const falha = erro as {
    erro?: { mensagem?: string; codigo?: string; comoResolver?: string[]; detalhes?: unknown };
    message?: string;
  };
  const dados = falha?.erro;
  const mensagem = dados?.mensagem ?? falha?.message ?? 'Não foi possível concluir a operação.';

  return (
    <Aviso tipo="bloqueio" titulo={mensagem}>
      {dados?.comoResolver && dados.comoResolver.length > 0 && (
        <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
          {dados.comoResolver.map((passo, i) => (
            <li key={i}>{passo}</li>
          ))}
        </ul>
      )}
      {dados?.detalhes != null && (
        <details className="detalhe-tecnico">
          <summary>Detalhe técnico {dados.codigo ? `(${dados.codigo})` : ''}</summary>
          <pre>{JSON.stringify(dados.detalhes, null, 2)}</pre>
        </details>
      )}
    </Aviso>
  );
}
