// ─────────────────────────────────────────────────────────────
// Contacto — redes en tarjetas con ícono de fondo + representación
// con logo, para qué escribirle y botón. Todo sale de playerData.
// ─────────────────────────────────────────────────────────────
import { useRef } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import useScrubReveal from '../../hooks/useScrubReveal'
import { playerData } from '../../data/playerData'

const GOLD = '#D9BE7E'

// Íconos de fondo de las tarjetas de redes (por label)
const GhostInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const GhostStats = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="14" width="3.5" height="7" rx=".5" /><rect x="8.5" y="5" width="3.5" height="16" rx=".5" />
    <rect x="14" y="11" width="3.5" height="10" rx=".5" /><rect x="19.5" y="8" width="3.5" height="13" rx=".5" />
  </svg>
)
const GHOSTS = { Instagram: GhostInstagram, TransferMarkt: GhostStats }

// Base compartida por las tarjetas (link externo con borde rojo fino)
const cardProps = (label) => ({
  as: 'a',
  target: '_blank',
  rel: 'noopener noreferrer',
  'aria-label': `${label}. Se abre en otra pestaña`,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'rgba(239,45,56,.55)',
  borderRadius: '12px',
  bg: '#1b1717',
  transition: 'border-color .2s ease, background-color .2s ease, transform .16s cubic-bezier(0.23, 1, 0.32, 1)',
  _active: { transform: 'scale(0.99)' },
  _focusVisible: { outline: '2px solid', outlineColor: GOLD, outlineOffset: '3px' },
})

const hover = (rules) => ({ '@media (hover: hover) and (pointer: fine)': { '&:hover': { borderColor: 'brand.amber', bg: '#201a1a' }, ...rules } })

function SocialCard({ item }) {
  const Ghost = GHOSTS[item.label]
  const Icon = item.icon
  return (
    <Box
      {...cardProps(`${item.label} de Keki Piovi, ${item.handle}`)}
      href={item.url}
      minH={{ base: '160px', md: '190px' }}
      p={{ base: 5, md: 7 }}
      justifyContent="space-between"
      sx={{
        '& .ghost': { transition: 'color .3s ease, transform .5s cubic-bezier(0.23, 1, 0.32, 1)' },
        '& .arrow': { transition: 'background-color .2s ease, border-color .2s ease' },
        ...hover({
          '&:hover .ghost': { color: 'rgba(239,45,56,.22)', transform: 'rotate(-6deg) scale(1.04)' },
          '&:hover .arrow': { bg: 'brand.amber', borderColor: 'brand.amber' },
        }),
      }}
    >
      {Ghost && (
        <Box className="ghost" aria-hidden="true" position="absolute" right="-18px" bottom="-26px"
             boxSize={{ base: '150px', md: '190px' }} color="rgba(184,155,94,.12)" pointerEvents="none">
          <Ghost />
        </Box>
      )}
      <Flex className="arrow" aria-hidden="true" position="absolute" top={{ base: 4, md: 5 }} right={{ base: 4, md: 5 }}
            boxSize="42px" borderRadius="full" border="1px solid" borderColor="whiteAlpha.300" align="center" justify="center">
        <Box as={FiArrowUpRight} boxSize="18px" />
      </Flex>

      <Flex aria-hidden="true" boxSize="46px" borderRadius="12px" border="1px solid" borderColor="whiteAlpha.300" align="center" justify="center">
        {Icon ? <Box as={Icon} boxSize="22px" /> : <Image src={item.image} alt="" boxSize="24px" objectFit="contain" />}
      </Flex>
      <Box position="relative" mt={5}>
        <Text fontFamily="mono" fontSize="sm" fontWeight={600} color="brand.gray">{item.label === 'TransferMarkt' ? 'Transfermarkt' : item.label}</Text>
        <Text fontFamily="heading" fontSize={{ base: '30px', md: 'clamp(30px, 3vw, 40px)' }} lineHeight={1} color="brand.bone">
          {item.handle}
        </Text>
        {item.note && <Text fontFamily="mono" fontSize="sm" fontWeight={500} color="brand.gray" mt={1}>{item.note}</Text>}
      </Box>
    </Box>
  )
}

function RepCard({ item }) {
  return (
    <Box
      {...cardProps(`${item.cta || item.label} por Instagram, ${item.handle}`)}
      href={item.url}
      p={{ base: 5, md: 7 }}
      gap={{ base: 4, md: 5 }}
      sx={{
        '& .rep-cta': { transition: 'background-color .2s ease' },
        ...hover({ '&:hover .rep-cta': { bg: 'brand.amber' } }),
      }}
    >
      <Flex align="center" gap={{ base: 3.5, md: 5 }}>
        <Flex flexShrink={0} boxSize={{ base: '70px', md: '92px' }} borderRadius="16px" bg="rgba(243,238,227,.04)"
              border="1px solid" borderColor="whiteAlpha.100" align="center" justify="center">
          <Image src={item.image} alt="" boxSize={{ base: '58px', md: '76px' }} objectFit="contain" />
        </Flex>
        <Box minW={0}>
          <Text fontFamily="mono" fontSize="sm" fontWeight={600} color={GOLD}>{item.title}</Text>
          <Text fontFamily="heading" fontSize={{ base: '30px', md: 'clamp(32px, 3vw, 42px)' }} lineHeight={0.95} color="brand.bone" mt={0.5}>
            {item.label}
          </Text>
          <Text fontFamily="mono" fontSize="sm" fontWeight={500} color="brand.gray" mt={1}>{item.handle}</Text>
        </Box>
      </Flex>

      {item.forWhom && (
        <Text fontSize="15px" lineHeight={1.5} color="brand.gray" pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
          <Text as="span" color="brand.bone" fontWeight={500}>Escribile por:</Text> {item.forWhom}.
        </Text>
      )}

      <Flex className="rep-cta" mt="auto" align="center" justify={{ base: 'center', md: 'flex-start' }} alignSelf={{ base: 'stretch', md: 'flex-start' }}
            gap={2.5} px={4.5} py={3} borderRadius="full" bg="rgba(239,45,56,.14)"
            fontFamily="mono" fontSize="15px" fontWeight={700} color="brand.bone">
        <Box as={FaInstagram} boxSize="18px" aria-hidden="true" />
        {item.cta || `Escribir a ${item.label}`}
      </Flex>
    </Box>
  )
}

function Group({ title, children }) {
  return (
    <Box mt={{ base: 9, md: 11 }}>
      <Text as="h3" fontFamily="mono" fontSize="sm" fontWeight={600} color="brand.amber" mb={3.5}>{title}</Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3.5}>{children}</Grid>
    </Box>
  )
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  return (
    <Box as="section" id="contact" ref={sectionRef} aria-labelledby="contact-title" bg="brand.dark"
         pt={{ base: 16, lg: 24 }} pb={{ base: 20, lg: 28 }} px={{ base: 5, lg: 10 }}>
      <Box maxW="1400px" mx="auto">
        <Flex ref={headerRef} justify="space-between" align="flex-end" gap={5} flexWrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
              Redes y representación
            </Text>
            <Text as="h2" id="contact-title" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.88}
                  color="brand.amber" mt={1}>
              Contacto
            </Text>
          </Box>
          <Text color="brand.gray" maxW="40ch" lineHeight={1.5}>
            Seguilo en sus redes o escribí directamente a quien lleva cada tema.
          </Text>
        </Flex>

        <Group title="Redes sociales">
          {playerData.socialMedia.map((s) => <SocialCard key={s.url} item={s} />)}
        </Group>
        <Group title="Representación">
          {playerData.contact.map((c) => <RepCard key={c.url} item={c} />)}
        </Group>
      </Box>
    </Box>
  )
}
