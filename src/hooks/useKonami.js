import { useEffect } from 'react'

const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function useKonami(onTrigger) {
  useEffect(() => {
    let buf = []
    const handler = (e) => {
      buf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key)
      if (buf.length > SEQ.length) buf = buf.slice(-SEQ.length)
      if (buf.length === SEQ.length && buf.every((k, i) => k === SEQ[i])) {
        onTrigger()
        buf = []
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onTrigger])
}
