// Story engine — synthesized ambient music (WebAudio) + browser TTS narration.
// No binary assets required.

let ctx = null
let masterGain = null
let nodes = []

function ensureCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
  }
  return ctx
}

export function startAmbient() {
  const c = ensureCtx()
  if (!c) return
  if (c.state === 'suspended') c.resume()
  stopAmbient(false) // clear any previous

  const now = c.currentTime

  // Soft pad: a few detuned sine/triangle oscillators through a slow LP filter
  // with a gentle LFO on the filter cutoff for movement.
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900
  filter.Q.value = 0.6
  filter.connect(masterGain)

  // LFO on filter
  const lfo = c.createOscillator()
  const lfoGain = c.createGain()
  lfo.frequency.value = 0.08
  lfoGain.gain.value = 350
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start(now)
  nodes.push(lfo, lfoGain)

  // Notes — a soft Cmaj9-ish chord (C, E, G, B, D)
  const freqs = [130.81, 164.81, 196.00, 246.94, 293.66]
  freqs.forEach((f, i) => {
    const o1 = c.createOscillator()
    const o2 = c.createOscillator()
    o1.type = 'sine'
    o2.type = 'triangle'
    o1.frequency.value = f
    o2.frequency.value = f * 1.005 // slight detune
    const g = c.createGain()
    g.gain.value = 0
    o1.connect(g); o2.connect(g)
    g.connect(filter)
    o1.start(now); o2.start(now)
    // Stagger fade-in
    g.gain.linearRampToValueAtTime(0.04 + i * 0.005, now + 1.6 + i * 0.2)
    nodes.push(o1, o2, g)
  })

  // Soft tick (subtle pulse every ~3s) — gives it a "data" feel
  const tickGain = c.createGain()
  tickGain.gain.value = 0
  tickGain.connect(masterGain)
  const tickInterval = setInterval(() => {
    if (!ctx) return
    const tNow = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 660
    g.gain.value = 0
    o.connect(g)
    g.connect(masterGain)
    g.gain.linearRampToValueAtTime(0.015, tNow + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, tNow + 0.4)
    o.start(tNow)
    o.stop(tNow + 0.45)
  }, 3200)
  nodes.push({ stop: () => clearInterval(tickInterval), disconnect: () => {} })

  // Master fade-in
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(masterGain.gain.value, now)
  masterGain.gain.linearRampToValueAtTime(0.35, now + 1.4)
}

export function stopAmbient(fade = true) {
  if (!ctx) return
  const now = ctx.currentTime
  if (masterGain && fade) {
    masterGain.gain.cancelScheduledValues(now)
    masterGain.gain.setValueAtTime(masterGain.gain.value, now)
    masterGain.gain.linearRampToValueAtTime(0, now + 0.6)
  }
  setTimeout(() => {
    nodes.forEach(n => {
      try { n.stop && n.stop() } catch(e){}
      try { n.disconnect && n.disconnect() } catch(e){}
    })
    nodes = []
  }, fade ? 700 : 0)
}

// ---------- Speech ----------

let _voice = null

function pickVoice() {
  if (!('speechSynthesis' in window)) return null
  if (_voice) return _voice
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  // Prefer an English female voice
  const prefs = [
    v => /en(-|_)?(IN|GB|US|AU)/i.test(v.lang) && /female|samantha|victoria|karen|tessa|zira|google.*us english/i.test(v.name),
    v => /en/i.test(v.lang) && /female|samantha|victoria|karen|tessa|zira/i.test(v.name),
    v => /en(-|_)?IN/i.test(v.lang),
    v => /en(-|_)?GB/i.test(v.lang),
    v => /en/i.test(v.lang)
  ]
  for (const test of prefs) {
    const m = voices.find(test)
    if (m) { _voice = m; return m }
  }
  _voice = voices[0]
  return _voice
}

export function primeSpeech() {
  if (!('speechSynthesis' in window)) return
  // Some browsers need a "warm-up" utterance after first user gesture
  const u = new SpeechSynthesisUtterance('')
  window.speechSynthesis.speak(u)
  // Trigger voice list load
  window.speechSynthesis.onvoiceschanged = () => { _voice = null; pickVoice() }
  pickVoice()
}

export function speak(text, { onEnd } = {}) {
  if (!('speechSynthesis' in window)) { onEnd && onEnd(); return }
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const v = pickVoice()
  if (v) u.voice = v
  u.rate = 0.96
  u.pitch = 1.05
  u.volume = 1
  u.onend = () => onEnd && onEnd()
  u.onerror = () => onEnd && onEnd()
  window.speechSynthesis.speak(u)
}

export function cancelSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}
