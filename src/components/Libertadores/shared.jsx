import { Box, Text } from '@chakra-ui/react'
import useCountdown, { pad2 } from '../../hooks/useCountdown'
import { libertadores } from '../../data/libertadoresData'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Estrella de 5 puntas (títulos de Libertadores)
export function Star({ filled = true, size = 28, color = 'currentColor', dashed = false, ...rest }) {
  return (
    <Box as="svg" viewBox="0 0 24 24" w={`${size}px`} h={`${size}px`} aria-hidden="true" {...rest}>
      <path
        d="M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.9l-6.4 3.5L7 14.3 1.7 9.3l7.2-.9z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : 1.4}
        strokeDasharray={dashed ? '2.4 2' : undefined}
        strokeLinejoin="round"
      />
    </Box>
  )
}

// Hook + textos de estado de la cuenta regresiva
export function useFinalCountdown() {
  const c = useCountdown(libertadores.final.kickoff)
  const units = [
    { value: c.days, label: c.days === 1 ? 'día' : 'días' },
    { value: pad2(c.hours), label: 'horas' },
    { value: pad2(c.minutes), label: 'min' },
    { value: pad2(c.seconds), label: 'seg' },
  ]
  const statusText =
    c.status === 'today' ? 'Hoy se juega la final' : c.status === 'past' ? 'La final ya se jugó' : null
  return { ...c, units, statusText }
}

// Texto accesible del countdown (los dígitos que cambian cada segundo van aria-hidden)
export function CountdownSrText({ c }) {
  return (
    <Text as="span" srOnly>
      {c.statusText ?? `Faltan ${c.days} días y ${c.hours} horas para la final`}
    </Text>
  )
}
