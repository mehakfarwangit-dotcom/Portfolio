import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NarrationOverlay({ text, section, order, onSkip }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [text])

  const idx = order.indexOf(section)

  return (
    <motion.div
      className="narration"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="narration__inner">
        <div className="narration__head">
          <span className="narration__live">● story mode</span>
          <span className="narration__step">chapter {String(idx + 1).padStart(2, '0')} / {String(order.length).padStart(2, '0')} · {section}</span>
          <button className="narration__skip" onClick={onSkip}>■ stop</button>
        </div>
        <div className="narration__text">
          "{shown}<span className="narration__caret" />"
        </div>
        <div className="narration__bar">
          {order.map((s, i) => (
            <span key={s} className={i <= idx ? 'on' : ''} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
