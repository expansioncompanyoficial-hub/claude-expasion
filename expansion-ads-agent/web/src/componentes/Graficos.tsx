/**
 * Gráficos em SVG puro.
 *
 * Sem biblioteca de charts: são duas formas só, e escrevê-las à mão mantém
 * total controle da paleta escura e evita ~200 kB de dependência.
 */

export interface Ponto {
  rotulo: string;
  valor: number;
}

function eixoY(maximo: number): number[] {
  if (maximo <= 0) return [0, 1];
  const passo = Math.pow(10, Math.floor(Math.log10(maximo)));
  const topo = Math.ceil(maximo / passo) * passo;
  return [0, topo / 2, topo];
}

export function GraficoBarras({
  dados,
  formatar,
  altura = 190,
}: {
  dados: Ponto[];
  formatar: (valor: number) => string;
  altura?: number;
}) {
  if (dados.length === 0) {
    return (
      <div style={{ padding: 26, textAlign: 'center', color: 'var(--texto-terciario)' }}>
        Sem dados no período.
      </div>
    );
  }

  const maximo = Math.max(...dados.map((d) => d.valor), 0);
  const marcas = eixoY(maximo);
  const topo = marcas[marcas.length - 1] || 1;
  const largura = 100 / dados.length;

  return (
    <div>
      <div style={{ position: 'relative', height: altura }}>
        {marcas
          .slice()
          .reverse()
          .map((marca) => (
            <div
              key={marca}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: `${(marca / topo) * 100}%`,
                borderTop: '1px dashed var(--borda)',
                fontSize: '0.65rem',
                color: 'var(--texto-terciario)',
                paddingLeft: 2,
              }}
            >
              {formatar(marca)}
            </div>
          ))}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            paddingLeft: 52,
          }}
        >
          {dados.map((ponto) => (
            <div
              key={ponto.rotulo}
              style={{ width: `${largura}%`, height: '100%', display: 'flex', alignItems: 'flex-end' }}
              title={`${ponto.rotulo}: ${formatar(ponto.valor)}`}
            >
              <div
                style={{
                  width: '100%',
                  height: `${topo > 0 ? Math.max((ponto.valor / topo) * 100, ponto.valor > 0 ? 2 : 0) : 0}%`,
                  background: 'linear-gradient(180deg, var(--laranja) 0%, var(--laranja-escuro) 100%)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: ponto.valor > 0 ? 3 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, paddingLeft: 52, marginTop: 6 }}>
        {dados.map((ponto) => (
          <div
            key={ponto.rotulo}
            style={{
              width: `${largura}%`,
              fontSize: '0.63rem',
              color: 'var(--texto-terciario)',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {ponto.rotulo}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarraProporcao({
  valor,
  maximo,
  rotulo,
  tom = 'laranja',
}: {
  valor: number;
  maximo: number;
  rotulo?: string;
  tom?: 'laranja' | 'atencao' | 'erro' | 'sucesso';
}) {
  const percentual = maximo > 0 ? Math.min((valor / maximo) * 100, 100) : 0;
  const cor =
    tom === 'erro'
      ? 'var(--erro)'
      : tom === 'atencao'
        ? 'var(--atencao)'
        : tom === 'sucesso'
          ? 'var(--sucesso)'
          : 'var(--laranja)';

  return (
    <div>
      {rotulo && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: 'var(--texto-secundario)',
            marginBottom: 4,
          }}
        >
          <span>{rotulo}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{percentual.toFixed(0)}%</span>
        </div>
      )}
      <div
        style={{ height: 6, background: 'var(--grafite-700)', borderRadius: 4, overflow: 'hidden' }}
        role="progressbar"
        aria-valuenow={Math.round(percentual)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ width: `${percentual}%`, height: '100%', background: cor, borderRadius: 4 }} />
      </div>
    </div>
  );
}
