import { useState, useEffect } from 'react'
import { isFirebaseConfigured } from '../lib/firebaseConfig'
import { defaultMatches, docToMatch } from '../data/matchData'

export default function useMatches() {
  const [matches, setMatches] = useState(defaultMatches)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let cancelled = false

    const fetchMatches = async () => {
      try {
        // Carga diferida: Firebase no entra en el bundle inicial
        const [{ getDoc }, { playerMatchDoc }] = await Promise.all([
          import('firebase/firestore'),
          import('../lib/firebase'),
        ])
        const [lastSnap, nextSnap] = await Promise.all([
          getDoc(playerMatchDoc('last')),
          getDoc(playerMatchDoc('next')),
        ])

        const result = { ...defaultMatches }
        if (lastSnap.exists()) result.last = docToMatch(lastSnap.data())
        if (nextSnap.exists()) result.next = docToMatch(nextSnap.data())
        if (!cancelled) setMatches(result)
      } catch {
        // falls back to defaultMatches silently
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMatches()
    return () => { cancelled = true }
  }, [])

  return { matches, loading }
}
