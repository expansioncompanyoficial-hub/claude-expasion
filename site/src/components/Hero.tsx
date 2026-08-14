import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'
import { usePrefersReducedMotion, useTimecode } from '../hooks'
import { VideoModal } from './VideoModal'
import './hero.css'

export function Hero() {
  const timecode = useTimecode(24)
  const reduced = usePrefersReducedMotion()
  const [showreelOpen, setShowreelOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // parallax discreto do conteúdo do hero
  useEffect(() => {
    if (reduced) return
    const el = contentRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = Math.min(window.scrollY, window.innerHeight)
      el.style.transform = `translateY(${y * 0.14}px)`
      el.style.opacity = String(Math.max(1 - y / (window.innerHeight * 0.9), 0))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <section id="inicio" className="hero grain" aria-label="Apresentação">
      {/* fundo: vídeo (quando configurado) ou cenário cinematográfico animado */}
      <div className="hero__bg" aria-hidden="true">
        {site.hero.backgroundVideo ? (
          <video
            src={site.hero.backgroundVideo}
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/brand/brand-art.webp"
          />
        ) : (
          <>
            <img src="/brand/brand-art.webp" alt="" className="hero__art" fetchPriority="high" />
            <span className="hero__beam hero__beam--1" />
            <span className="hero__beam hero__beam--2" />
            <span className="hero__scanlines" />
          </>
        )}
        <span className="hero__overlay" />
      </div>

      {/* HUD de câmera */}
      <div className="hero__hud" aria-hidden="true">
        <div className="hero__hud-item hero__hud-rec">
          <span className="rec-dot" />
          <span>REC</span>
          <span className="hero__timecode">{timecode}</span>
        </div>
        <div className="hero__hud-item hero__hud-cam">
          <span className="hero__onair">ON AIR</span>
          <span>CAM A • 4K 24FPS</span>
        </div>
        <div className="hero__hud-item hero__hud-audio">
          <span className="hero__vu">
            <i style={{ animationDelay: '0s' }} />
            <i style={{ animationDelay: '.18s' }} />
            <i style={{ animationDelay: '.36s' }} />
            <i style={{ animationDelay: '.09s' }} />
            <i style={{ animationDelay: '.27s' }} />
          </span>
          <span>AUD L/R</span>
        </div>
        <span className="hero__corner tl" />
        <span className="hero__corner tr" />
        <span className="hero__corner bl" />
        <span className="hero__corner br" />
      </div>

      <div className="hero__content container" ref={contentRef}>
        <p className="hero__tag rv" style={{ ['--d' as string]: '0s' }}>
          <span className="rec-dot" aria-hidden="true" />
          {site.hero.tag}
        </p>

        <h1 className="hero__title">
          <span className="rv" style={{ ['--d' as string]: '.08s' }}>
            {site.hero.headline.line1}
          </span>
          <span className="rv" style={{ ['--d' as string]: '.16s' }}>
            O CONTEÚDO JÁ ESTÁ <em className="hero__title-hl">NO AR.</em>
          </span>
        </h1>

        <p className="hero__sub rv" style={{ ['--d' as string]: '.26s' }}>
          {site.hero.subheadline}
        </p>

        <div className="hero__ctas rv" style={{ ['--d' as string]: '.34s' }}>
          <button className="btn btn-primary" onClick={() => setShowreelOpen(true)} type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
            Assistir showreel
          </button>
          <a className="btn btn-ghost" href="#contato">
            Solicitar orçamento
          </a>
        </div>

        <p className="hero__proof rv" style={{ ['--d' as string]: '.44s' }}>
          {site.hero.proof}
        </p>
      </div>

      <a className="hero__scroll-hint" href="#trabalhos" aria-label="Rolar para os trabalhos">
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>

      {showreelOpen && (
        <VideoModal
          video={site.showreel.video}
          title={site.showreel.videoTitle}
          onClose={() => setShowreelOpen(false)}
        />
      )}
    </section>
  )
}
