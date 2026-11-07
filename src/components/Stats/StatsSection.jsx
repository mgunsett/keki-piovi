import { useRef, useState } from 'react'
import { Box, Flex, Grid, Text, Image, Collapse } from '@chakra-ui/react'
import { useInView, useReducedMotion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import useScrubReveal from '../../hooks/useScrubReveal'
import { playerData as P } from '../../data/playerData'

const GOLD = '#D9BE7E'
const GOLD_DEEP = '#B89B5E'
const LINE = 'rgba(243,238,227,0.10)'
const LINE_2 = 'rgba(243,238,227,0.18)'

const awardsOf = (club) => (Array.isArray(club.info) ? club.info : [club.info]).filter(Boolean)
const totals = {
  clubs: P.clubs.length,
  titles: P.clubs.reduce((n, c) => n + c.titles.length, 0),
  awards: P.clubs.reduce((n, c) => n + awardsOf(c).length, 0),
}

const Label = (props) => <Text fontFamily="mono" fontSize="xs" fontWeight={500} color="brand.gray" {...props} />
const CardTitle = (props) => <Text as="h3" fontFamily="heading" fontSize="3xl" lineHeight={1} color="brand.bone" {...props} />

// ── Ficha ────────────────────────────────────────────────────
function ProfileCard() {
  const rows = [
    ['Pie hábil', P.foot],
    ['Edad', `${P.age} años`],
    ['Altura y peso', `${P.height} y ${P.weight}`],
    ['Origen', P.birthPlace.split(',').slice(0, 2).join(',')],
  ]
  return (
    <Box>
      <Flex align="flex-end" gap={5} pb={6} borderBottom="1px solid" borderColor={LINE}>
        <Text aria-hidden="true" fontFamily="heading" fontSize={{ base: '110px', lg: '132px' }} lineHeight={0.78}
              color="transparent" sx={{ WebkitTextStroke: `1.5px ${GOLD_DEEP}` }}>
          {P.number}
        </Text>
        <Box>
          <Text fontFamily="heading" fontSize="34px" lineHeight={0.92} color="brand.bone">
            {P.name.charAt(0) + P.name.slice(1).toLowerCase()}<br />{P.fullName.charAt(0) + P.fullName.slice(1).toLowerCase()}
          </Text>
          <Text fontFamily="mono" fontSize="sm" fontWeight={500} color={GOLD} mt={1.5}>{P.positionDetail}</Text>
        </Box>
      </Flex>
      <Box as="dl" mt={2}>
        {rows.map(([k, v]) => (
          <Flex key={k} justify="space-between" gap={4} py={3} borderBottom="1px solid" borderColor={LINE}>
            <Label as="dt">{k}</Label>
            <Text as="dd" fontFamily="mono" fontSize="md" fontWeight={600} color="brand.bone" textAlign="right">{v}</Text>
          </Flex>
        ))}
        <Flex justify="space-between" gap={4} py={3}>
          <Label as="dt">Club actual</Label>
          <Flex as="dd" align="center" gap={2}>
            <Image src={P.logoCurrentClub} alt="" w="18px" h="22px" objectFit="contain" />
            <Text fontFamily="mono" fontSize="md" fontWeight={600} color="brand.bone">{P.currentClub}</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

// ── Cancha ───────────────────────────────────────────────────
function PitchCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const show = inView || reduce

  return (
    <Flex direction="column" h="100%">
      <Flex justify="space-between" align="baseline" gap={3}>
        <CardTitle>Zona de influencia</CardTitle>
      </Flex>
      {/* En md+ la cancha se dimensiona por alto (atado al viewport) y el ancho sale de la proporción */}
      <Box ref={ref} mx="auto" mt={5}
           w={{ base: '100%', md: 'auto' }}
           h={{ base: 'auto', md: 'clamp(300px, calc(100svh - 300px), 440px)' }}
           maxW={{ base: '260px', md: '100%' }}
           sx={{ aspectRatio: '68 / 105' }}>
        <Box as="svg" viewBox="0 0 68 105" w="100%" h="100%" display="block" role="img"
             aria-label="Cancha con la zona de influencia de Keki: el círculo central y el carril interior derecho, de área a área.">
          <defs>
            <radialGradient id="pitch-heat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF2D38" stopOpacity=".85" />
              <stop offset="55%" stopColor="#EF2D38" stopOpacity=".35" />
              <stop offset="100%" stopColor="#EF2D38" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pitch-heat-2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity=".55" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x=".5" y=".5" width="67" height="104" rx="2" fill="#1b1717" stroke="rgba(243,238,227,.22)" />
          <g fill="none" stroke="rgba(243,238,227,.22)" strokeWidth=".4">
            <line x1=".5" y1="52.5" x2="67.5" y2="52.5" />
            <circle cx="34" cy="52.5" r="9.15" />
            <rect x="13.84" y=".5" width="40.32" height="16.5" />
            <rect x="24.84" y=".5" width="18.32" height="5.5" />
            <rect x="13.84" y="88" width="40.32" height="16.5" />
            <rect x="24.84" y="99" width="18.32" height="5.5" />
            <path d="M26.7 17a9.15 9.15 0 0 0 14.6 0" />
            <path d="M26.7 88a9.15 9.15 0 0 1 14.6 0" />
          </g>
          {/* Único momento animado de la sección: la zona aparece al entrar en pantalla */}
          <g style={{ opacity: show ? 1 : 0, transition: reduce ? 'none' : 'opacity 1.1s cubic-bezier(0.23, 1, 0.32, 1) .15s' }}>
            <ellipse cx="35" cy="55" rx="21" ry="22" fill="url(#pitch-heat)" />
            <ellipse cx="44" cy="40" rx="11" ry="12" fill="url(#pitch-heat-2)" />
            <ellipse cx="33" cy="74" rx="15" ry="10" fill="url(#pitch-heat-2)" />
          </g>
          <circle cx="36" cy="57" r="3.2" fill="#EF2D38" stroke="#151212" strokeWidth=".8" />
          <text x="36" y="58.3" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="3.6" fill="#F3EEE3">
            {P.number}
          </text>
        </Box>
      </Box>
      <Flex gap={5} justify="center" mt={4} flexWrap="wrap">
        {[['#EF2D38', 'Zona principal'], [GOLD, 'Apariciones']].map(([c, l]) => (
          <Flex key={l} align="center" gap={2}>
            <Box w="18px" h="8px" borderRadius="4px" bg={c} />
            <Label>{l}</Label>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

// ── Última temporada ─────────────────────────────────────────
function SeasonCard() {
  return (
    <Box>
      <CardTitle>Última temporada</CardTitle>
      <Grid as="ul" listStyleType="none" templateColumns="1fr 1fr" mt={4}>
        {P.seasonStats.map((s, i) => (
          <Box
            as="li"
            key={s.label}
            py={4}
            pr={i % 2 === 0 ? 4 : 0}
            pl={i % 2 === 1 ? 5 : 0}
            borderRight={i % 2 === 0 ? `1px solid ${LINE}` : 'none'}
            borderBottom={i < P.seasonStats.length - 2 ? `1px solid ${LINE}` : 'none'}
          >
            <Text fontFamily="heading" fontSize={{ base: '48px', lg: '54px' }} lineHeight={0.9}
                  color={s.highlight ? 'brand.amber' : 'brand.bone'} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {s.value}
            </Text>
            <Label mt={1}>{s.label}</Label>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

// ── Atributos ────────────────────────────────────────────────
function Segments({ value, label }) {
  return (
    <Grid templateColumns="repeat(10, 1fr)" gap="3px" role="img" aria-label={`${label}: ${value} de 100`}>
      {Array.from({ length: 10 }, (_, i) => {
        const n = value / 10 - i
        return (
          <Box key={i} h="8px" borderRadius="2px"
               bg={n >= 1 ? GOLD : n >= 0.5 ? `linear-gradient(90deg, ${GOLD} 50%, ${LINE_2} 50%)` : LINE_2} />
        )
      })}
    </Grid>
  )
}

function Attributes() {
  return (
    <Grid templateColumns={{ base: '1fr', lg: '220px 1fr' }} gap={{ base: 5, lg: 9 }} alignItems="center">
      <Box>
        <CardTitle>Atributos</CardTitle>
      </Box>
      <Grid as="ul" listStyleType="none" templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            columnGap={10} rowGap={{ base: 4, lg: 5 }}>
        {P.stats.map((s) => (
          <Box as="li" key={s.label}>
            <Flex justify="space-between" mb={2}>
              <Label>{s.label}</Label>
              <Text fontFamily="mono" fontSize="md" fontWeight={600} color="brand.bone">{s.value}</Text>
            </Flex>
            <Segments value={s.value} label={s.label} />
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

// ── Trayectoria: clubes colapsables ──────────────────────────
function ClubRow({ club, index, isCurrent }) {
  const [open, setOpen] = useState(false)
  const awards = awardsOf(club)
  const hasDetail = club.titles.length > 0 || awards.length > 0
  const panelId = `club-panel-${index}`
  const country = club.loan ? `${club.country}, a préstamo` : club.country

  const summary = [
    club.titles.length && `${club.titles.length} ${club.titles.length === 1 ? 'título' : 'títulos'}`,
    awards.length && `${awards.length} ${awards.length === 1 ? 'distinción' : 'distinciones'}`,
  ].filter(Boolean).join(' y ')

  const header = (
    <Grid
      templateColumns={{ base: '1fr auto', md: '150px 1fr auto auto' }}
      templateAreas={{ base: '"years chev" "club chev" "sum sum"', md: '"years club sum chev"' }}
      alignItems="center"
      columnGap={{ base: 3, md: 6 }}
      rowGap={2}
      py={{ base: 4, md: 5 }}
      w="100%"
      textAlign="left"
    >
      <Text gridArea="years" fontFamily="mono" fontSize="md" fontWeight={600} color={isCurrent ? 'brand.amber' : GOLD} whiteSpace="nowrap">
        {club.years}
      </Text>
      <Flex gridArea="club" align="center" gap={3.5} minW={0}>
        <Image src={club.logo} alt="" boxSize="34px" objectFit="contain" loading="lazy" flexShrink={0} />
        <Box minW={0}>
          <Text fontFamily="heading" fontSize="2xl" lineHeight={1} color="brand.bone">{club.name}</Text>
          <Label mt={0.5}>{country}</Label>
        </Box>
      </Flex>
      <Text gridArea="sum" fontFamily="mono" fontSize="sm" color={hasDetail ? 'brand.bone' : 'rgba(163,155,146,.55)'}
            pl={{ base: '48px', md: 0 }}>
        {hasDetail ? summary : 'Sin títulos ni distinciones'}
      </Text>
      <Box gridArea="chev" data-chev w="34px" h="34px" display="flex" alignItems="center" justifyContent="center"
           borderRadius="full" border="1px solid" borderColor={hasDetail ? LINE_2 : 'transparent'}
           color={hasDetail ? 'brand.bone' : 'transparent'} aria-hidden="true">
        {hasDetail && (
          <Box as={FiChevronDown} boxSize="18px" transform={open ? 'rotate(180deg)' : 'none'}
               transition="transform .2s cubic-bezier(0.23, 1, 0.32, 1)" />
        )}
      </Box>
    </Grid>
  )

  return (
    <Box as="li" borderBottom="1px solid" borderColor={LINE}>
      {hasDetail ? (
        <Box
          as="button"
          type="button"
          w="100%"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          cursor="pointer"
          borderRadius="4px"
          _focusVisible={{ outline: '2px solid', outlineColor: GOLD, outlineOffset: '2px' }}
          sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover [data-chev]': { borderColor: GOLD } } }}
        >
          {header}
        </Box>
      ) : header}

      {hasDetail && (
        <Collapse in={open} animateOpacity>
          <Grid id={panelId} templateColumns={{ base: '1fr', md: '150px 1fr 1fr' }} columnGap={6} rowGap={5}
                pb={6} pl={{ base: '48px', md: 0 }}>
            <Box display={{ base: 'none', md: 'block' }} />
            <Box>
              <Label>Títulos</Label>
              {club.titles.length ? (
                <Box as="ul" listStyleType="none" mt={2}>
                  {club.titles.map((t) => (
                    <Flex as="li" key={t} align="center" gap={2.5} py={1} fontSize="sm" color="brand.bone">
                      <Box w="7px" h="7px" borderRadius="full" bg={GOLD} flexShrink={0} />{t}
                    </Flex>
                  ))}
                </Box>
              ) : <Text fontSize="sm" color="rgba(163,155,146,.6)" mt={2}>Sin títulos en esta etapa</Text>}
            </Box>
            <Box>
              <Label>Distinciones</Label>
              {awards.length ? (
                <Box as="ul" listStyleType="none" mt={2}>
                  {awards.map((a) => (
                    <Text as="li" key={a} py={1} fontSize="sm" color="brand.gray">{a}</Text>
                  ))}
                </Box>
              ) : <Text fontSize="sm" color="rgba(163,155,146,.6)" mt={2}>Sin distinciones en esta etapa</Text>}
            </Box>
          </Grid>
        </Collapse>
      )}
    </Box>
  )
}

function Career() {
  return (
    <Box mt={{ base: 14, lg: 16 }}>
      <Flex justify="space-between" align="flex-end" gap={4} flexWrap="wrap">
        <Box>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
            Trayectoria
          </Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '5xl', lg: '6xl' }} lineHeight={1} color="brand.bone">
            Clubes
          </Text>
        </Box>
        <Flex as="ul" listStyleType="none" gap={7}>
          {[[totals.clubs, 'Clubes'], [totals.titles, 'Títulos'], [totals.awards, 'Distinciones']].map(([v, l]) => (
            <Box as="li" key={l}>
              <Text fontFamily="heading" fontSize="40px" lineHeight={1} color={GOLD}>{v}</Text>
              <Label>{l}</Label>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Box as="ul" listStyleType="none" mt={5} borderTop="1px solid" borderColor={LINE_2}>
        {P.clubs.map((club, i) => (
          <ClubRow key={club.name} club={club} index={i} isCurrent={i === 0} />
        ))}
      </Box>
    </Box>
  )
}

// ── Sección ──────────────────────────────────────────────────
export default function StatsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: titleRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  return (
    <Box as="section" id="estadisticas" ref={sectionRef} aria-labelledby="stats-title" bg="brand.dark"
         pt={{ base: 16, lg: 20 }} pb={{ base: 16, lg: 20 }} px={{ base: 5, lg: 10 }}>
      <Box maxW="1400px" mx="auto">
        <Flex ref={titleRef} justify="space-between" align="flex-end" gap={6} flexWrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
              Temporadas
            </Text>
            <Text as="h2" id="stats-title" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.88}
                  color="brand.amber" mt={1}>
              Estadísticas
            </Text>
          </Box>
         
        </Flex>

        {/* Hoja: las líneas internas salen del gap de 1px sobre el fondo de la grilla */}
        <Grid
          mt={{ base: 10, lg: 12 }}
          templateColumns={{ base: '1fr', md: '1fr 1fr', xl: '1fr 1.1fr 1fr' }}
          templateAreas={{
            base: '"ficha" "pitch" "season" "attrs"',
            md: '"ficha pitch" "season pitch" "attrs attrs"',
            xl: '"ficha pitch season" "attrs attrs attrs"',
          }}
          gap="1px"
          bg={LINE}
          border="1px solid"
          borderColor={LINE_2}
          borderRadius={{ base: '14px', lg: '18px' }}
          overflow="hidden"
        >
          {[
            ['ficha', <ProfileCard key="f" />],
            ['pitch', <PitchCard key="p" />],
            ['season', <SeasonCard key="s" />],
            ['attrs', <Attributes key="a" />],
          ].map(([area, node]) => (
            <Box key={area} gridArea={area} bg="brand.dark" p={{ base: 6, lg: 9 }}>{node}</Box>
          ))}
        </Grid>

        <Career />
      </Box>
    </Box>
  )
}
