import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente } from '../lib/contexto';
import { AchadoItem, Card, ErroBloco, Esqueleto, Selo, Vazio } from '../componentes/basicos';
import type { Criativo } from '../lib/tipos';

export function PreviaCriativo({
  cliente,
  arquivo,
  tipo,
  altura = 150,
}: {
  cliente: string;
  arquivo: string;
  tipo: string;
  altura?: number;
}) {
  const url = `/api/creatives/${encodeURIComponent(cliente)}/${encodeURIComponent(arquivo)}/file`;

  if (tipo === 'video') {
    return (
      <video
        src={url}
        style={{ width: '100%', height: altura, objectFit: 'cover', background: 'var(--preto)' }}
        muted
        playsInline
        preload="metadata"
        controls
      />
    );
  }

  return (
    <img
      src={url}
      alt={arquivo}
      loading="lazy"
      style={{ width: '100%', height: altura, objectFit: 'cover', background: 'var(--preto)' }}
    />
  );
}

export function Criativos() {
  const { selecionada } = useCliente();

  const { data, isLoading, error } = useQuery({
    queryKey: ['criativos', selecionada?.id],
    queryFn: () => api.get<{ criativos: Criativo[] }>(`/api/creatives?cliente=${selecionada!.id}`),
    enabled: Boolean(selecionada),
  });

  const criativos = data?.criativos ?? [];

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Criativos</h1>
          <p className="pagina__sub">
            {selecionada ? selecionada.nome : 'Selecione uma cliente'} · arquivos em{' '}
            <code>creatives/{selecionada?.id ?? '<cliente>'}/</code>
          </p>
        </div>
      </div>

      {error && <ErroBloco erro={error} />}

      {isLoading ? (
        <Card>
          <Esqueleto altura={170} />
        </Card>
      ) : criativos.length === 0 ? (
        <Card>
          <Vazio icone="▣" titulo="Nenhum criativo">
            Envie imagens ou vídeos pelo assistente de nova campanha, ou coloque os arquivos
            diretamente na pasta da cliente.
          </Vazio>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))',
            gap: 14,
          }}
        >
          {criativos.map((c) => (
            <div className="card" key={c.hash}>
              <PreviaCriativo cliente={selecionada!.id} arquivo={c.arquivo} tipo={c.tipo} />
              <div className="card__corpo">
                <div style={{ fontWeight: 650, fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  {c.arquivo}
                </div>
                <div className="linha-flex" style={{ marginTop: 8, gap: 6 }}>
                  <Selo tom="neutro">{c.tipo}</Selo>
                  {c.largura && c.altura && (
                    <Selo tom="neutro">
                      {c.largura}×{c.altura}
                    </Selo>
                  )}
                  <Selo tom="neutro">{c.tamanhoLegivel}</Selo>
                  {!c.integro && <Selo tom="erro">arquivo com problema</Selo>}
                </div>

                <div className="linha-flex" style={{ marginTop: 9, gap: 6 }}>
                  <Selo tom={c.analise.compatibilidade.feed ? 'sucesso' : 'neutro'}>Feed</Selo>
                  <Selo tom={c.analise.compatibilidade.stories ? 'sucesso' : 'neutro'}>Stories</Selo>
                  <Selo tom={c.analise.compatibilidade.reels ? 'sucesso' : 'neutro'}>Reels</Selo>
                </div>

                <div
                  className="mono"
                  style={{ marginTop: 9, fontSize: '0.66rem', wordBreak: 'break-all' }}
                  title="Hash usado para impedir upload duplicado"
                >
                  {c.hash.slice(0, 24)}…
                </div>

                {c.usadoEm && c.usadoEm.length > 0 && (
                  <div style={{ marginTop: 8, fontSize: '0.74rem', color: 'var(--texto-secundario)' }}>
                    Usado em {c.usadoEm.length} campanha(s)
                  </div>
                )}

                <details className="detalhe-tecnico" style={{ marginTop: 10 }}>
                  <summary>Análise do criativo</summary>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                    {c.analise.achados.map((a, i) => (
                      <AchadoItem achado={a} key={i} />
                    ))}
                    <div
                      style={{
                        fontSize: '0.73rem',
                        color: 'var(--texto-terciario)',
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: 'var(--texto-secundario)' }}>Não avaliado:</strong>{' '}
                      {c.analise.naoAvaliado.join(' · ')}. Isso exigiria um modelo de visão
                      computacional, que o sistema ainda não tem — e não é simulado.
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
