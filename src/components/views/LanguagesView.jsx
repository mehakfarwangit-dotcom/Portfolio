import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Widget from '../Widget'
import { languages } from '../../data/mehak'

const COLORS = ['#ff7a59', '#c8ff5e', '#6cd0ff', '#ffd166', '#ff9bb3']

export default function LanguagesView() {
  return (
    <div className="grid grid--main">
      <Widget title="languages.donut / fluency mix" tag={`${languages.length} languages`}>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={languages}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={3}
                stroke="var(--bg-2)"
                strokeWidth={3}
                isAnimationActive
                animationDuration={900}
              >
                {languages.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--text)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Widget>

      <Widget title="languages.detail" tag="self-rated">
        <div className="langChips">
          {languages.map((l, i) => (
            <div key={l.name} className="langChip">
              <span style={{ width: 10, height: 10, borderRadius: 50, background: COLORS[i % COLORS.length] }} />
              <strong>{l.name}</strong>
              <span className="dots">
                {Array.from({ length: 5 }).map((_, j) => (
                  <i key={j} className={j < l.level ? 'on' : ''} />
                ))}
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', marginTop: 18, lineHeight: 1.7 }}>
          // multilingual communication is a core asset for client-facing<br />
          // analytics & business development roles across India + abroad.
        </p>
      </Widget>
    </div>
  )
}
