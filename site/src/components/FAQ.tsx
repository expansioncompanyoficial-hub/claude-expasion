import { useState } from 'react'
import { site } from '../config/site'
import { useInView } from '../hooks'
import './faq.css'

export function FAQ() {
  const { ref, visible } = useInView<HTMLElement>(0.1)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" ref={ref} className={`section faq ${visible ? 'is-inview' : ''}`} aria-label="Perguntas frequentes">
      <div className="container faq__wrap">
        <div className="section-head">
          <p className="kicker rv">// FAQ</p>
          <h2 className="headline rv" style={{ ['--d' as string]: '.08s' }}>
            PERGUNTAS <span className="hl">FREQUENTES.</span>
          </h2>
        </div>

        <div className="faq__list rv" style={{ ['--d' as string]: '.14s' }}>
          {site.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={i}>
                <h3>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__text">{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="14" height="14">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="faq__answer"
                >
                  <div className="faq__answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
