import { useEffect, useRef, useState } from 'react'

// Counts from 0 → target, but only starts once `start` is true.
// Returns [value, ref]; attach the ref to the element you want to observe.
export default function useCountUp(target, duration = 1600, start = true) {
  const [val, setVal] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return val
}
