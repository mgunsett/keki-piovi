import { Box, Flex, Portal, Text, VStack } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { mobileLinks } from './Navbar'

const MotionBox  = motion(Box)
const MotionFlex = motion(Flex)

// Menú fullscreen mobile: tipografía grande estilo editorial deportivo
export function MobileMenu({ onNavigate, active }) {
  const reduced = useReducedMotion()

  return (
    // Portal: el nav padre tiene transform de GSAP, que rompe position:fixed
    <Portal>
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100dvh"
      zIndex={990}
      bg="brand.panel"
      overflowY="auto"
      display={{ base: 'block', lg: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <VStack
        as="ul"
        align="stretch"
        justify="center"
        spacing={0}
        minH="full"
        px={8}
        pt={20}
        pb={10}
        listStyleType="none"
      >
        {mobileLinks.map((link, i) => {
          const isActive = active === link.href
          return (
            <MotionFlex
              as="li"
              key={link.href}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: reduced ? 0 : 0.08 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Flex
                as="a"
                href={link.href}
                onClick={(e) => onNavigate(e, link.href)}
                align="baseline"
                gap={4}
                w="full"
                py={2.5}
                borderBottom="1px solid"
                borderColor="whiteAlpha.100"
                cursor="pointer"
              >
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="600"
                  letterSpacing="wider"
                  color={isActive ? 'brand.amber' : 'brand.dorado'}
                  minW="6"
                >
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: '3xl', sm: '4xl' }}
                  letterSpacing="wide"
                  textTransform="uppercase"
                  lineHeight={1.1}
                  color={isActive ? 'brand.amber' : 'brand.bone'}
                  transition="color 0.2s"
                  _hover={{ color: 'brand.amber' }}
                >
                  {link.label}
                </Text>
              </Flex>
            </MotionFlex>
          )
        })}
      </VStack>
    </MotionBox>
    </Portal>
  )
}
