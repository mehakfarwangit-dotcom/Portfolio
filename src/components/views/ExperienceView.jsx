import { useState } from 'react'
import { motion } from 'framer-motion'
import Widget from '../Widget'
import { experience, activities } from '../../data/mehak'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function ExperienceView() {
  const [selected, setSelected] = useState(0)
  const exp = experience[selected]

  // Build a monthly axis from Jan 2025 → Dec 2026, place the bar from Nov 2025 → now
  const startIdx = 10 // Nov 2025 in 0..23
  const endIdx = 16   // arbitrary "now" placement (~ May 2026)
  const total = 24
  const left = (startIdx / total) * 100
  const width = ((endIdx - startIdx) / total) * 100

  return (
    <div className="grid grid--main">
      <Widget title="experience.gantt / 2025—2026" tag="active">
        <div className="gantt">
          <div className="gantt__rail">
            <motion.div
              className="gantt__bar"
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ left: `${left}%` }}
              onClick={() => setSelected(0)}
            >
              BDE @ Nettrans · Nov 2025 → Present
            </motion.div>
          </div>
          <div className="gantt__months">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{MONTHS[i]}'25</span>
            ))}
          </div>
          <div className="gantt__months">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{MONTHS[i]}'26</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26, borderTop: '1px dashed var(--line)', paddingTop: 18 }}>
          <div className="widget__title" style={{ marginBottom: 10 }}>leadership / activities log</div>
          {activities.map(a => (
            <div key={a.title} style={{ marginBottom: 14, fontFamily: 'var(--font-sans)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>{a.title}</div>
              <ul style={{ paddingLeft: 18, color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.6, margin: '6px 0 0' }}>
                {a.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="role.detail" tag="selected">
        <div className="expDetails">
          <h3>{exp.role}</h3>
          <div className="org">{exp.org}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', marginBottom: 10 }}>
            {exp.start.replace('-', ' / ')} → {exp.end}
          </div>
          <ul>
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </Widget>
    </div>
  )
}
