import { useEffect, useRef } from 'react'
import type { VideoSource } from '../config/site'
import './video-modal.css'

interface Props {
  video: VideoSource
  title: string
  onClose: () => void
}

function embedUrl(video: VideoSource): string | null {
  switch (video.type) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`
    case 'vimeo':
      return `https://player.vimeo.com/video/${video.id}?autoplay=1`
    case 'drive':
      return `https://drive.google.com/file/d/${video.id}/preview`
    case 'file':
      return null
  }
}

/**
 * Modal de vídeo: o player só é criado ao abrir e é destruído ao fechar,
 * o que interrompe a reprodução e evita carregar vídeo antes da interação.
 */
export function VideoModal({ video, title, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // foco circular dentro do modal
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, iframe, video, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [onClose])

  const url = embedUrl(video)

  return (
    <div className="vmodal" role="presentation" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="vmodal__dialog" role="dialog" aria-modal="true" aria-label={title} ref={dialogRef}>
        <div className="vmodal__bar">
          <span className="vmodal__title">
            <span className="rec-dot" aria-hidden="true" />
            {title}
          </span>
          <button ref={closeRef} className="vmodal__close" onClick={onClose} aria-label="Fechar vídeo">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="vmodal__player">
          {video.type === 'file' ? (
            <video src={video.url} controls autoPlay playsInline />
          ) : (
            <iframe
              src={url ?? undefined}
              title={title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="eager"
            />
          )}
        </div>
      </div>
    </div>
  )
}
