// ─────────────────────────────────────────────────────────────
// Prensa — "Titulares"
// Una fila por nota: medio, titular grande y fecha. Cada fila es un
// link a la publicación original (se abre en otra pestaña).
// ─────────────────────────────────────────────────────────────
import { useRef } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { FiArrowUpRight } from 'react-icons/fi'
import useScrubReveal from '../../hooks/useScrubReveal'
import { playerData } from '../../data/playerData'

const GOLD = '#D9BE7E'

function PressRow({ item }) {
  const cta = item.type?.startsWith('Publicación') ? 'Ver la publicación' : 'Leer la nota'

  return (
    <Box as="li" borderBottom="1px solid" borderColor="whiteAlpha.100">
      <Grid
        as="a"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title}. ${item.media}, ${item.date}. Se abre en otra pestaña`}
        templateColumns={{ base: '1fr auto', lg: '220px 1fr 170px' }}
        templateAreas={{ base: '"src end" "title title"', lg: '"src title end"' }}
        alignItems="center"
        columnGap={{ base: 5, lg: 9 }}
        rowGap={3.5}
        py={{ base: 6, lg: 7 }}
        px={{ base: 0, lg: 2 }}
        transition="background-color .25s ease"
        _focusVisible={{ outline: '2px solid', outlineColor: GOLD, outlineOffset: '-2px' }}
        sx={{
          '& .press-title': { transition: 'color .25s ease' },
          '& .press-cta': { transition: 'color .2s ease' },
          '& .press-cta svg': { transition: 'transform .25s cubic-bezier(0.23, 1, 0.32, 1)' },
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { bg: 'rgba(239,45,56,.05)' },
            '&:hover .press-title': { color: 'white' },
            '&:hover .press-cta': { color: 'brand.amber' },
            '&:hover .press-cta svg': { transform: 'translate(2px, -2px)' },
          },
        }}
      >
        <Flex gridArea="src" align="center" gap={3.5} minW={0}>
          <Image src={item.logo} alt="" boxSize={{ base: '42px', lg: '52px' }} borderRadius={{ base: '10px', lg: '12px' }}
                 objectFit="contain" bg="white" p="4px" flexShrink={0} />
          <Box minW={0}>
            <Text fontFamily="mono" fontSize="md" fontWeight={600} color="brand.bone">{item.media}</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight={500} color="brand.gray">{item.type}</Text>
          </Box>
        </Flex>

        <Text gridArea="title" className="press-title" fontFamily="heading" lineHeight={1} letterSpacing="0.005em"
              fontSize={{ base: '30px', md: '38px', lg: 'clamp(30px, 3.2vw, 46px)' }} color="brand.bone" maxW={{ lg: '26ch' }}>
          {item.title}
        </Text>

        <Box gridArea="end" textAlign="right">
          <Text fontFamily="mono" fontSize="md" fontWeight={600} color={GOLD}>{item.date}</Text>
          <Flex className="press-cta" display={{ base: 'none', md: 'inline-flex' }} align="center" gap={1.5} mt={2}
                fontFamily="mono" fontSize="sm" fontWeight={600} color="brand.gray">
            {cta}
            <Box as={FiArrowUpRight} boxSize="16px" aria-hidden="true" />
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}

export default function PressSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const press = playerData.press

  useScrubReveal(sectionRef, {
    elements: [{ ref: titleRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  if (!press?.length) return null

  return (
    <Box as="section" id="prensa" ref={sectionRef} aria-labelledby="prensa-title" bg="brand.dark"
         pt={{ base: 16, lg: 20 }} pb={{ base: 16, lg: 20 }} px={{ base: 5, lg: 10 }}>
      <Box maxW="1400px" mx="auto">
        <Flex ref={titleRef} justify="space-between" align="flex-end" gap={5} flexWrap="wrap">
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
              Medios
            </Text>
            <Text as="h2" id="prensa-title" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.88}
                  color="brand.amber" mt={1}>
              Prensa
            </Text>
          </Box>
          <Text color="brand.gray" maxW="38ch" lineHeight={1.5}>
            Lo que se escribió sobre él, de Quito a La Plata.
          </Text>
        </Flex>

        <Box as="ul" listStyleType="none" mt={{ base: 8, lg: 11 }} borderTop="1px solid" borderColor="whiteAlpha.300">
          {press.map((item) => <PressRow key={item.url} item={item} />)}
        </Box>
      </Box>
    </Box>
  )
}
