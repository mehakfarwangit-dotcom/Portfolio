import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  '> initializing mehak.dashboard v1.0',
  '> loading profile.json ........ OK',
  '> loading skills.csv .......... OK',
  '> connecting projects.db ...... OK',
  '> rendering widgets ........... OK',
  '> ready.'
]

export default function BootScreen({ onDone }) {
  const [shown, setShown] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown(s => s + 1), 280)
    return () => clearTimeout(t)
  }, [shown, onDone])

  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (n) => {
      const t = Math.min(1, (n - start) / 1700)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onDone}
    >
      {LINES.slice(0, shown).map((l, i) => (
        <div className="boot__line" key={i}>{l}</div>
      ))}
      {shown < LINES.length && (
        <div className="boot__line">
          {LINES[shown]?.slice(0, Math.min(LINES[shown].length, 60))}
          <span className="boot__caret" />
        </div>
      )}
      <div className="boot__bar"><div style={{ width: `${progress * 100}%` }} /></div>
      <div className="boot__skip">[click anywhere to skip]</div>
    </motion.div>
  )
}
