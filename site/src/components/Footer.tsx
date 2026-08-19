import { site, whatsappLink } from '../config/site'
import './footer.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" aria-label="Rodapé">
      <div className="container footer__inner">
        <div className="footer__brand">
          <picture>
            <source srcSet="/brand/logo-horizontal.webp" type="image/webp" />
            <img src="/brand/logo-horizontal.png" alt={site.brand.name} width="560" height="88" loading="lazy" />
          </picture>
          <p className="footer__tagline mono-label">PRODUÇÃO AUDIOVISUAL • EVENTOS • TEMPO REAL</p>
        </div>

        <nav className="footer__links" aria-label="Atalhos">
          <a href="#trabalhos">Trabalhos</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#contato">Contato</a>
        </nav>

        <ul className="footer__contacts">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${site.contact.email}`}>E-mail</a>
          </li>
        </ul>
      </div>

      <div className="container footer__base">
        <p>
          © {year} {site.brand.name} — {site.brand.country}
        </p>
        <a href="#inicio" className="footer__top">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
