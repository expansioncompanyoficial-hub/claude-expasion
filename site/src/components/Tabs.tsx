import { useTabListKeyboard } from '../hooks'
import './tabs.css'

export interface TabDef {
  id: string
  label: string
  /** Destaque visual (ex.: aba mais importante). */
  featured?: boolean
}

interface Props {
  tabs: TabDef[]
  active: number
  onChange: (index: number) => void
  /** Prefixo para os ids de aba/painel (acessibilidade). */
  idBase: string
  ariaLabel: string
}

/** Lista de abas acessível: setas, Home/End, estados claros. */
export function Tabs({ tabs, active, onChange, idBase, ariaLabel }: Props) {
  const onKeyDown = useTabListKeyboard(tabs.length, active, onChange)
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          role="tab"
          id={`${idBase}-tab-${tab.id}`}
          aria-selected={i === active}
          aria-controls={`${idBase}-panel-${tab.id}`}
          tabIndex={i === active ? 0 : -1}
          className={`tabs__tab ${i === active ? 'is-active' : ''} ${tab.featured ? 'is-featured' : ''}`}
          onClick={() => onChange(i)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
