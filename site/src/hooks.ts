import { useCallback, useEffect, useRef, useState } from 'react'

/** true quando o usuário prefere movimento reduzido. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Media query reativa. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** Observa a entrada do elemento na viewport (uma única vez). */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/** Contador animado de 0 até `target` quando `start` vira true. */
export function useCountUp(target: number, start: boolean, duration = 1600): number {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration, reduced])
  return value
}

/** Timecode estilo câmera (HH:MM:SS:FF a 24fps) correndo desde a montagem. */
export function useTimecode(fps = 24): string {
  const reduced = usePrefersReducedMotion()
  const [code, setCode] = useState('00:00:00:00')
  useEffect(() => {
    if (reduced) {
      setCode('01:24:00:00')
      return
    }
    let raf = 0
    let lastFrame = -1
    const t0 = performance.now()
    const pad = (n: number) => String(n).padStart(2, '0')
    const tick = (now: number) => {
      const totalFrames = Math.floor(((now - t0) / 1000) * fps)
      if (totalFrames !== lastFrame) {
        lastFrame = totalFrames
        const f = totalFrames % fps
        const s = Math.floor(totalFrames / fps)
        setCode(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [fps, reduced])
  return code
}

/** Progresso de rolagem da página, 0 a 1. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return progress
}

/** Seção ativa para o indicador do menu. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const visible = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        }
        let best = ''
        let bestRatio = -1
        for (const id of ids) {
          const r = visible.get(id)
          if (r !== undefined && r > bestRatio) {
            best = id
            bestRatio = r
          }
        }
        if (best) setActive(best)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.05, 0.25, 0.5] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [ids])
  return active
}

/** Navegação de abas acessível (setas, Home e End). */
export function useTabListKeyboard(count: number, active: number, onChange: (i: number) => void) {
  return useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      let next: number | null = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % count
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + count) % count
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = count - 1
      if (next !== null) {
        e.preventDefault()
        onChange(next)
        const list = e.currentTarget
        const tabs = list.querySelectorAll<HTMLElement>('[role="tab"]')
        tabs[next]?.focus()
      }
    },
    [count, active, onChange],
  )
}
