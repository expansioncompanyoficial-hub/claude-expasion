import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'
import { useScrollSpy } from '../hooks'
import './navbar.css'

const LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'depoimentos', label: 'Depoimentos', featured: true },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'contato', label: 'Contato' },
]

const SECTION_IDS = LINKS.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__logo" href="#inicio" aria-label={`${site.brand.name} — início`}>
          <picture>
            <source srcSet="/brand/logo-horizontal.webp" type="image/webp" />
            <img
              src="/brand/logo-horizontal.png"
              alt={site.brand.name}
              width="560"
              height="88"
              fetchPriority="high"
            />
          </picture>
        </a>

        <nav className="nav__links" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''} ${
                link.featured ? 'is-featured' : ''
              }`}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn-primary nav__cta" href="#contato">
            Solicitar orçamento
          </a>
          <button
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={`nav__mobile ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Navegação móvel">
          {LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__mobile-link ${link.featured ? 'is-featured' : ''}`}
              style={{ transitionDelay: open ? `${0.06 + i * 0.05}s` : '0s' }}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="nav__mobile-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary nav__mobile-cta"
          href="#contato"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Solicitar orçamento
        </a>
      </div>
    </header>
  )
}
