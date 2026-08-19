import type { CSSProperties } from 'react'
import './video-poster.css'

interface Props {
  /** Título exibido no monitor. */
  label: string
  /** Linha técnica exibida no rodapé do monitor. */
  meta?: string
  /** Imagem de capa opcional (se ausente, gera um poster cinematográfico). */
  thumbnail?: string | null
  /** Arte de fundo opcional (ex.: arte da marca no showreel). */
  art?: string
  /** Sem vídeo disponível — mostra aviso em vez do play. */
  empty?: boolean
  onPlay?: () => void
  className?: string
  style?: CSSProperties
}

/**
 * "Monitor de gravação": capa de vídeo com moldura de viewfinder,
 * REC, timecode e botão de play central.
 */
export function VideoPoster({ label, meta, thumbnail, art, empty, onPlay, className, style }: Props) {
  const Tag = empty || !onPlay ? 'div' : 'button'
  return (
    <Tag
      className={`vposter ${empty ? 'is-empty' : ''} ${className ?? ''}`}
      style={style}
      {...(Tag === 'button'
        ? { type: 'button' as const, onClick: onPlay, 'aria-label': `Assistir: ${label}` }
        : {})}
    >
      <span className="vposter__bg" aria-hidden="true">
        {thumbnail ? (
          <img src={thumbnail} alt="" loading="lazy" decoding="async" />
        ) : art ? (
          <img src={art} alt="" loading="lazy" decoding="async" className="vposter__art" />
        ) : null}
      </span>
      <span className="vposter__scan" aria-hidden="true" />

      {/* cantos de viewfinder */}
      <span className="vposter__corner tl" aria-hidden="true" />
      <span className="vposter__corner tr" aria-hidden="true" />
      <span className="vposter__corner bl" aria-hidden="true" />
      <span className="vposter__corner br" aria-hidden="true" />

      <span className="vposter__hud" aria-hidden="true">
        <span className="vposter__rec">
          <span className="rec-dot" />
          REC
        </span>
        <span className="vposter__cam">4K • 24FPS</span>
      </span>

      {empty ? (
        <span className="vposter__waiting">
          <span className="vposter__waiting-chip">AGUARDANDO MATERIAL</span>
        </span>
      ) : (
        <span className="vposter__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
      )}

      <span className="vposter__foot" aria-hidden="true">
        <span className="vposter__label">{label}</span>
        {meta ? <span className="vposter__meta">{meta}</span> : null}
      </span>
    </Tag>
  )
}
