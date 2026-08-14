import { useEffect, useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion, useScrollProgress } from '../hooks'
import './chrome.css'

/** Barra de progresso da página + brilho que acompanha o cursor. */
export function Chrome() {
  const progress = useScrollProgress()
  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <CursorGlow />
    </>
  )
}

function CursorGlow() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!finePointer || reduced) return
    const el = ref.current
    if (!el) return
    let raf = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 3
    let x = targetX
    let y = targetY
    let running = false

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      el.style.opacity = '1'
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [finePointer, reduced])

  if (!finePointer || reduced) return null
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
