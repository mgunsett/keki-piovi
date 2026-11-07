// ─────────────────────────────────────────────────────────────
// Copa Libertadores 2026 — datos de la sección "Final"
// Fuentes: CONMEBOL, El Gráfico, Primicias, SBT, 442 Perfil (oct–nov 2026)
// ─────────────────────────────────────────────────────────────
import kekiFinal from '@assets/libertadores/keki-final.webp'
import formacion from '@assets/libertadores/formacion-maracana.webp'
import quite from '@assets/libertadores/quite-maracana.webp'
import grito from '@assets/libertadores/grito.webp'
import festejo from '@assets/libertadores/festejo-maracana.webp'
import remate from '@assets/libertadores/remate-maracana.webp'

export const libertadores = {
  edition: 2026,

  final: {
    // 17:00 de Argentina (= Brasilia, UTC-3)
    kickoff: '2026-11-28T17:00:00-03:00',
    dateLabel: 'Sábado 28 de noviembre',
    timeLabel: '17:00 h',
    stadium: 'Estadio Centenario',
    city: 'Montevideo',
    rival: 'Palmeiras',
    format: 'Partido único',
  },

  // Títulos de Estudiantes en la Libertadores: la final va por la quinta
  titles: [1968, 1969, 1970, 2009],

  // Dato histórico: la final de 1968 también fue ante Palmeiras
  history: 'La primera de las cuatro fue en 1968, ante el mismo rival.',

  // Camino a la final (orden cronológico)
  path: [
    {
      stage: 'Fase de grupos',
      rival: 'Grupo A',
      detail: 'Segundo detrás de Flamengo, con Medellín y Cusco',
      score: null,
    },
    {
      stage: 'Octavos',
      rival: 'Universidad Católica',
      detail: '1-1 en La Plata y 3-0 en Santiago',
      score: '4-1',
    },
    {
      stage: 'Cuartos',
      rival: 'Corinthians',
      detail: '1-1 en La Plata y 1-0 en São Paulo',
      score: '2-1',
    },
    {
      stage: 'Semifinal',
      rival: 'Flamengo',
      detail: 'Dos 0-0 y 3-2 en penales en el Maracaná',
      score: 'Pen. 3-2',
      highlight: true,
    },
  ],

  // La noche del Maracaná (22/10/2026)
  maracana: {
    title: 'La noche del Maracaná',
    summary:
      'Cuarenta minutos con diez y una definición por penales en el estadio del campeón vigente. Estudiantes ganó 3-2 y volvió a una final 17 años después.',
  },

  // ⚠️ Stats de Keki en la copa: valores provisorios tomados de Flashscore/Tribuna,
  // las fuentes no coinciden. Confirmar con el jugador antes de publicar.
  playerStats: [
    { value: '10', label: 'Partidos jugados', provisional: true },
    { value: '6.8', label: 'Puntaje promedio', provisional: true },
    { value: "180'", label: 'Sin goles en contra en semis' },
  ],

  images: {
    main: kekiFinal,
    gallery: [
      { src: festejo, alt: 'Keki Piovi festeja en andas en el Maracaná tras la clasificación a la final' },
      { src: grito, alt: 'Keki Piovi grita con el puño apretado en el Maracaná' },
      { src: quite, alt: 'Keki Piovi barre la pelota ante De Arrascaeta en la semifinal' },
      { src: remate, alt: 'Keki Piovi remata con el número 21 en la espalda ante Flamengo' },
      { src: formacion, alt: 'Formación de Estudiantes antes de la semifinal en el Maracaná' },
    ],
  },
}
