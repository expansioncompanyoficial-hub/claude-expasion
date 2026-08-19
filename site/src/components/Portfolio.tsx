import { useMemo, useState } from 'react'
import { site, type PortfolioItem, type VideoSource } from '../config/site'
import { useInView } from '../hooks'
import { Tabs } from './Tabs'
import { VideoModal } from './VideoModal'
import { VideoPoster } from './VideoPoster'
import './portfolio.css'

export function Portfolio() {
  const [activeTab, setActiveTab] = useState(0)
  const [playing, setPlaying] = useState<{ video: VideoSource; title: string } | null>(null)
  const { ref, visible } = useInView<HTMLElement>(0.08)

  const tabs = site.portfolio.tabs
  const currentTab = tabs[activeTab]
  const items = useMemo(
    () => site.portfolio.items.filter((item) => item.tab === currentTab.id),
    [currentTab.id],
  )
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <section
      id="trabalhos"
      ref={ref}
      className={`section portfolio ${visible ? 'is-inview' : ''}`}
      aria-label="Trabalhos"
    >
      <div className="container">
        <div className="section-head">
          <p className="kicker rv">// TRABALHOS</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            TRABALHOS QUE CONTINUAM <span className="hl">VIVOS</span> DEPOIS QUE O EVENTO TERMINA.
          </h2>
        </div>

        <div className="rv" style={{ ['--d' as string]: '.16s' }}>
          <Tabs
            tabs={tabs.map((t) => ({ id: t.id, label: t.label }))}
            active={activeTab}
            onChange={setActiveTab}
            idBase="portfolio"
            ariaLabel="Categorias de trabalhos"
          />
        </div>

        {/* régua de timeline decorativa */}
        <div className="portfolio__ruler rv" style={{ ['--d' as string]: '.2s' }} aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} className={i % 6 === 0 ? 'is-major' : ''} />
          ))}
          <span className="portfolio__playhead" />
        </div>

        <div
          key={currentTab.id}
          className="tabpanel"
          role="tabpanel"
          id={`portfolio-panel-${currentTab.id}`}
          aria-labelledby={`portfolio-tab-${currentTab.id}`}
        >
          {featured ? (
            <article className="portfolio__featured">
              <VideoPoster
                label={featured.title}
                meta={`${featured.year} • ${featured.city}`}
                thumbnail={featured.thumbnail}
                empty={!featured.video}
                onPlay={
                  featured.video
                    ? () => setPlaying({ video: featured.video!, title: featured.title })
                    : undefined
                }
                className="portfolio__featured-video"
              />
              <div className="portfolio__meta">
                <p className="portfolio__meta-label mono-label">PROJETO EM DESTAQUE</p>
                <h3 className="portfolio__meta-title">{featured.title}</h3>
                <dl className="portfolio__meta-specs">
                  <div>
                    <dt>Categoria</dt>
                    <dd>{featured.category}</dd>
                  </div>
                  <div>
                    <dt>Ano</dt>
                    <dd>{featured.year}</dd>
                  </div>
                  <div>
                    <dt>Cidade</dt>
                    <dd>{featured.city}</dd>
                  </div>
                </dl>
                <p className="portfolio__meta-desc">{featured.description}</p>
                {featured.video ? (
                  <button
                    className="btn btn-ghost portfolio__meta-btn"
                    onClick={() => setPlaying({ video: featured.video!, title: featured.title })}
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                    </svg>
                    Assistir projeto
                  </button>
                ) : (
                  <p className="portfolio__meta-waiting mono-label">
                    Vídeo em curadoria — em breve nesta aba.
                  </p>
                )}
              </div>
            </article>
          ) : (
            <p className="portfolio__empty mono-label">Projetos desta categoria em curadoria.</p>
          )}

          {rest.length > 0 && (
            <div className="portfolio__rail" role="list" aria-label="Mais projetos desta categoria">
              {rest.map((item) => (
                <PortfolioCard key={item.title} item={item} onPlay={setPlaying} />
              ))}
            </div>
          )}
        </div>
      </div>

      {playing && (
        <VideoModal video={playing.video} title={playing.title} onClose={() => setPlaying(null)} />
      )}
    </section>
  )
}

function PortfolioCard({
  item,
  onPlay,
}: {
  item: PortfolioItem
  onPlay: (p: { video: VideoSource; title: string }) => void
}) {
  return (
    <article className="portfolio__card" role="listitem">
      <VideoPoster
        label={item.title}
        meta={`${item.year} • ${item.city}`}
        thumbnail={item.thumbnail}
        empty={!item.video}
        onPlay={item.video ? () => onPlay({ video: item.video!, title: item.title }) : undefined}
      />
      <p className="portfolio__card-desc">
        <span className="portfolio__card-cat">{item.category}</span>
        {item.description}
      </p>
    </article>
  )
}
