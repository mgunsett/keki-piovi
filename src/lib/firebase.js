import { initializeApp } from 'firebase/app'
import { getFirestore, doc } from 'firebase/firestore'
import { firebaseConfig, isFirebaseConfigured, PLAYER_SLUG } from './firebaseConfig'

export { isFirebaseConfigured, PLAYER_SLUG }

// Solo app + Firestore: es lo que necesita la landing (se importa de forma dinámica).
// Auth y Storage se inicializan en el panel /admin.
export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
export const db = app ? getFirestore(app) : null

// Doc de partidos ('last' | 'next') namespaceado bajo el jugador actual
export function playerMatchDoc(slot) {
  return doc(db, 'players', PLAYER_SLUG, 'matches', slot)
}
