import useMouseParallax from '../hooks/useMouseParallax'
import { profile } from '../data/mehak'

const NAV = [
  { id: 'overview',   label: 'Overview',    icon: '◇' },
  { id: 'skills',     label: 'Skills',      icon: '◢' },
  { id: 'projects',   label: 'Projects',    icon: '◧' },
  { id: 'experience', label: 'Experience',  icon: '◨' },
  { id: 'education',  label: 'Education',   icon: '◉' },
  { id: 'languages',  label: 'Languages',   icon: '◍' },
  { id: 'contact',    label: 'Run Query',   icon: '▶' }
]

export default function Sidebar({ active, onChange, story, onToggleStory, mobileOpen, onCloseMobile }) {
  const ref = useMouseParallax(8)
  return (
    <aside className={'sidebar' + (mobileOpen ? ' open' : '')}>
      <div className="sidebar__brand">
        <span className="dot" /> mehak.dashboard
        <span style={{ marginLeft: 'auto', color: 'var(--text-mute)' }}>v1.1</span>
      </div>

      <div className="sidebar__avatar" ref={ref}>
        <img src={profile.photo} alt={profile.name} />
        <div className="sidebar__avatarLabel">
          <span>● LIVE</span>
          <span>id://mehak</span>
        </div>
      </div>

      <div>
        <div className="sidebar__name">Mehak<br />Farwan.</div>
        <div className="sidebar__role">{profile.role}</div>
      </div>

      <nav className="sidebar__nav">
        {NAV.map((item, i) => (
          <button
            key={item.id}
            className={'navItem ' + (active === item.id ? 'active' : '')}
            onClick={() => onChange(item.id)}
          >
            <span className="num">0{i + 1}</span>
            <span style={{ width: 14, color: 'var(--accent)' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__foot">
        <button className={'story-btn ' + (story ? 'on' : '')} onClick={onToggleStory}>
          {story ? '■  stop story mode' : '▶  play my story'}
        </button>
        <div style={{ marginTop: 6 }}>narrated · with music</div>
        <div>↑↑↓↓←→←→ B A · try it</div>
        <div>© {new Date().getFullYear()} mehak.farwan</div>
      </div>
    </aside>
  )
}
