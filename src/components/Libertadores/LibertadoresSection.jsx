import { useEffect, useRef } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { libertadores as L } from '../../data/libertadoresData'
import { Star, useFinalCountdown, CountdownSrText, prefersReducedMotion } from './shared'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#D9BE7E'
const GOLD_DEEP = '#B89B5E'
const GALLERY_POSITIONS = ['center 30%', 'center 30%', 'center 80%', 'center 90%', 'center 80%']

export default function LibertadoresSection() {
  const sectionRef = useRef(null)
  const starsRef = useRef(null)
  const c = useFinalCountdown()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const stars = gsap.utils.toArray('[data-star="won"]', starsRef.current)
      const pending = starsRef.current.querySelector('[data-star="pending"]')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: starsRef.current, start: 'top 85%', once: true },
      })
      tl.from(stars, { opacity: 0.15, scale: 0.9, duration: 0.5, ease: 'power3.out', stagger: 0.06 })
        .from(pending, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '+=0.1')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      id="libertadores"
      ref={sectionRef}
      aria-labelledby="libertadores-title"
      position="relative"
      bg="brand.dark"
      overflow="hidden"
      borderTopLeftRadius={{ base: '14px', lg: '22px' }}
      borderTopRightRadius={{ base: '14px', lg: '22px' }}
      boxShadow="0 -24px 80px rgba(0,0,0,0.65)"
      pt={{ base: 16, lg: 24 }}
      pb={{ base: 16, lg: 24 }}
      px={{ base: 5, lg: 10 }}
    >
      {/* Brillo dorado detrás del 5 */}
      {/* Limitado a la parte alta: así el pie de la sección empalma limpio con Estadísticas */}
      <Box
        position="absolute" top={0} left={0} right={0} h={{ base: '40%', lg: '55%' }} pointerEvents="none"
        background={{
          base: 'radial-gradient(90% 70% at 50% 40%, rgba(184,155,94,0.20), transparent 70%)',
          lg: 'radial-gradient(45% 62% at 72% 50%, rgba(184,155,94,0.20), transparent 70%)',
        }}
      />

      <Box maxW="1400px" mx="auto" position="relative">
        {/* ── Bloque principal ── */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1.05fr' }} gap={{ base: 0, lg: 8 }} alignItems="center">
          {/* Visual: 5 gigante + Keki */}
          <Box
            order={{ base: 0, lg: 1 }}
            position="relative"
            h={{ base: '118vw', sm: '560px', lg: '720px' }}
            maxH={{ base: '560px', lg: 'none' }}
          >
            {/* El 5 en SVG: escala predecible con el contenedor (viewBox) */}
            <Box
              as="svg"
              aria-hidden="true"
              viewBox="0 0 100 130"
              position="absolute"
              top="2%" bottom="0"
              left={{ base: '30%', lg: '32%' }}
              transform="translateX(-50%)"
              h="96%"
              w="auto"
              overflow="visible"
            >
              <text
                x="50" y="124"
                textAnchor="middle"
                fontFamily="'Bebas Neue', sans-serif"
                fontSize="172"
                fill="rgba(184,155,94,0.10)"
                stroke={GOLD_DEEP}
                strokeWidth="0.7"
              >
                5
              </text>
            </Box>
            <Image
              src={L.images.main}
              alt="Keki Piovi con la camiseta de Estudiantes, mirando el parche de la Libertadores en la manga"
              position="absolute"
              bottom={0}
              left={{ base: '60%', lg: '62%' }}
              transform="translateX(-50%)"
              h="100%"
              w="auto"
              maxW="none"
              objectFit="contain"
              draggable={false}
              sx={{
                // El recorte original termina en seco arriba y a la izquierda: se funde en elipse
                maskImage: 'radial-gradient(ellipse 64% 54% at 58% 52%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 64% 54% at 58% 52%, black 60%, transparent 100%)',
              }}
            />
          </Box>

          {/* Texto + countdown */}
          <Box order={{ base: 1, lg: 0 }} mt={{ base: -4, lg: 0 }} position="relative">
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
              Copa Libertadores {L.edition}
            </Text>
            <Text
              as="h2"
              id="libertadores-title"
              fontFamily="heading"
              fontSize={{ base: '6xl', md: '7xl', lg: '8xl' }}
              lineHeight={0.88}
              color={GOLD}
              mt={1}
            >
              Rumbo a la ilusión
            </Text>

            <Flex align="center" gap={{ base: 4, lg: 5 }} mt={{ base: 5, lg: 7 }}>
              <Image src={L.final.shields.home} alt="Estudiantes"
                     h={{ base: '56px', lg: '72px' }} w="auto" objectFit="contain" draggable={false} />
              <Text fontFamily="mono" fontSize="lg" color="brand.gray">vs</Text>
              <Image src={L.final.shields.rival} alt={L.final.rival}
                     h={{ base: '56px', lg: '72px' }} w="auto" objectFit="contain" draggable={false} />
            </Flex>

            <Grid as="dl" templateColumns="repeat(3, auto)" justifyContent="start" columnGap={{ base: 6, lg: 10 }} rowGap={1} mt={4}>
              {[
                ['Fecha', L.final.dateLabel],
                ['Hora', L.final.timeLabel],
                ['Estadio', `${L.final.stadium}, ${L.final.city}`],
              ].map(([k, v]) => (
                <Box key={k}>
                  <Text as="dt" fontFamily="mono" fontSize="xs" color="brand.gray">{k}</Text>
                  <Text as="dd" fontFamily="mono" fontSize={{ base: 'sm', lg: 'md' }} color="brand.bone" fontWeight={500}>{v}</Text>
                </Box>
              ))}
            </Grid>

            {/* Countdown */}
            <Box mt={{ base: 8, lg: 10 }}>
              <time dateTime={L.final.kickoff}>
                <CountdownSrText c={c} />
                {c.statusText ? (
                  <Text fontFamily="heading" fontSize="5xl" color={GOLD} lineHeight={1}>{c.statusText}</Text>
                ) : (
                  <Flex aria-hidden="true" align="stretch">
                    {c.units.map((u, i) => (
                      <Box key={u.label} pr={{ base: 4, lg: 7 }} pl={i ? { base: 4, lg: 7 } : 0}
                           borderLeft={i ? '1px solid' : 'none'} borderColor="whiteAlpha.200">
                        <Text fontFamily="heading" fontSize={{ base: '5xl', lg: '7xl' }} lineHeight={0.9}
                              color="brand.bone" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                          {u.value}
                        </Text>
                        <Text fontFamily="mono" fontSize="xs" color="brand.gray" mt={1}>{u.label}</Text>
                      </Box>
                    ))}
                  </Flex>
                )}
              </time>
            </Box>

            {/* Estrellas */}
            <Box mt={{ base: 10, lg: 12 }}>
              <Flex ref={starsRef} as="ol" listStyleType="none" gap={{ base: 3, lg: 5 }} align="flex-end" aria-label="Libertadores ganadas por Estudiantes">
                {L.titles.map((y) => (
                  <Flex as="li" key={y} data-star="won" direction="column" align="center" gap={1}>
                    <Star size={30} color={GOLD} />
                    <Text fontFamily="mono" fontSize="sm" color={GOLD}>{y}</Text>
                  </Flex>
                ))}
                <Flex as="li" data-star="pending" direction="column" align="center" gap={1}
                      aria-label="La quinta: se define el 28 de noviembre">
                  <Star size={30} color={GOLD} filled={false} dashed />
                  <Text fontFamily="mono" fontSize="sm" color="brand.gray">28/11</Text>
                </Flex>
              </Flex>
              
            </Box>
          </Box>
        </Grid>

        {/* ── Camino + Keki en la copa ── */}
        <Grid templateColumns={{ base: '1fr', lg: '1.6fr 1fr' }} rowGap={10} columnGap={0} mt={{ base: 16, lg: 20 }}
              pt={{ base: 10, lg: 12 }} borderTop="1px solid" borderColor="whiteAlpha.100">
          <Box pr={{ lg: 16 }}>
            <Text as="h3" fontFamily="heading" fontSize="3xl" color="brand.bone" lineHeight={1}>Camino a la final</Text>
            <Grid as="ol" listStyleType="none" templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={{ base: 0, md: 4 }} mt={6}>
              {L.path.map((p) => (
                <Box as="li" key={p.stage} py={{ base: 3, md: 0 }} borderTop={{ base: '1px solid', md: 'none' }}
                     borderColor="whiteAlpha.100">
                  <Box h="2px" bg={p.highlight ? GOLD : 'whiteAlpha.300'} mb={3} display={{ base: 'none', md: 'block' }} />
                  <Text fontFamily="mono" fontSize="xs" color="brand.gray">{p.stage}</Text>
                  <Flex justify="space-between" align="baseline" gap={3}>
                    <Text fontFamily="heading" fontSize="xl" color="brand.bone" lineHeight={1.1}>{p.rival}</Text>
                    {p.score && (
                      <Text fontFamily="heading" fontSize="xl" color={p.highlight ? GOLD : 'brand.amber'} flexShrink={0}
                            display={{ base: 'block', md: 'none' }}>{p.score}</Text>
                    )}
                  </Flex>
                  {p.score && (
                    <Text fontFamily="heading" fontSize="4xl" lineHeight={1} color={p.highlight ? GOLD : 'brand.amber'}
                          display={{ base: 'none', md: 'block' }} mt={1}>{p.score}</Text>
                  )}
                  {p.detail && (
                    <Text fontFamily="mono" fontSize="xs" color="brand.gray" mt={1}>{p.detail}</Text>
                  )}
                  {p.keki && (
                    <Text fontFamily="mono" fontSize="sm" color={GOLD} mt={2} lineHeight={1.3}>
                      {p.keki}
                    </Text>
                  )}
                </Box>
              ))}
            </Grid>
          </Box>

          <Box
            pt={{ base: 10, lg: 0 }} pl={{ lg: 16 }}
            borderTop={{ base: '1px solid', lg: 'none' }} borderLeft={{ base: 'none', lg: '1px solid' }}
            borderColor="whiteAlpha.200"
          >
            <Text as="h3" fontFamily="heading" fontSize="3xl" color="brand.bone" lineHeight={1}>Partidos en Copa</Text>
            <Grid as="ul" listStyleType="none" templateColumns="repeat(3, 1fr)" gap={4} mt={6}>
              {L.playerStats.map((s) => (
                <Box as="li" key={s.label}>
                  <Text fontFamily="heading" fontSize="5xl" color={GOLD} lineHeight={1}>
                    {s.value}
                  </Text>
                  <Text fontFamily="mono" fontSize="xs" color="brand.gray" mt={1}>{s.label}</Text>
                </Box>
              ))}
            </Grid>
            <Text fontFamily="body" fontSize="sm" color="brand.gray" mt={5} maxW="42ch">
              {L.playerNote}
            </Text>
          </Box>
        </Grid>

        {/* ── La noche del Maracaná ── */}
        <Box mt={{ base: 16, lg: 20 }}>
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ md: 'flex-end' }} gap={3} mb={6}>
            <Text as="h3" fontFamily="heading" fontSize="3xl" color="brand.bone" lineHeight={1}>{L.maracana.title}</Text>
            {/* <Text fontFamily="body" fontSize="sm" color="brand.gray" maxW="52ch">{L.maracana.summary}</Text> */}
          </Flex>
          <Grid
            templateColumns={{ base: 'repeat(5, 72vw)', md: '2fr 1fr 1fr', lg: '2fr 1fr 1fr 1fr' }}
            templateRows={{ md: 'repeat(2, 220px)', lg: 'repeat(2, 260px)' }}
            gap={3}
            tabIndex={0} role="region" aria-label="Fotos de la noche del Maracaná"
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.amber', outlineOffset: '4px' }}
            overflowX={{ base: 'auto', md: 'visible' }}
            sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '::-webkit-scrollbar': { display: 'none' } }}
          >
            {L.images.gallery.map((g, i) => (
              <Box
                key={g.src}
                gridRow={{ md: i === 0 ? 'span 2' : 'auto' }}
                gridColumn={{ lg: i === 4 ? 'span 3' : 'auto' }}
                h={{ base: '92vw', md: 'auto' }}
                maxH={{ base: '440px', md: 'none' }}
                overflow="hidden"
                borderRadius="6px"
                sx={{ scrollSnapAlign: 'start' }}
              >
                <Image src={g.src} alt={g.alt} loading="lazy" w="100%" h="100%" objectFit="cover"
                       objectPosition={GALLERY_POSITIONS[i] ?? 'center 30%'} />
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
