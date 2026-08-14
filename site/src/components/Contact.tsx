import { useState, type FormEvent } from 'react'
import { site, whatsappLink } from '../config/site'
import { useInView } from '../hooks'
import './contact.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface Fields {
  nome: string
  empresa: string
  whatsapp: string
  tipo: string
  data: string
  mensagem: string
  /** honeypot anti-spam — humano não vê nem preenche */
  website: string
}

const EMPTY: Fields = {
  nome: '',
  empresa: '',
  whatsapp: '',
  tipo: '',
  data: '',
  mensagem: '',
  website: '',
}

/** Máscara progressiva de telefone BR: (DD) 90000-0000 */
function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function Contact() {
  const { ref, visible } = useInView<HTMLElement>(0.08)
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: key === 'whatsapp' ? maskPhone(value) : value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (fields.nome.trim().length < 2) next.nome = 'Conte pra gente o seu nome.'
    const digits = fields.whatsapp.replace(/\D/g, '')
    if (digits.length < 10) next.whatsapp = 'Informe um WhatsApp válido com DDD.'
    if (!fields.tipo) next.tipo = 'Escolha o tipo de projeto.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildMessage = (): string =>
    [
      '*Novo briefing pelo site*',
      `Nome: ${fields.nome}`,
      fields.empresa && `Empresa: ${fields.empresa}`,
      `WhatsApp: ${fields.whatsapp}`,
      fields.tipo && `Tipo de projeto: ${fields.tipo}`,
      fields.data && `Data do evento: ${fields.data}`,
      fields.mensagem && `Mensagem: ${fields.mensagem}`,
    ]
      .filter(Boolean)
      .join('\n')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (fields.website) {
      // honeypot preenchido: quase certamente um robô — finge sucesso
      setStatus('success')
      return
    }
    if (!validate()) return

    setStatus('sending')
    try {
      if (site.cta.formEndpoint) {
        const res = await fetch(site.cta.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: fields.nome,
            empresa: fields.empresa,
            whatsapp: fields.whatsapp,
            tipo: fields.tipo,
            data: fields.data,
            mensagem: fields.mensagem,
            origem: 'landing-expansion',
          }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // sem backend configurado: envia o briefing formatado pelo WhatsApp
        window.open(whatsappLink(buildMessage()), '_blank', 'noopener')
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contato"
      ref={ref}
      className={`section contact grain ${visible ? 'is-inview' : ''}`}
      aria-label="Contato e orçamento"
    >
      <span className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__pitch">
          <p className="kicker rv">// CONTATO</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            SEU PRÓXIMO EVENTO MERECE SER LEMBRADO{' '}
            <span className="hl">ENQUANTO AINDA ESTÁ ACONTECENDO.</span>
          </h2>
          <p className="lead rv" style={{ ['--d' as string]: '.14s' }}>
            {site.cta.subheadline}
          </p>

          <div className="contact__actions rv" style={{ ['--d' as string]: '.2s' }}>
            <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5v-.5c0-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7a11 11 0 0 0 4.3 3.8c.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2Z" />
              </svg>
              Falar com a equipe
            </a>
            <a className="btn btn-ghost" href="#trabalhos">
              Ver trabalhos
            </a>
          </div>

          <ul className="contact__channels rv" style={{ ['--d' as string]: '.26s' }}>
            <li>
              <span className="mono-label">E-mail</span>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li>
              <span className="mono-label">Instagram</span>
              <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.contact.instagram.handle}
              </a>
            </li>
            <li>
              <span className="mono-label">Atuação</span>
              <span>{site.brand.country} — cobertura nacional</span>
            </li>
          </ul>
        </div>

        <div className="contact__console rv" style={{ ['--d' as string]: '.18s' }}>
          <div className="contact__console-bar" aria-hidden="true">
            <span className="rec-dot" />
            <span className="contact__console-title">BRIEFING // NOVO PROJETO</span>
            <span className="contact__console-status">{status === 'sending' ? 'ENVIANDO…' : 'PRONTO'}</span>
          </div>

          {status === 'success' ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30">
                  <path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>BRIEFING RECEBIDO</h3>
              <p>
                {site.cta.formEndpoint
                  ? 'Obrigado! Nossa equipe vai te responder em breve.'
                  : 'Abrimos o WhatsApp com o seu briefing pronto — é só enviar a mensagem para concluir.'}
              </p>
              <button className="btn btn-ghost" type="button" onClick={() => { setFields(EMPTY); setStatus('idle') }}>
                Enviar outro briefing
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="f-nome">Nome *</label>
                  <input
                    id="f-nome"
                    name="nome"
                    autoComplete="name"
                    value={fields.nome}
                    onChange={(e) => set('nome', e.target.value)}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? 'err-nome' : undefined}
                    required
                  />
                  {errors.nome && (
                    <p className="contact__error" id="err-nome" role="alert">
                      {errors.nome}
                    </p>
                  )}
                </div>
                <div className="contact__field">
                  <label htmlFor="f-empresa">Empresa</label>
                  <input
                    id="f-empresa"
                    name="empresa"
                    autoComplete="organization"
                    value={fields.empresa}
                    onChange={(e) => set('empresa', e.target.value)}
                  />
                </div>
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="f-whatsapp">WhatsApp *</label>
                  <input
                    id="f-whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(00) 00000-0000"
                    value={fields.whatsapp}
                    onChange={(e) => set('whatsapp', e.target.value)}
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={errors.whatsapp ? 'err-whatsapp' : undefined}
                    required
                  />
                  {errors.whatsapp && (
                    <p className="contact__error" id="err-whatsapp" role="alert">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>
                <div className="contact__field">
                  <label htmlFor="f-data">Data do evento</label>
                  <input
                    id="f-data"
                    name="data"
                    type="date"
                    value={fields.data}
                    onChange={(e) => set('data', e.target.value)}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="f-tipo">Tipo de projeto *</label>
                <select
                  id="f-tipo"
                  name="tipo"
                  value={fields.tipo}
                  onChange={(e) => set('tipo', e.target.value)}
                  aria-invalid={!!errors.tipo}
                  aria-describedby={errors.tipo ? 'err-tipo' : undefined}
                  required
                >
                  <option value="">Selecione…</option>
                  {site.cta.projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.tipo && (
                  <p className="contact__error" id="err-tipo" role="alert">
                    {errors.tipo}
                  </p>
                )}
              </div>

              <div className="contact__field">
                <label htmlFor="f-mensagem">Mensagem</label>
                <textarea
                  id="f-mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Conte o formato do evento, o público esperado e o que você quer que o conteúdo cause."
                  value={fields.mensagem}
                  onChange={(e) => set('mensagem', e.target.value)}
                />
              </div>

              {/* honeypot anti-spam */}
              <div className="contact__hp" aria-hidden="true">
                <label htmlFor="f-website">Não preencha este campo</label>
                <input
                  id="f-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className="contact__error contact__error--global" role="alert">
                  Não conseguimos enviar agora. Tente de novo ou{' '}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    chame direto no WhatsApp
                  </a>
                  .
                </p>
              )}

              <button className="btn btn-primary contact__submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <span className="contact__spinner" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  'Enviar briefing'
                )}
              </button>
              <p className="contact__hint">
                Prefere conversar agora?{' '}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
