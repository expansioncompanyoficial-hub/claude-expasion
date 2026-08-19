import { useState } from 'react'
import { site } from '../config/site'
import { useInView } from '../hooks'
import { VideoModal } from './VideoModal'
import { VideoPoster } from './VideoPoster'
import './showreel.css'

export function Showreel() {
  const [open, setOpen] = useState(false)
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
      id="showreel"
      ref={ref}
      className={`section showreel ${visible ? 'is-inview' : ''}`}
      aria-label="Showreel"
    >
      <div className="container">
        <div className="section-head showreel__head">
          <p className="kicker rv">{site.showreel.kicker}</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            NÃO EXPLICAMOS APENAS. <span className="hl">NÓS MOSTRAMOS.</span>
          </h2>
        </div>

        <div className="showreel__stage rv" style={{ ['--d' as string]: '.16s' }}>
          <VideoPoster
            label="Showreel Expansion"
            meta="REEL • 16:9"
            art="/brand/brand-art.webp"
            onPlay={() => setOpen(true)}
            className="showreel__poster"
          />
          <ul className="showreel__points" aria-label="Frentes de atuação">
            {site.showreel.dataPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {open && (
        <VideoModal video={site.showreel.video} title={site.showreel.videoTitle} onClose={() => setOpen(false)} />
      )}
    </section>
  )
}
