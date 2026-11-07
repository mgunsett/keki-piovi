// ─────────────────────────────────────────────────────────────
// Riel de Instagram: logo + "Instagram" en vertical + usuario.
// Va a la izquierda de las cards y toma SU altura: con
// container-type: size el riel no empuja el alto de la fila, y la
// palabra se dimensiona contra esa altura (unidades cqh/cqw).
// ─────────────────────────────────────────────────────────────
import { Box, Flex, Text } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { playerData } from '../../data/playerData'

const instagram = playerData.socialMedia.find((s) => s.label === 'Instagram')

export function InstagramRail({ width }) {
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
          '&:hover .rail-handle': { color: 'brand.dorado' },
        },
      }}
    >
      <Flex h="100%" direction="column" align="center" gap={{ base: 3, md: 4 }} py="6px" overflow="hidden" aria-hidden="true">
        <Flex
          className="rail-logo"
          flexShrink={0}
          boxSize={{ base: '36px', md: '52px' }}
          borderRadius={{ base: '11px', md: '15px' }}
          border="1px solid"
          borderColor="brand.amber"
          align="center"
          justify="center"
          transition="background-color .25s ease"
        >
          <Box as={FaInstagram} boxSize={{ base: '18px', md: '24px' }} />
        </Flex>

        <Text
          className="rail-word"
          fontFamily="heading"
          lineHeight={0.82}
          letterSpacing="0.02em"
          whiteSpace="nowrap"
          color="transparent"
          transition="color .3s ease"
          sx={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 'min(15cqh, 110cqw)',
            WebkitTextStroke: { base: '1.2px #B89B5E', md: '1.5px #B89B5E' },
          }}
        >
          Instagram
        </Text>

        <Box flex="1" w="1px" minH="24px" bgGradient="linear(to-b, whiteAlpha.300, transparent)" />

        <Flex
          className="rail-handle"
          align="center"
          gap="10px"
          fontFamily="mono"
          fontSize={{ base: '11px', md: '13px' }}
          fontWeight={600}
          letterSpacing="0.14em"
          color="brand.gray"
          transition="color .25s ease"
          sx={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            // Riel bajo (tablet): no entra el usuario; el riel sigue siendo link al perfil
            '@container (max-height: 470px)': { display: 'none' },
          }}
        >
          <Box as={FiArrowUpRight} boxSize="14px" transform="rotate(180deg)" />
          {instagram.handle}
        </Flex>
      </Flex>
    </Box>
  )
}
