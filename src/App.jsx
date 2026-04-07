import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import OverviewView from './components/views/OverviewView'
import SkillsView from './components/views/SkillsView'
import ProjectsView from './components/views/ProjectsView'
import ExperienceView from './components/views/ExperienceView'
import EducationView from './components/views/EducationView'
import LanguagesView from './components/views/LanguagesView'
import ContactView from './components/views/ContactView'
import NarrationOverlay from './components/NarrationOverlay'
import useKonami from './hooks/useKonami'
import { startAmbient, stopAmbient, speak, cancelSpeech, primeSpeech, woosh } from './lib/storyEngine'
import { narration } from './data/mehak'

const ORDER = ['overview','skills','projects','experience','education','languages','contact']

const VIEWS = {
  overview:   OverviewView,
  skills:     SkillsView,
  projects:   ProjectsView,
  experience: ExperienceView,
  education:  EducationView,
  languages:  LanguagesView,
  contact:    ContactView
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [section, setSection] = useState('overview')
  const [story, setStory] = useState(false)
  const [hacker, setHacker] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [caption, setCaption] = useState('')
  const storyTimer = useRef(null)

  // On first boot, auto-open the nav drawer on mobile so visitors see the avatar/menu.
  useEffect(() => {
    if (!booted) return
    if (window.matchMedia('(max-width: 760px)').matches) {
      setMobileNavOpen(true)
    }
  }, [booted])

  useKonami(() => setHacker(h => !h))

  useEffect(() => {
    document.documentElement.dataset.theme = hacker ? 'hacker' : ''
  }, [hacker])

  // Story mode lifecycle
  useEffect(() => {
    if (!story) {
      cancelSpeech()
      stopAmbient()
      setCaption('')
      if (storyTimer.current) clearTimeout(storyTimer.current)
      return
    }
    primeSpeech()
    startAmbient()
    let cancelled = false

    const playSection = (id) => {
      if (cancelled) return
      setSection(id)
      woosh()
      // Scroll the main canvas back to the top so the new section is visible
      requestAnimationFrame(() => {
        document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'smooth' })
      })
      const text = narration[id] || ''
      setCaption(text)
      speak(text)
      // Estimate read time: ~165ms per character, min 6s, max 14s
      const dur = Math.max(6500, Math.min(14000, text.length * 75 + 2500))
      storyTimer.current = setTimeout(() => {
        const next = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]
        if (next === 'overview') {
          // Stop after one full pass
          setStory(false)
          return
        }
        playSection(next)
      }, dur)
    }
    playSection(ORDER[0])

    return () => {
      cancelled = true
      if (storyTimer.current) clearTimeout(storyTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story])

  // dot trail (skip on touch devices)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const dot = document.createElement('div')
    dot.className = 'dot-trail'
    document.body.appendChild(dot)
    const move = (e) => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      dot.remove()
    }
  }, [])

  const View = VIEWS[section]

  const handleSectionChange = (id) => {
    if (story) setStory(false)
    if (id !== section) woosh()
    setSection(id)
    setMobileNavOpen(false)
    requestAnimationFrame(() => {
      document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'smooth' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
      <div className={'app-shell' + (mobileNavOpen ? ' nav-open' : '')}>
        <Sidebar
          active={section}
          onChange={handleSectionChange}
          story={story}
          onToggleStory={() => {
            setStory(s => !s)
            setMobileNavOpen(false)
          }}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        <button
          className="mobile-toggle"
          onClick={() => setMobileNavOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <main className="main">
          <DashboardHeader section={section} />
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              className="view"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <View />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      )}

      <AnimatePresence>
        {story && caption && <NarrationOverlay text={caption} section={section} order={ORDER} onSkip={() => setStory(false)} />}
      </AnimatePresence>
    </>
  )
}
