import { site } from '../config/site'
import { useCountUp, useInView } from '../hooks'
import './stats.css'

const ICONS: Record<string, JSX.Element> = {
  director: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 13h24v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V13Z" />
      <path d="m4.5 12.5 2-6.5 21 4-1.5 3" />
      <path d="m10 7.5 4 5M16.5 8.8l4 5M23 10l3.5 4.5" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="9" width="18" height="14" rx="2.5" />
      <path d="m21 14 8-4v12l-8-4" />
      <circle cx="9" cy="16" r="3" />
    </svg>
  ),
  timeline: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 8h24M4 16h24M4 24h24" opacity=".45" />
      <rect x="7" y="13" width="9" height="6" rx="1.5" />
      <rect x="19" y="21" width="7" height="6" rx="1.5" />
      <path d="M13 4v24" />
    </svg>
  ),
  broadcast: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="18" r="3" />
      <path d="M16 21v7" />
      <path d="M9.5 11.5a9 9 0 0 1 13 0M6 8a14 14 0 0 1 20 0" />
    </svg>
  ),
}

export function Stats() {
  const { ref, visible } = useInView<HTMLElement>(0.12)
  return (
    <section
      id="diferenciais"
      ref={ref}
      className={`section stats ${visible ? 'is-inview' : ''}`}
      aria-label="Números e diferenciais"
    >
      <div className="container">
        <div className="section-head">
          <p className="kicker rv">// DIFERENCIAIS</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            UMA OPERAÇÃO INTEIRA A SERVIÇO DO <span className="hl">SEU EVENTO.</span>
          </h2>
        </div>

        <dl className="stats__panel rv" style={{ ['--d' as string]: '.14s' }}>
          {site.stats.map((stat, i) =>
            stat.numeric ? (
              <StatCounter
                key={i}
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                start={visible}
              />
            ) : (
              <div className="stats__item" key={i}>
                <dt className="stats__value">{stat.value}</dt>
                <dd className="stats__label">{stat.label}</dd>
              </div>
            ),
          )}
        </dl>

        <div className="stats__bento">
          {site.differentials.map((card, i) => (
            <article className="stats__card rv" style={{ ['--d' as string]: `${0.18 + i * 0.07}s` }} key={card.title}>
              <span className="stats__icon" aria-hidden="true">
                {ICONS[card.icon]}
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="stats__card-index" aria-hidden="true">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCounter({
  target,
  prefix,
  suffix,
  label,
  start,
}: {
  target: number
  prefix: string
  suffix: string
  label: string
  start: boolean
}) {
  const value = useCountUp(target, start)
  return (
    <div className="stats__item">
      <dt className="stats__value">
        <span className="stats__value-accent">{prefix}</span>
        {value}
        {suffix}
      </dt>
      <dd className="stats__label">{label}</dd>
    </div>
  )
}
