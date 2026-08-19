import { site } from '../config/site'
import { useInView } from '../hooks'
import './process.css'

export function Process() {
  const { ref, visible } = useInView<HTMLElement>(0.15)
  return (
    <section
      id="processo"
      ref={ref}
      className={`section process ${visible ? 'is-inview' : ''}`}
      aria-label="Como trabalhamos"
    >
      <div className="container">
        <div className="section-head">
          <p className="kicker rv">// PROCESSO</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            {site.process.headline}
          </h2>
          <p className="lead rv" style={{ ['--d' as string]: '.14s' }}>
            {site.process.support}
          </p>
        </div>

        <ol className="process__timeline">
          <span className={`process__line ${visible ? 'is-live' : ''}`} aria-hidden="true" />
          {site.process.steps.map((step, i) => (
            <li className="process__step rv" style={{ ['--d' as string]: `${0.2 + i * 0.12}s` }} key={step.title}>
              <span className="process__node" aria-hidden="true">
                <span className="process__node-dot" />
              </span>
              <span className="process__index">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
