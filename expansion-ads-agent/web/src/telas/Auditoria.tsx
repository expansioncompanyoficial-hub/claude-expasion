import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente } from '../lib/contexto';
import { dataHora } from '../lib/formato';
import { Aviso, Card, ErroBloco, Esqueleto, Selo, Vazio } from '../componentes/basicos';

interface Registro {
  id: string;
  ts: string;
  ator: string;
  tipoAtor: string;
  ferramenta: string;
  cliente: string | null;
  conta: string | null;
  campanha: string | null;
  parametros: unknown;
  resultado: string;
  idsCriados: unknown;
  erro: unknown;
  estadoAntes: string | null;
  estadoDepois: string | null;
  dryRun: boolean;
}

export function Auditoria() {
  const { selecionada } = useCliente();
  const [ferramenta, setFerramenta] = useState('');
  const [expandido, setExpandido] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['auditoria', selecionada?.id, ferramenta],
    queryFn: () =>
      api.get<{ registros: Registro[] }>(
        `/api/audit?limite=200${selecionada ? `&cliente=${selecionada.id}` : ''}${ferramenta ? `&ferramenta=${ferramenta}` : ''}`,
      ),
  });

  const registros = data?.registros ?? [];

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Auditoria</h1>
          <p className="pagina__sub">
            Registro imutável de cada ação. Somente leitura — não existe endpoint que apague daqui.
          </p>
        </div>
        <input
          type="search"
          placeholder="Filtrar por ferramenta…"
          value={ferramenta}
          onChange={(e) => setFerramenta(e.target.value)}
          style={{ width: 230 }}
        />
      </div>

      <div className="secao">
        <Aviso tipo="info" titulo="Segredos removidos na origem">
          Os parâmetros passam pela redação antes de serem gravados. Token, senha e proof nunca
          chegam a esta tabela — nem no banco, nem no arquivo de log.
        </Aviso>
      </div>

      {error && <ErroBloco erro={error} />}

      <Card semCorpo>
        {isLoading ? (
          <div style={{ padding: 18 }}>
            <Esqueleto altura={180} />
          </div>
        ) : registros.length === 0 ? (
          <Vazio icone="⎘" titulo="Nenhum registro">
            As ações aparecem aqui assim que a primeira validação rodar.
          </Vazio>
        ) : (
          <div className="tabela-envolucro">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Ator</th>
                  <th>Ferramenta</th>
                  <th>Cliente</th>
                  <th>Resultado</th>
                  <th>Transição</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {registros.map((r) => (
                  <>
                    <tr key={r.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{dataHora(r.ts)}</td>
                      <td>
                        {r.ator}
                        <div style={{ fontSize: '0.7rem', color: 'var(--texto-terciario)' }}>
                          {r.tipoAtor}
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: '0.74rem' }}>
                        {r.ferramenta}
                      </td>
                      <td>{r.cliente ?? '—'}</td>
                      <td>
                        <Selo
                          tom={
                            r.resultado === 'error'
                              ? 'erro'
                              : r.resultado === 'blocked'
                                ? 'atencao'
                                : r.resultado === 'dry_run'
                                  ? 'info'
                                  : 'sucesso'
                          }
                        >
                          {r.resultado}
                        </Selo>
                      </td>
                      <td style={{ fontSize: '0.74rem', color: 'var(--texto-secundario)' }}>
                        {r.estadoAntes ?? '—'} → {r.estadoDepois ?? '—'}
                      </td>
                      <td>
                        <button
                          className="botao botao--pequeno botao--fantasma"
                          onClick={() => setExpandido(expandido === r.id ? null : r.id)}
                        >
                          {expandido === r.id ? 'Fechar' : 'Detalhe'}
                        </button>
                      </td>
                    </tr>
                    {expandido === r.id && (
                      <tr key={`${r.id}-det`}>
                        <td colSpan={7} style={{ background: 'var(--preto)' }}>
                          <pre
                            style={{
                              margin: 0,
                              fontFamily: 'var(--fonte-mono)',
                              fontSize: '0.72rem',
                              color: 'var(--texto-secundario)',
                              overflowX: 'auto',
                            }}
                          >
                            {JSON.stringify(
                              {
                                conta: r.conta,
                                campanha: r.campanha,
                                parametros: r.parametros,
                                idsCriados: r.idsCriados,
                                erro: r.erro,
                                dryRun: r.dryRun,
                              },
                              null,
                              2,
                            )}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
