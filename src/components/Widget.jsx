import { motion } from 'framer-motion'

export default function Widget({ title, tag, children, style, delay = 0 }) {
  return (
    <motion.div
      className="widget"
      style={style}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {(title || tag) && (
        <div className="widget__head">
          {title && <div className="widget__title">{title}</div>}
          {tag && <div className="widget__tag">{tag}</div>}
        </div>
      )}
      {children}
    </motion.div>
  )
}
