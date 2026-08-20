import { useRef, useState, type DragEvent } from 'react';
import { api, FalhaApi } from '../lib/api';
import { AchadoItem, Aviso, Selo } from '../componentes/basicos';
import { PreviaCriativo } from '../telas/Criativos';
import type { Criativo } from '../lib/tipos';

interface EnvioEmCurso {
  nome: string;
  percentual: number;
  erro: string | null;
}

export function AreaUpload({
  cliente,
  criativos,
  aoMudar,
}: {
  cliente: string;
  criativos: Criativo[];
  aoMudar: (criativos: Criativo[]) => void;
}) {
  const [arrastando, setArrastando] = useState(false);
  const [emCurso, setEmCurso] = useState<EnvioEmCurso[]>([]);
  const entrada = useRef<HTMLInputElement>(null);

  async function enviar(arquivos: FileList | File[]) {
    for (const arquivo of Array.from(arquivos)) {
      const indice = emCurso.length;
      setEmCurso((atual) => [...atual, { nome: arquivo.name, percentual: 0, erro: null }]);

      const formulario = new FormData();
      formulario.append('cliente', cliente);
      formulario.append('arquivo', arquivo);

      try {
        const resposta = await api.upload<{ criativo: Criativo }>(
          '/api/creatives/upload',
          formulario,
          (percentual) =>
            setEmCurso((atual) =>
              atual.map((e, i) => (i === indice ? { ...e, percentual } : e)),
            ),
        );

        // Hash igual = mesmo arquivo. Não duplica na lista.
        aoMudar([
          ...criativos.filter((c) => c.hash !== resposta.criativo.hash),
          resposta.criativo,
        ]);
        setEmCurso((atual) => atual.filter((_, i) => i !== indice));
      } catch (falha) {
        const mensagem =
          falha instanceof FalhaApi ? falha.erro.mensagem : 'Falha ao enviar o arquivo.';
        setEmCurso((atual) => atual.map((e, i) => (i === indice ? { ...e, erro: mensagem } : e)));
      }
    }
  }

  function aoSoltar(evento: DragEvent) {
    evento.preventDefault();
    setArrastando(false);
    if (evento.dataTransfer.files.length > 0) void enviar(evento.dataTransfer.files);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setArrastando(true);
        }}
        onDragLeave={() => setArrastando(false)}
        onDrop={aoSoltar}
        onClick={() => entrada.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') entrada.current?.click();
        }}
        role="button"
        tabIndex={0}
        style={{
          border: `2px dashed ${arrastando ? 'var(--laranja)' : 'var(--borda)'}`,
          borderRadius: 'var(--raio)',
          padding: '34px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: arrastando ? 'var(--laranja-vidro)' : 'var(--grafite-850)',
          transition: 'border-color 0.14s, background 0.14s',
        }}
      >
        <div style={{ fontSize: '1.7rem', opacity: 0.45, marginBottom: 8 }} aria-hidden="true">
          ⬆
        </div>
        <div style={{ fontWeight: 650 }}>Arraste imagens ou vídeos aqui</div>
        <div style={{ fontSize: '0.79rem', color: 'var(--texto-terciario)', marginTop: 4 }}>
          ou clique para escolher · JPG, PNG, MP4, MOV
        </div>
        <input
          ref={entrada}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.mp4,.mov"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) void enviar(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {emCurso.length > 0 && (
        <div style={{ marginTop: 13, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {emCurso.map((envio, i) => (
            <div
              key={`${envio.nome}-${i}`}
              style={{ background: 'var(--grafite-800)', padding: 11, borderRadius: 'var(--raio-sm)' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  marginBottom: 6,
                }}
              >
                <span>{envio.nome}</span>
                <span>{envio.erro ? 'falhou' : `${envio.percentual}%`}</span>
              </div>
              {envio.erro ? (
                <>
                  <Aviso tipo="bloqueio">{envio.erro}</Aviso>
                  <button
                    className="botao botao--pequeno"
                    style={{ marginTop: 8 }}
                    onClick={() => setEmCurso((atual) => atual.filter((_, idx) => idx !== i))}
                  >
                    Dispensar
                  </button>
                </>
              ) : (
                <div style={{ height: 5, background: 'var(--grafite-700)', borderRadius: 3 }}>
                  <div
                    style={{
                      width: `${envio.percentual}%`,
                      height: '100%',
                      background: 'var(--laranja)',
                      borderRadius: 3,
                      transition: 'width 0.2s',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {criativos.length > 0 && (
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 13,
          }}
        >
          {criativos.map((c) => (
            <div className="card" key={c.hash}>
              <PreviaCriativo cliente={cliente} arquivo={c.arquivo} tipo={c.tipo} altura={130} />
              <div className="card__corpo" style={{ padding: 13 }}>
                <div style={{ fontWeight: 600, fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  {c.arquivo}
                </div>
                <div className="linha-flex" style={{ marginTop: 7, gap: 5 }}>
                  {c.largura && c.altura && (
                    <Selo tom="neutro">
                      {c.largura}×{c.altura}
                    </Selo>
                  )}
                  <Selo tom="neutro">{c.tamanhoLegivel}</Selo>
                </div>

                <div className="linha-flex" style={{ marginTop: 8, gap: 5 }}>
                  <Selo tom={c.analise.compatibilidade.feed ? 'sucesso' : 'neutro'}>Feed</Selo>
                  <Selo tom={c.analise.compatibilidade.stories ? 'sucesso' : 'neutro'}>Stories</Selo>
                  <Selo tom={c.analise.compatibilidade.reels ? 'sucesso' : 'neutro'}>Reels</Selo>
                </div>

                <details className="detalhe-tecnico" style={{ marginTop: 9 }}>
                  <summary>Análise</summary>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 9 }}>
                    {c.analise.achados.map((a, i) => (
                      <AchadoItem achado={a} key={i} />
                    ))}
                  </div>
                </details>

                <button
                  className="botao botao--pequeno botao--fantasma"
                  style={{ marginTop: 10, width: '100%' }}
                  onClick={() => aoMudar(criativos.filter((x) => x.hash !== c.hash))}
                >
                  Remover da campanha
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Prévia nas três proporções, com aviso de corte. */
export function PreviasFormato({
  cliente,
  criativo,
  texto,
  titulo,
}: {
  cliente: string;
  criativo: Criativo;
  texto: string;
  titulo: string;
}) {
  const formatos = [
    { nome: 'Feed 4:5', proporcao: 4 / 5, ok: criativo.analise.compatibilidade.feed },
    { nome: 'Quadrado 1:1', proporcao: 1, ok: criativo.analise.compatibilidade.quadrado },
    { nome: 'Stories/Reels 9:16', proporcao: 9 / 16, ok: criativo.analise.compatibilidade.stories },
  ];

  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      {formatos.map((formato) => (
        <div key={formato.nome} style={{ width: 168 }}>
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--texto-terciario)',
              marginBottom: 5,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{formato.nome}</span>
            {!formato.ok && <span style={{ color: 'var(--atencao)' }}>corte</span>}
          </div>
          <div
            style={{
              border: `1px solid ${formato.ok ? 'var(--borda)' : 'rgba(245,184,0,0.4)'}`,
              borderRadius: 'var(--raio-sm)',
              overflow: 'hidden',
              background: 'var(--grafite-900)',
            }}
          >
            <div style={{ aspectRatio: String(formato.proporcao), overflow: 'hidden' }}>
              <PreviaCriativo
                cliente={cliente}
                arquivo={criativo.arquivo}
                tipo={criativo.tipo}
                altura={168 / formato.proporcao}
              />
            </div>
            <div style={{ padding: 9 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 650, lineHeight: 1.35 }}>
                {titulo || 'Título do anúncio'}
              </div>
              <div
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--texto-terciario)',
                  marginTop: 3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {texto || 'Texto principal do anúncio…'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
