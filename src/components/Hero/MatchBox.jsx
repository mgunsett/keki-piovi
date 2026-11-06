import { useState } from 'react'
import { Box, Flex, Text, Image, HStack, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { u } from '../../utils/heroUnits'

// Todos los tamaños usan u(): no cambian con el zoom del navegador (ver utils/heroUnits)

const MotionBox = motion(Box)

function Shield({ src, name, size = u(36) }) {
  if (src) return <Image src={src} alt={name} boxSize={size} objectFit="contain" />
  return (
    <Box
      boxSize={size}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontFamily="heading" fontSize={u(10)} color="brand.brownLight">
        {name?.slice(0, 3).toUpperCase()}
      </Text>
    </Box>
  )
}

function MatchSlot({ data, label, labelColor }) {
  const { home, away, homeScore, awayScore, date, stadium, competition } = data

  return (
    <Box>
      <Text fontFamily="mono" fontSize={u(9)} fontWeight="700" letterSpacing="widest"
            textTransform="uppercase" color={labelColor} mb={u(8)}>
        {label}
      </Text>

      {/* Teams row */}
      <Flex align="center" justify="space-between" gap={u(8)}>
        <VStack spacing={u(4)} align="center" flex={1} minW={0}>
          <Shield src={home.shield} name={home.name} />
          <Text fontFamily="mono" fontSize={u(9)} color="brand.bone" textTransform="uppercase"
                letterSpacing="wider" textAlign="center" noOfLines={1} w="full" wordBreak="break-all">
            {home.name}
          </Text>
        </VStack>

        {/* Score */}
        <Box textAlign="center" px={u(8)} flexShrink={0} maxW="45%">
          {homeScore !== null && awayScore !== null ? (
            <HStack spacing={u(4)} justify="center">
              <Text fontFamily="heading" fontSize={u(24)} color="white" lineHeight={1}>
                {homeScore}
              </Text>
              <Text fontFamily="heading" fontSize={u(18)} color="brand.amberLight" lineHeight={1}>
                —
              </Text>
              <Text fontFamily="heading" fontSize={u(24)} color="white" lineHeight={1}>
                {awayScore}
              </Text>
            </HStack>
          ) : (
            <Text fontFamily="heading" fontSize={u(20)} color="brand.amber" letterSpacing="wider">
              VS
            </Text>
          )}
          {competition && (
            <Text fontFamily="mono" fontSize={u(8)} color="brand.gray" letterSpacing="wider"
                  textTransform="uppercase" mt={u(2)} textAlign="center" noOfLines={1}>
              {competition}
            </Text>
          )}
        </Box>

        <VStack spacing={u(4)} align="center" flex={1} minW={0}>
          <Shield src={away.shield} name={away.name} />
          <Text fontFamily="mono" fontSize={u(9)} color="brand.bone" textTransform="uppercase"
                letterSpacing="wider" textAlign="center" noOfLines={1} w="full" wordBreak="break-all">
            {away.name}
          </Text>
        </VStack>
      </Flex>

      <Flex mt={{ base: u(8), md: u(16) }} justify="space-between" align="flex-end">
        <Text fontFamily="mono" fontSize={u(8)} color="brand.gray" letterSpacing="wider">
          {date}
        </Text>
        {stadium && (
          <Text fontFamily="mono" fontSize={u(8)} color="brand.gray" letterSpacing="wider"
                textAlign="right" noOfLines={1} maxW={u(100)}>
            {stadium}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

function CollapsedTab({ last, onClick }) {
  const hasScore = last?.homeScore !== null && last?.awayScore !== null
  const reduceMotion = useReducedMotion()

  return (
    <MotionBox
      as="button"
      type="button"
      onClick={onClick}
      aria-label="Ver partidos"
      key="tab"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      bg="whiteAlpha.100"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="brand.amber"
      borderRightWidth={0}
      borderTopLeftRadius={u(10)}
      borderBottomLeftRadius={u(10)}
      minH={u(250)}
      py={u(24)}
      px={u(12)}
      cursor="pointer"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={u(16)}
      transitionProperty="background, border-color"
      transitionDuration="0.3s"
      _hover={{ bg: 'whiteAlpha.200', borderColor: 'brand.gray2' }}
      _before={{
        content: '""',
        position: 'absolute',
        top: u(12), right: 0,
        w: '2px', h: u(28),
        bg: 'brand.dorado',
      }}
      position="relative"
    >
      <Text
        fontFamily="heading"
        fontSize={u(16)}
        letterSpacing="widest"
        color="brand.amber"
        sx={{ writingMode: 'vertical-rl' }}
        lineHeight={1}
      >
        Partidos
      </Text>

      {hasScore && (
        <VStack spacing={u(6)} align="center">
          <Shield src={last.home.shield} name={last.home.name} size={u(18)} />
          <Flex gap={u(2)} justify="center" direction="column" align="center">
            <Text fontFamily="heading" fontSize={u(16)} color="white" lineHeight={1}>
              {last.homeScore}
            </Text>
            <Text fontFamily="heading" fontSize={u(12)} color="brand.amberLight" lineHeight={1}>
              —
            </Text>
            <Text fontFamily="heading" fontSize={u(16)} color="white" lineHeight={1}>
              {last.awayScore}
            </Text>
          </Flex>
          <Shield src={last.away.shield} name={last.away.name} size={u(18)} />
        </VStack>
      )}

      <MotionBox
        as="span"
        display="block"
        color="brand.amber"
        fontSize={u(16)}
        fontFamily="heading"
        lineHeight={1}
        animate={reduceMotion ? { opacity: 1 } : { x: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        _hover={{ color: 'brand.rec' }}
      >
        ⟪
      </MotionBox>
    </MotionBox>
  )
}

export function MatchBox({ last, next, variant = 'card' }) {
  const isCard = variant === 'card'
  const [isOpen, setIsOpen] = useState(false)

  if (isCard) {
    return (
      <Flex justify="flex-end" align="flex-start">
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <MotionBox
              key="card"
              initial={{ opacity: 0, scaleX: 0.9, x: 20 }}
              animate={{ opacity: 1, scaleX: 1, x: 0 }}
              exit={{ opacity: 0, scaleX: 0.9, x: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              transformOrigin="right center"
              w={u(280)}
              bg="whiteAlpha.100"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="brand.amber"
              borderRightWidth={0}
              borderTopLeftRadius={u(10)}
              borderBottomLeftRadius={u(10)}
              p={u(16)}
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0, left: u(8),
                w: u(28), h: '2px',
                bg: 'brand.dorado',
              }}
            >
              <Box
                as="button"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar partidos"
                position="absolute"
                top={u(130)}
                right={u(12)}
                zIndex={2}
                color="brand.amber"
                fontFamily="mono"
                fontSize={u(18)}
                lineHeight={1}
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: 'brand.bone' }}
              >
                ⟫
              </Box>

              <VStack spacing={{ base: u(16), md: u(24) }} align="stretch">
                <MatchSlot data={last} label="Último Resultado" labelColor="brand.amber" />
                <Box h="1px" bg="brand.amberLight" w="80%" alignSelf="center" />
                <MatchSlot data={next} label="Próximo Partido" labelColor="brand.gray2" />
              </VStack>
            </MotionBox>
          ) : (
            <CollapsedTab last={last} onClick={() => setIsOpen(true)} />
          )}
        </AnimatePresence>
      </Flex>
    )
  }

  return (
    <Box
      bg="transparent"
      backdropFilter="blur(10px)"
      borderTop="1px solid"
      borderColor="brand.amberLight"
      px={u(16)}
      py={u(8)}
      mb={u(-16)}
    >
      <Flex gap={0} >
        <Box flex={1} minW={0} pr={u(12)}>
          <MatchSlot data={last} label="Último Resultado" labelColor="brand.amber" />
        </Box>
        <Box w="1px" bg="brand.amber" mx={u(8)} flexShrink={0} />
        <Box flex={1} minW={0} pl={u(12)}>
          <MatchSlot data={next} label="Próximo Partido" labelColor="brand.gray2" />
        </Box>
      </Flex>
    </Box>
  )
}

export default MatchBox
