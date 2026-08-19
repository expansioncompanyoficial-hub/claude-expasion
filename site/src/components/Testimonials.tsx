import { useState } from 'react'
import { site, type VideoSource } from '../config/site'
import { useInView } from '../hooks'
import { Tabs } from './Tabs'
import { VideoModal } from './VideoModal'
import { VideoPoster } from './VideoPoster'
import './testimonials.css'

const TABS = [
  { id: 'videos', label: 'Em vídeo', featured: true },
  { id: 'escritos', label: 'Escritos' },
  { id: 'resultados', label: 'Resultados' },
]

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function Testimonials() {
  const [tab, setTab] = useState(0)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState<{ video: VideoSource; title: string } | null>(null)
  const { ref, visible } = useInView<HTMLElement>(0.08)

  const videos = site.testimonials.videos
  const person = videos[current]
  const tabId = TABS[tab].id

  const prev = () => setCurrent((current - 1 + videos.length) % videos.length)
  const next = () => setCurrent((current + 1) % videos.length)

  return (
    <section
      id="depoimentos"
      ref={ref}
      className={`section testimonials ${visible ? 'is-inview' : ''}`}
      aria-label="Depoimentos"
    >
      <div className="container">
        <div className="section-head">
          <p className="kicker rv">// {site.testimonials.kicker}</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            QUEM VIVEU A PRODUÇÃO <span className="hl">CONTA MELHOR.</span>
          </h2>
        </div>

        <div className="rv" style={{ ['--d' as string]: '.16s' }}>
          <Tabs tabs={TABS} active={tab} onChange={setTab} idBase="depo" ariaLabel="Formatos de depoimento" />
        </div>

        {/* ---------- aba: vídeos ---------- */}
        {tabId === 'videos' && (
          <div
            key="videos"
            className="tabpanel testimonials__videos"
            role="tabpanel"
            id="depo-panel-videos"
            aria-labelledby="depo-tab-videos"
          >
            <VideoPoster
              label={person.name}
              meta={person.projectType}
              onPlay={() => setPlaying({ video: person.video, title: `Depoimento — ${person.name}` })}
              className="testimonials__main"
            />

            <div className="testimonials__side">
              <div className="testimonials__person">
                <span className="testimonials__avatar" aria-hidden="true">
                  {person.photo ? <img src={person.photo} alt="" loading="lazy" /> : initials(person.name)}
                </span>
                <div>
                  <p className="testimonials__name">{person.name}</p>
                  <p className="testimonials__role">
                    {person.role} • {person.company}
                  </p>
                  <p className="testimonials__type mono-label">{person.projectType}</p>
                </div>
              </div>

              <div className="testimonials__thumbs" role="list" aria-label="Escolher depoimento">
                {videos.map((v, i) => (
                  <button
                    key={v.name + i}
                    type="button"
                    role="listitem"
                    className={`testimonials__thumb ${i === current ? 'is-active' : ''}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ver depoimento de ${v.name}`}
                    aria-current={i === current}
                  >
                    <span className="testimonials__thumb-avatar" aria-hidden="true">
                      {v.photo ? <img src={v.photo} alt="" loading="lazy" /> : initials(v.name)}
                    </span>
                    <span className="testimonials__thumb-name">{v.name}</span>
                  </button>
                ))}
              </div>

              <div className="testimonials__navrow">
                <button type="button" className="testimonials__navbtn" onClick={prev} aria-label="Depoimento anterior">
                  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                    <path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <span className="mono-label">
                  {String(current + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
                </span>
                <button type="button" className="testimonials__navbtn" onClick={next} aria-label="Próximo depoimento">
                  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                    <path d="M5.5 2.5 11 8l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- aba: escritos ---------- */}
        {tabId === 'escritos' && (
          <div
            key="escritos"
            className="tabpanel testimonials__quotes"
            role="tabpanel"
            id="depo-panel-escritos"
            aria-labelledby="depo-tab-escritos"
          >
            {site.testimonials.quotes.map((q, i) => (
              <figure className="testimonials__quote" key={i}>
                <span className="testimonials__quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{q.quote}</blockquote>
                <figcaption>
                  <span className="testimonials__avatar sm" aria-hidden="true">
                    {q.photo ? <img src={q.photo} alt="" loading="lazy" /> : initials(q.name)}
                  </span>
                  <span>
                    <span className="testimonials__name">{q.name}</span>
                    <span className="testimonials__role">
                      {q.role} • {q.company}
                    </span>
                  </span>
                  {q.logo ? <img className="testimonials__quote-logo" src={q.logo} alt={q.company} loading="lazy" /> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* ---------- aba: resultados ---------- */}
        {tabId === 'resultados' && (
          <div
            key="resultados"
            className="tabpanel testimonials__results"
            role="tabpanel"
            id="depo-panel-resultados"
            aria-labelledby="depo-tab-resultados"
          >
            {site.testimonials.results.map((r, i) => (
              <article className="testimonials__case" key={i}>
                <p className="testimonials__case-client">
                  <span className="rec-dot" aria-hidden="true" />
                  {r.client}
                </p>
                <dl>
                  <div>
                    <dt>Desafio</dt>
                    <dd>{r.challenge}</dd>
                  </div>
                  <div>
                    <dt>Solução</dt>
                    <dd>{r.solution}</dd>
                  </div>
                  <div>
                    <dt>Entrega</dt>
                    <dd>{r.delivery}</dd>
                  </div>
                  <div className="is-result">
                    <dt>Resultado</dt>
                    <dd>{r.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </div>

      {playing && <VideoModal video={playing.video} title={playing.title} onClose={() => setPlaying(null)} />}
    </section>
  )
}
