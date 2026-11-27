// ─────────────────────────────────────────────────────────────
// Video principal (YouTube) arriba de los reels.
// Muestra la portada con título y botón; al tocarla se reemplaza por el
// reproductor de YouTube (dominio sin cookies) y arranca solo.
// Datos: playerData.highlight
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Box, Flex, Text, Image, AspectRatio } from '@chakra-ui/react'
import { FaPlay, FaYoutube } from 'react-icons/fa'
import { playerData } from '../../data/playerData'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

export function HighlightVideo() {
  const hl = playerData.highlight
  const [playing, setPlaying] = useState(false)
  if (!hl?.youtubeId) return null

  const name = playerData.shortName || playerData.nickname

  return (
    <Box
      className="video-card"
      w="100%"
      // En pantallas bajas el 16:9 no supera ~72vh de alto
      maxW={{ base: '100%', md: 'min(100%, calc(72vh * 16 / 9))' }}
      mx="auto"
      mb={{ base: 6, md: 8 }}
    >
      <AspectRatio ratio={16 / 9}>
        <Box borderRadius={{ base: '12px', md: '18px' }} overflow="hidden" bg="#000">
          {playing ? (
            <Box
              as="iframe"
              src={`https://www.youtube-nocookie.com/embed/${hl.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`${hl.title} · ${name}`}
              border="none"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              w="100%"
              h="100%"
            />
          ) : (
            <Box
              as="button"
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Reproducir ${hl.title} de ${name}`}
              position="relative"
              w="100%"
              h="100%"
              textAlign="left"
              cursor="pointer"
              sx={{
                '.hl-img': { transition: `transform 0.9s ${EASE}` },
                '.hl-play': { transition: `transform 0.35s ${EASE}, box-shadow 0.35s ${EASE}` },
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover .hl-img': { transform: 'scale(1.04)' },
                  '&:hover .hl-play': { transform: 'translate(-50%, -50%) scale(1.08)', boxShadow: '0 0 0 16px rgba(239,45,56,0.18)' },
                },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '4px' },
              }}
            >
              <Image
                className="hl-img"
                src={hl.cover}
                alt=""
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition={hl.coverPos || 'center'}
                loading="lazy"
              />
              <Box position="absolute" inset={0} bgGradient="linear(to-b, rgba(21,18,18,0.05) 35%, rgba(21,18,18,0.88) 100%)" />

              {/* Botón play */}
              <Flex
                className="hl-play"
                position="absolute"
                left="50%"
                top={{ base: '42%', md: '50%' }}
                transform="translate(-50%, -50%)"
                w={{ base: '64px', md: '96px' }}
                h={{ base: '64px', md: '96px' }}
                borderRadius="full"
                bg="brand.amber"
                align="center"
                justify="center"
                boxShadow={{ base: '0 0 0 7px rgba(239,45,56,0.22)', md: '0 0 0 10px rgba(239,45,56,0.22)' }}
              >
                <Box as={FaPlay} color="brand.bone" fontSize={{ base: '20px', md: '30px' }} ml={{ base: '4px', md: '6px' }} />
              </Flex>

              {/* Título */}
              <Box position="absolute" left={{ base: 4, md: 9 }} right={{ base: 4, md: 9 }} bottom={{ base: 3, md: 8 }}>
                <Flex display={{ base: 'none', md: 'flex' }} align="center" gap={2}>
                  <Box as={FaYoutube} color="brand.amber" fontSize="22px" />
                  <Text fontFamily="mono" fontWeight={600} fontSize="12px" letterSpacing="0.14em" textTransform="uppercase" color="brand.bone">
                    Video principal · YouTube
                  </Text>
                </Flex>
                <Text fontFamily="heading" fontSize={{ base: '36px', md: '72px', lg: '92px' }} lineHeight={0.85} color="brand.bone" mt={{ base: 0, md: 3 }}>
                  {hl.title}
                </Text>
                <Text fontFamily="mono" fontWeight={500} fontSize={{ base: '12px', md: '15px' }} letterSpacing="0.12em" textTransform="uppercase" color="brand.dark2" mt={{ base: 1, md: 2 }}>
                  {[hl.source, hl.date].filter(Boolean).join(' · ')}
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </AspectRatio>
    </Box>
  )
}
