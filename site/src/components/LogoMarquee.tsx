import { site } from '../config/site'
import './logo-marquee.css'

/** Faixa de autoridade: logos das marcas em movimento contínuo e lento. */
export function LogoMarquee() {
  const items = site.clients
  return (
    <section className="marquee" aria-label="Marcas atendidas">
      <p className="marquee__title mono-label">MARCAS E EVENTOS QUE CONFIARAM NA NOSSA ENTREGA</p>
      <div className="marquee__viewport">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul className="marquee__list" key={copy} aria-hidden={copy === 1}>
              {items.map((client, i) => (
                <li className="marquee__item" key={`${copy}-${i}`}>
                  {client.logo ? (
                    <img src={client.logo} alt={copy === 0 ? client.name : ''} loading="lazy" height="34" />
                  ) : (
                    <span className="marquee__placeholder">{client.name}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
