export function docToMatch(data) {
  return {
    home:      { name: data.home_team, shield: data.home_shield || null },
    away:      { name: data.away_team, shield: data.away_shield || null },
    homeScore: data.home_score ?? null,
    awayScore: data.away_score ?? null,
    date:      data.match_date,
    stadium:   data.stadium || '',
    competition: data.competition || '',
  }
}

import escudoEstudiantes from '@assets/escudos/escudo_estudiantes.webp'

// Placeholder neutro: solo se ve si Firebase no está configurado o falla la carga.
// Los partidos reales se cargan desde /admin.
const placeholder = {
  home:      { name: 'Estudiantes', shield: escudoEstudiantes },
  away:      { name: '—', shield: null },
  homeScore: null,
  awayScore: null,
  date:      'A confirmar',
  stadium:   '',
  competition: 'Liga Profesional',
}

export const defaultMatches = {
  last: placeholder,
  next: placeholder,
}
