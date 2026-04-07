import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import Widget from '../Widget'
import { skillCategories, radarData } from '../../data/mehak'

function SkillBar({ name, level, delay }) {
  return (
    <div className="skillBar">
      <div className="skillBar__name">{name}</div>
      <div className="skillBar__track">
        <motion.div
          className="skillBar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
      <div className="skillBar__val">{level}</div>
    </div>
  )
}

export default function SkillsView() {
  return (
    <>
      <div className="grid grid--main">
        <Widget title="skills.detail / by category" tag={`${skillCategories.length} groups`}>
          {skillCategories.map((cat) => (
            <div className="skillGroup" key={cat.key}>
              <h4>{cat.title}</h4>
              {cat.skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
              ))}
            </div>
          ))}
        </Widget>

        <Widget title="skills.radar / aggregate" tag="self-rated">
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="78%">
                <PolarGrid stroke="var(--line)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: 'var(--text-mute)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
                  stroke="var(--line)"
                />
                <Radar
                  dataKey="value"
                  stroke="var(--accent)"
                  fill="var(--accent)"
                  fillOpacity={0.35}
                  isAnimationActive
                  animationDuration={900}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', marginTop: 10 }}>
            // hover bars on the left for category breakdowns
          </div>
        </Widget>
      </div>
    </>
  )
}
