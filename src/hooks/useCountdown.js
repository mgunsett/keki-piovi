import { useEffect, useState } from 'react'

// Cuenta regresiva hasta `targetISO`.
// status: 'upcoming' (falta), 'today' (es el día del partido), 'past' (ya se jugó)
function compute(target) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  const sameDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate()

  // Ventana de "hoy": desde las 00:00 del día hasta 3 h después del inicio
  const status = diff > 0 && !sameDay ? 'upcoming' : diff > -3 * 3600e3 ? 'today' : 'past'

  const total = Math.max(diff, 0)
  return {
    status,
    days: Math.floor(total / 86400e3),
    hours: Math.floor((total / 3600e3) % 24),
    minutes: Math.floor((total / 60e3) % 60),
    seconds: Math.floor((total / 1e3) % 60),
  }
}

export default function useCountdown(targetISO, { tick = 1000 } = {}) {
  const [state, setState] = useState(() => compute(new Date(targetISO)))

  useEffect(() => {
    const target = new Date(targetISO)
    const id = setInterval(() => setState(compute(target)), tick)
    return () => clearInterval(id)
  }, [targetISO, tick])

  return state
}

export const pad2 = (n) => String(n).padStart(2, '0')
