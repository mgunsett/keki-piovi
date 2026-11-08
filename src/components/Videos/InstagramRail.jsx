// ─────────────────────────────────────────────────────────────
// Riel de Instagram: logo + "Instagram" en vertical a todo el alto.
// Va a la izquierda de las cards y toma SU altura: con
// container-type: size el riel no empuja el alto de la fila, y la
// palabra se ajusta a esa altura (ver useFitWord).
// ─────────────────────────────────────────────────────────────
import { useLayoutEffect, useRef } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { playerData } from '../../data/playerData'

const instagram = playerData.socialMedia.find((s) => s.label === 'Instagram')

const WORD = 'Instagram'
// Alto de letra respecto del ancho del riel: ~1.2 deja la palabra casi de borde a borde
const WIDTH_RATIO = 1.2

// En mobile el espaciado entre letras tiene tope (en em) para que no queden tan separadas;
// el alto restante lo completa el usuario (@kekipiovi18), que solo se muestra en mobile.
const MOBILE_MAX_SPACING = 0.14
const HANDLE_GAP = 12

// Ajusta la palabra para que ocupe exactamente el alto disponible:
// primero el tamaño según el ancho; el alto que sobra se reparte en el espaciado entre letras.
function useFitWord(wrapRef, wordRef, handleRef) {
  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const word = wordRef.current
    if (!wrap || !word) return undefined

    const fit = () => {
      const handle = handleRef.current
      const handleH = handle && handle.offsetParent !== null ? handle.offsetHeight + HANDLE_GAP : 0
      const isMobile = handleH > 0
      const H = wrap.clientHeight - handleH
      const W = wrap.clientWidth
      if (!H || !W) return
      let size = W * WIDTH_RATIO
      word.style.fontSize = `${size}px`
      word.style.letterSpacing = '0px'
      const natural = word.offsetHeight
      if (natural > H) {
        size *= H / natural
        word.style.fontSize = `${size}px`
      }
      let spacing = natural > H ? 0 : (H - natural) / (WORD.length - 1)
      if (isMobile) spacing = Math.min(spacing, size * MOBILE_MAX_SPACING)
      word.style.letterSpacing = `${spacing}px`
      // El espaciado también se suma tras la última letra: se compensa para pegar la palabra a los bordes
      word.style.transform = `translateY(${-spacing / 2}px) rotate(180deg)`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(wrap)
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [wrapRef, wordRef, handleRef])
}

export function InstagramRail({ width }) {
  const wrapRef = useRef(null)
  const wordRef = useRef(null)
  const handleRef = useRef(null)
  useFitWord(wrapRef, wordRef, handleRef)

  if (!instagram) return null

  return (
    <Box
      as="a"
      href={instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver el perfil de Instagram de Keki Piovi, ${instagram.handle}`}
      flex="0 0 auto"
      w={width}
      color="brand.bone"
      borderRadius="14px"
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '6px' }}
      sx={{
        containerType: 'size',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover .rail-logo': { bg: 'brand.amber' },
          '&:hover .rail-word': { color: 'brand.bone', WebkitTextStrokeColor: '#F3EEE3' },
        },
      }}
    >
      <Flex h="100%" direction="column" align="center" gap={{ base: 3, md: 4 }} py="6px" overflow="hidden" aria-hidden="true">
        <Flex
          className="rail-logo"
          flexShrink={0}
          boxSize={{ base: '36px', md: '67px' }}
          borderRadius={{ base: '11px', md: '15px' }}
          border="1px solid"
          borderColor="brand.amber"
          bg={{ base: 'brand.amber', md: 'transparent' }}
          align="center"
          justify="center"
          transition="background-color .25s ease"
        >
          <Box as={FaInstagram} boxSize={{ base: '18px', md: '54px' }} transform="rotate(270deg)" />
        </Flex>

        {/* La palabra ocupa todo el alto restante: el tamaño y el espaciado se ajustan en useFitWord.
            En mobile, debajo va el usuario para completar el alto sin separar tanto las letras. */}
        <Flex ref={wrapRef} flex="1" w="100%" minH={0} direction="column" align="center" justify="center" gap={`${HANDLE_GAP}px`}>
          <Text
            ref={wordRef}
            className="rail-word"
            fontFamily="heading"
            lineHeight={0.82}
            whiteSpace="nowrap"
            color={{ base: 'brand.bone', md: 'transparent' }}
            transition="color .3s ease"
            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              // Mobile: siempre con los colores del hover (relleno claro)
              WebkitTextStroke: { base: '1.2px #F3EEE3', md: '1.5px #B89B5E' },
            }}
          >
            {WORD}
          </Text>
          <Text
            ref={handleRef}
            display={{ base: 'block', md: 'none' }}
            flexShrink={0}
            fontFamily="mono"
            fontSize="12px"
            fontWeight={600}
            letterSpacing="0.14em"
            color="brand.dorado"
            whiteSpace="nowrap"
            sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {instagram?.handle}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
