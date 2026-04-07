import Widget from './Widget'
import useCountUp from '../hooks/useCountUp'
import useInView from '../hooks/useInView'

export default function KpiCard({ value, suffix = '', label, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  // Start the count slightly after the widget's fade-in delay so the user sees the rise.
  const v = useCountUp(value, 1700, inView)

  // mini sparkline (deterministic per label)
  const seed = label.length
  const points = Array.from({ length: 12 }, (_, i) => {
    const y = 10 + Math.sin(i / 1.4 + seed) * 6 + (i * 0.4)
    return `${(i / 11) * 100},${28 - y}`
  }).join(' ')

  return (
    <div ref={ref}>
      <Widget title={`stat / ${label.split(' ')[0].toLowerCase()}`} tag={'live'} delay={delay}>
        <div className="kpi">
          <div className="kpi__num">
            {Math.round(v)}<span className="suffix">{suffix}</span>
          </div>
          <div className="kpi__label">{label}</div>
          <svg className="kpi__spark" viewBox="0 0 100 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              points={points}
            />
            <polyline
              fill={`url(#g-${seed})`}
              stroke="none"
              points={`0,28 ${points} 100,28`}
              opacity="0.18"
            />
          </svg>
        </div>
      </Widget>
    </div>
  )
}
