import { useEffect, useRef } from 'react'

// Prevents the page behind an open menu / lightbox from scrolling (incl. iOS Safari).
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const { body } = document
    const y = window.scrollY
    const prev = body.style.cssText
    body.style.cssText += `;position:fixed;top:-${y}px;left:0;right:0;overflow:hidden;width:100%`
    return () => {
      body.style.cssText = prev
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
    }
  }, [locked])
}

// Horizontal swipe detection for touch devices. Returns props to spread on the element.
export function useSwipe(onLeft, onRight, threshold = 45) {
  const start = useRef(null)
  return {
    onTouchStart: (e) => {
      const t = e.touches[0]
      start.current = { x: t.clientX, y: t.clientY }
    },
    onTouchEnd: (e) => {
      if (!start.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.current.x
      const dy = t.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.2) (dx < 0 ? onLeft : onRight)()
    },
  }
}
