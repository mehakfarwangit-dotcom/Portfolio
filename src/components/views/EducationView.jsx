import { motion } from 'framer-motion'
import Widget from '../Widget'
import { education } from '../../data/mehak'

export default function EducationView() {
  return (
    <Widget title="education.timeline / 2021—2026" tag={`${education.length} entries`}>
      <div className="eduRail">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            className="eduCard"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="eduCard__year">
              {e.yearShort}
              <small>{e.note}</small>
            </div>
            <div>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              <p style={{ marginTop: 4, color: 'var(--accent)' }}>{e.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', marginTop: 14 }}>
        // 4+ years of computer applications · Bachelors → Masters
      </div>
    </Widget>
  )
}
