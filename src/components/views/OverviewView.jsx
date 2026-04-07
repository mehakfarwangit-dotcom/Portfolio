import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import KpiCard from '../KpiCard'
import { kpis, profile, radarData } from '../../data/mehak'

export default function OverviewView() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="hero__photo">
        <motion.img
          src="/mehak-presenting.png"
          alt="Mehak Farwan"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <div className="hero__photoFrame" />
        <div className="hero__photoMeta">
          <span>● live</span>
          <span>frame · 01</span>
        </div>
      </div>

      <div className="hero__copy">
        <div className="hero__kicker">profile · 01 / mehak.farwan</div>
        <h2 className="hero__name">
          The analyst<br />
          who turns <span className="hero__name--accent">noise</span><br />
          into <span className="hero__name--italic">decisions.</span>
        </h2>
        <p className="hero__bio">{profile.bio}</p>

        <div className="hero__meta">
          <div>
            <span className="hero__metaKey">status</span>
            <span className="hero__metaVal good">● open to opportunities</span>
          </div>
          <div>
            <span className="hero__metaKey">based in</span>
            <span className="hero__metaVal">{profile.location}</span>
          </div>
          <div>
            <span className="hero__metaKey">email</span>
            <a className="hero__metaVal link" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <span className="hero__metaKey">phone</span>
            <a className="hero__metaVal link" href={`tel:${profile.phone.replace(/\s/g,'')}`}>{profile.phone}</a>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__kpis">
            {kpis.map((k, i) => (
              <KpiCard key={k.label} value={k.value} suffix={k.suffix} label={k.label} delay={i * 0.08} />
            ))}
          </div>

          <div className="hero__radar">
            <div className="hero__radarHead">
              <span className="widget__title">skills.radar</span>
              <span className="widget__tag">5 axes</span>
            </div>
            <div className="hero__radarChart">
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius="78%">
                  <PolarGrid stroke="var(--line)" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: 'var(--text-dim)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
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
          </div>
        </div>
      </div>
    </motion.section>
  )
}
