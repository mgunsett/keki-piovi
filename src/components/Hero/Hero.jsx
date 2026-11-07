import { useRef, useEffect } from 'react'
import { Box, Text, Flex, Image, useToken } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import heroBg from '@assets/piovi-hero-bg.webp'
import heroBg2 from '@assets/piovi-hero-bg2.webp'
import { u, LANDSCAPE, heroUnitVars } from '../../utils/heroUnits'

gsap.registerPlugin(ScrollTrigger)

// Textos, íconos y espaciados del Hero usan u(): no cambian de tamaño con el
// zoom del navegador (ver utils/heroUnits). El nombre ya escala en vw.

function PlayerPanel() {
  const [amber] = useToken('colors', ['brand.amber'])
  return (
    <Flex
    direction={{base:'column', md:'row'}}
    justifyContent={'flex-start'}
    alignItems={'flex-start'}
    gap={{ base: u(8), md: u(16) }}
    sx={{ [LANDSCAPE]: { flexDirection: 'row', gap: u(16) } }}
    >
      <Text
        className="player-number"
        fontFamily="heading"
        fontSize={{ base: u(80), md: u(100) }}
        ml={{ base: u(0), md: 0 }}
        sx={{ [LANDSCAPE]: { fontSize: u(80), ml: 0 }, WebkitTextStroke: `2px ${amber}` }}
        lineHeight={0.9}
        color="transparent"
      >
        {playerData.number}
      </Text>
      <Box w={{ base: u(60), md: '1px' }} h={{ base: '1px', md: u(70), lg: u(80) }} bg="brand.amber"
        sx={{ [LANDSCAPE]: { width: '1px', height: u(64) } }} />
      <Flex direction={'column'} justifyContent={'flex-start'} gap={u(4)}>
        <Flex gap={u(4)} justifyContent='flex-start' alignItems='center'>
          <Text fontFamily="mono" fontSize={{ base: u(9), md: u(10) }} color="brand.bone"
            textTransform="uppercase" letterSpacing="widest">
            Posición
          </Text>
          <Text fontFamily="mono" fontSize={{ base: u(9), md: u(12) }} color="brand.amber"
            fontWeight="700" textTransform="uppercase" letterSpacing="widest">
            {playerData.position}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems='center' gap={{ base: u(10), md: u(12) }}>
          <Image src={playerData.nationalityFlag} alt={`Bandera de ${playerData.nationality}`} w={{ base: u(15), md: u(20) }} />
          <Text mb={u(-5)} fontFamily="mono" fontSize={{ base: u(12), md: u(16) }} color="brand.amber" letterSpacing="wider">
            {playerData.nationality}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems={'flex-end'} gap={{ base: u(8), md: u(10) }} mt={u(3)} ml={u(-4)}>
          <Image src={playerData.logoCurrentClub} alt={`Escudo de ${playerData.currentClub}`} ml={{ base: u(2), md: 0 }} w={{ base: u(16), md: u(24) }} h={{ base: u(20), md: u(30) }} objectFit="contain" />
          <Text fontFamily="mono" fontSize={{ base: u(12), md: u(16) }} color="brand.amber" letterSpacing="wider">
            {playerData.currentClub}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const photoRef     = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const vignetteRef  = useRef(null)
  const { matches }  = useMatches()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([line1Ref.current, line2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(vignetteRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '+=80vh',
            scrub: 1.2,
          },
        }
      )
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id= 'hero'>
      <Box
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.dark"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
          '@supports (height: 100dvh)': { height: '100dvh' },
          ...heroUnitVars,
        }}
      >
        {/* Foto de fondo — fundida con el fondo */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          alignItems={{ base: 'flex-end', md: 'flex-start' }}
          mt={{ base: 12, md: 12 }}
          ml={{ base: '0%', md: '4%' }}
          sx={{
            maskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
          }}
        >
          <Image
            src={heroBg}
            alt=""
            aria-hidden="true"
            draggable={false}
            // Controlá el tamaño acá 👇
            w={{ base: '100vw', md: '28vw' }}
            h={{ base: '100vh', md: 'auto' }}
            objectFit={{ base: 'cover', md: 'contain' }}
            objectPosition={{ base: 'center', md: 'center top' }}
            opacity={{ base: 0.21, lg: 0.20 }}
            sx={{ mixBlendMode: 'luminosity', [LANDSCAPE]: { width: 'auto', height: '100vh', objectFit: 'contain' } }}
            filter="grayscale(100%) contrast(1.05)"
          />
        </Box>
        
        {/* Segunda foto de fondo — sector derecho, detrás y a la derecha del jugador.
            Mismo tratamiento que la anterior. Solo desktop: en mobile/tablet y en
            horizontal el jugador ocupa ese sector y la foto quedaría tapada. */}
        <Box
          position="absolute"
          zIndex={0}
          pointerEvents="none"
          display={{ base: 'none', lg: 'block' }}
          right={{ lg: '10%' }}
          bottom={0}
          h={{ lg: '82vh' }}
          sx={{
            maskImage: 'radial-gradient(70% 65% at 50% 45%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 65% at 50% 45%, black 30%, transparent 80%)',
          }}
        >
          <Image
            src={heroBg2}
            alt=""
            aria-hidden="true"
            draggable={false}
            h="100%"
            w="auto"
            maxW="none"
            opacity={0.2}
            filter="grayscale(100%) contrast(1.05)"
            sx={{ mixBlendMode: 'luminosity' }}
          />
        </Box>

        {/* Player photo
            Anclada abajo y dimensionada por alto (la foto es vertical, ~0.43 de proporción):
            - mobile/tablet: arranca a la altura de "EZEQUIEL" y termina sobre el strip de partidos
            - desktop: a la derecha del nombre, con el balón apoyado cerca del borde inferior */}
        <Box
          ref={photoRef}
          position="absolute"
          zIndex={{ base: 3, md: 5, lg: 9 }}
          top={{ base: '46vw', md: '36vw', lg: 'auto' }}
          bottom={{ base: u(138), md: u(168), lg: '5vh' }}
          right={{ base: '1%', md: '7%', lg: 'auto' }}
          left={{ base: 'auto', lg: '56%' }}
          h={{ lg: '84vh' }}
          w={{ base: 'auto', lg: 'min(30vw, 36vh)' }}
          maxW={{ base: '62vw', md: '46vw', lg: 'none' }}
          display="flex"
          justifyContent={{ base: 'flex-end', lg: 'center' }}
          alignItems="flex-end"
          pointerEvents="none"
          sx={{
            [LANDSCAPE]: {
              top: 'auto', bottom: '2vh', left: 'auto', right: '9%',
              height: '90vh', width: 'auto', maxWidth: 'none',
            },
          }}
          style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
        >
          <Image
            className="player-photo"
            src={playerData.image}
            alt={`${playerData.displayName}, ${playerData.position.toLowerCase()} profesional de ${playerData.currentClub}`}
            h="100%"
            w="auto"
            maxW="100%"
            objectFit="contain"
            objectPosition={{ base: 'bottom right', lg: 'bottom center' }}
            filter="drop-shadow(0 24px 40px rgba(0,0,0,0.55))"
            draggable={false}
          />
        </Box>

        {/* Visible name text */}
        <Box
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
          display="flex"
          flexDir="column"
          alignItems='flex-start'
          justifyContent={{ base: 'flex-start', lg: 'center' }}
          pl={{ base: 0, md: '5%', lg: '15%' }}
          pt={{ base: '22%', lg: '0%' }}
          mt={{ base: '10%', lg: '-4%' }}
          sx={{ [LANDSCAPE]: { justifyContent: 'center', pl: '6%', pt: 0, mt: '-14vh' } }}
        >
          <Flex 
          direction="column" 
          as="h1" 
          overflow="hidden"
          >
            <Text
              ref={line2Ref}
              as="span"
              display="block"
              fontFamily="heading"
              fontSize={{ base: '35vw', md: '16vw', lg: '13vw' }}
              sx={{ [LANDSCAPE]: { fontSize: 'min(26vh, 13vw)' } }}
              color="brand.amber"
              lineHeight={0.9}
              style={{ opacity: 0 }}
            >
              {playerData.fullName}
            </Text>
            <Text
              ref={line1Ref}
              as="span"
              display="block"
              fontFamily="heading"
              fontSize={{ base: '30vw', md: '16vw', lg: '13vw' }}
              sx={{ [LANDSCAPE]: { fontSize: 'min(26vh, 13vw)', mt: '-2vh' } }}
              color="brand.gray2"
              lineHeight={0.9}
              style={{ opacity: 0 }}
              mt={{ base: u(-10), md: u(-20), lg: u(-30) }}
            >
              {playerData.name}
            </Text>
            
          </Flex>
        </Box>


        {/* Player info — bottom left */}
        <Box
          className="player-info"
          position="absolute"
          bottom={{ base: '40%', md: '40%', lg: '18%' }}
          left={{ base: '5%', lg: '15%' }}
          zIndex={15}
          sx={{ [LANDSCAPE]: { bottom: '10%', left: '6%' } }}
        >
          <PlayerPanel />
        </Box>

        {/* MatchBox desktop */}
        <Box
          position="absolute"
          bottom="12%"
          right={0}
          top={{ base: 'auto', lg: '20%' }}
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
          sx={{ [LANDSCAPE]: { display: 'block', top: '16%', bottom: '8%' } }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* MatchBox mobile */}
        <Box
          position="absolute"
          bottom={{ base: u(30), md: u(40) }}
          left={0}
          right={0}
          zIndex={15}
          display={{ base: 'block', lg: 'none' }}
          sx={{ [LANDSCAPE]: { display: 'none' } }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="strip" />
        </Box>



        {/* Vignette */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)"
          pointerEvents="none"
          style={{ opacity: 0.15 }}
        />
      </Box>
    </Box>
  )
}
