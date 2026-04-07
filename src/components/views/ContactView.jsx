import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Widget from '../Widget'
import { profile } from '../../data/mehak'

const ROWS = [
  { col: 'email',    val: profile.email },
  { col: 'phone',    val: profile.phone },
  { col: 'location', val: profile.location },
  { col: 'status',   val: 'open_to_work' }
]

export default function ContactView() {
  const [ran, setRan] = useState(false)
  const [copied, setCopied] = useState(null)

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="grid grid--main">
      <Widget title="query.editor / sql" tag="psql">
        <div className="sql">
          <div className="sql__head">
            <div className="sql__dots"><i /><i /><i /></div>
            <div>~/mehak.farwan/contact.sql</div>
          </div>
          <div>
            <span className="kw">SELECT</span>{' '}
            <span className="col">email</span><span className="punc">,</span>{' '}
            <span className="col">phone</span><span className="punc">,</span>{' '}
            <span className="col">location</span><span className="punc">,</span>{' '}
            <span className="col">status</span><br />
            <span className="kw">FROM</span> mehak<br />
            <span className="kw">WHERE</span> status <span className="punc">=</span>{' '}
            <span className="str">'open_to_work'</span><span className="punc">;</span>
          </div>
        </div>
        <button className="runBtn" onClick={() => setRan(true)}>
          ▶ run query
        </button>

        <AnimatePresence>
          {ran && (
            <motion.div
              className="resultTable"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="row head">
                <div>column</div><div>value</div><div>action</div>
              </div>
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.col}
                  className="row"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="col">{r.col}</div>
                  <div className="val">{r.val}</div>
                  <div className="copy" onClick={() => copy(r.val, r.col)}>
                    {copied === r.col ? '✓ copied' : 'copy'}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="foot">{ran ? `// 4 rows returned in 0.${Math.floor(Math.random()*89)+10}s` : '// click run to fetch contact data'}</div>
      </Widget>

      <Widget title="say.hello / channels" tag="async">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <a href={`mailto:${profile.email}`} className="langChip" style={{ justifyContent: 'flex-start' }}>
            <span style={{ color: 'var(--accent)' }}>@</span> {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g,'')}`} className="langChip" style={{ justifyContent: 'flex-start' }}>
            <span style={{ color: 'var(--accent)' }}>☎</span> {profile.phone}
          </a>
          <div className="langChip" style={{ justifyContent: 'flex-start' }}>
            <span style={{ color: 'var(--accent)' }}>◉</span> {profile.location}
          </div>
        </div>

        <div style={{ marginTop: 24, fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.3 }}>
          Let's turn data into <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>decisions</span> together.
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', marginTop: 12 }}>
          — Mehak
        </div>
      </Widget>
    </div>
  )
}
