// Config pura (sin importar el SDK de Firebase) para poder decidir
// si cargar Firebase sin sumarlo al bundle inicial de la landing.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Identifica a este jugador dentro del proyecto Firebase compartido
// (varias landings usan el mismo proyecto, namespaceado por slug en Firestore/Storage)
export const PLAYER_SLUG = import.meta.env.VITE_PLAYER_SLUG || ''

const requiredKeys = ['apiKey', 'projectId']
export const isFirebaseConfigured =
  requiredKeys.every((k) => Boolean(firebaseConfig[k])) && Boolean(PLAYER_SLUG)
