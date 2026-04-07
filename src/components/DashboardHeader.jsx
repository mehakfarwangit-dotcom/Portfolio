import { useEffect, useState } from 'react'

const SECTION_TITLES = {
  overview:   ['the', 'overview'],
  skills:     ['the', 'skill·set'],
  projects:   ['the', 'projects'],
  experience: ['the', 'experience'],
  education:  ['the', 'education'],
  languages:  ['the', 'languages'],
  contact:    ['run', 'query.']
}

export default function DashboardHeader({ section }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const [pre, main] = SECTION_TITLES[section] || SECTION_TITLES.overview

  return (
    <div className="dashHeader">
      <div>
        <h1 className="dashHeader__title">
          <span style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontWeight: 600 }}>{pre} </span>
          <span className="accent">{main}</span>
        </h1>
        <div className="dashHeader__sub">// section: {section.toUpperCase()} · scope: mehak.farwan</div>
      </div>
      <div className="dashHeader__meta">
        <div className="live">live · IST</div>
        <div>{now.toLocaleDateString(undefined, { weekday:'short', day:'2-digit', month:'short', year:'numeric' })}</div>
        <div>{now.toLocaleTimeString()}</div>
        <div>last refresh · {Math.floor((Date.now() / 1000) % 60)}s ago</div>
      </div>
    </div>
  )
}
