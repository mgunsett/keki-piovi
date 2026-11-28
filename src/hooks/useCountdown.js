import { useEffect, useState } from 'react'

// Cuenta regresiva hasta `targetISO`.
// status:
//   'upcoming' → falta para el inicio (la cuenta sigue corriendo, también el día del partido)
//   'live'     → la cuenta llegó a cero y el partido se está jugando (hasta LIVE_WINDOW después del inicio)
//   'past'     → ya terminó
// elapsedMin: minutos desde el inicio (0 mientras falta)
export const LIVE_WINDOW = 3.5 * 3600e3 // 90' + entretiempo + alargue + penales, con margen

function compute(target) {
  const diff = target.getTime() - Date.now()
  const status = diff > 0 ? 'upcoming' : diff > -LIVE_WINDOW ? 'live' : 'past'
  const total = Math.max(diff, 0)
  return {
    status,
    elapsedMin: Math.max(-diff, 0) / 60e3,
    days: Math.floor(total / 86400e3),
    hours: Math.floor((total / 3600e3) % 24),
    minutes: Math.floor((total / 60e3) % 60),
    seconds: Math.floor((total / 1e3) % 60),
  }
}

// Etapa APROXIMADA del partido a partir de los minutos transcurridos.
// No conoce el descuento, el alargue ni los penales: por eso la UI la rotula "aprox.".
export function matchPhase(e) {
  if (e < 47) return { label: '1er tiempo', minute: e > 45 ? "45+'" : `${Math.floor(e) + 1}'` }
  if (e < 62) return { label: 'Entretiempo', minute: null }
  if (e < 109) {
    const m = Math.floor(e - 62) + 46
    return { label: '2do tiempo', minute: m > 90 ? "90+'" : `${m}'` }
  }
  return { label: 'Se define la final', minute: null, exact: true }
}

export default function useCountdown(targetISO, { tick = 1000 } = {}) {
  const [state, setState] = useState(() => compute(new Date(targetISO)))

  useEffect(() => {
    const target = new Date(targetISO)
    setState(compute(target))
    const id = setInterval(() => setState(compute(target)), tick)
    return () => clearInterval(id)
  }, [targetISO, tick])

  return state
}

export const pad2 = (n) => String(n).padStart(2, '0')
