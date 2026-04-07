import { useEffect, useRef } from 'react'

// Tilts the element slightly toward the cursor.
export default function useMouseParallax(strength = 6) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      el.style.transform = `perspective(800px) rotateY(${dx * strength}deg) rotateX(${-dy * strength}deg)`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [strength])
  return ref
}
