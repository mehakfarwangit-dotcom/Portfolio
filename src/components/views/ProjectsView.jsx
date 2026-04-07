import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectFilters } from '../../data/mehak'

function ProjectCard({ p }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <motion.article
      layout
      className="project"
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="project__id">{p.id} · {p.category.join(' / ')}</div>
      <div className="project__title">{p.title}</div>
      <div className="project__tech">
        {p.tech.map(t => <span key={t}>{t}</span>)}
      </div>
      <ul className="project__bullets">
        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="project__metric">
        <span>{p.metric.label}</span>
        <div className="project__metricBar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${p.metric.value}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <span style={{ color: 'var(--accent)' }}>{p.metric.value}%</span>
      </div>
    </motion.article>
  )
}

export default function ProjectsView() {
  const [filter, setFilter] = useState('All')
  const visible = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter(p => p.category.includes(filter))
  }, [filter])

  return (
    <div>
      <div className="filters">
        {projectFilters.map(f => (
          <button
            key={f}
            className={'chip ' + (filter === f ? 'active' : '')}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? `all (${projects.length})` : f}
          </button>
        ))}
      </div>
      <motion.div layout className="projectGrid">
        <AnimatePresence>
          {visible.map(p => <ProjectCard key={p.id} p={p} />)}
        </AnimatePresence>
      </motion.div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', marginTop: 18 }}>
        // SELECT * FROM projects WHERE category LIKE '%{filter}%';
      </div>
    </div>
  )
}
