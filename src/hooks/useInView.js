import { useEffect, useRef, useState } from 'react'

// Returns [ref, inView]. Once the element has been seen, it stays "in view" (one-shot).
export default function useInView(options = { threshold: 0.35 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      })
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return [ref, inView]
}
