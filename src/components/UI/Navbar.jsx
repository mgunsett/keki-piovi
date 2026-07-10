import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { playerData } from '../../data/playerData'
import { useActiveSection } from '../../hooks/useActiveSection'
import { MobileMenu } from './MobileMenu'

const MotionBox = motion(Box)

export const navLinks = [
  { label: 'Home',         href: '#hero' },
  { label: 'Estadísticas', href: '#estadisticas' },
  { label: 'Videos',       href: '#videos' },
  { label: 'Galería',      href: '#galeria' },
  { label: 'Prensa',       href: '#prensa' },
]

export const mobileLinks = [
  ...navLinks,
  { label: 'Contacto', href: '#contact' },
]

const sectionHrefs = mobileLinks.map((l) => l.href)

export function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -20 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef                  = useRef(null)
  const active                  = useActiveSection(sectionHrefs)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tween = reduced
      ? gsap.set(navRef.current, { opacity: 1 })
      : gsap.fromTo(navRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.5 }
        )
    return () => tween.kill()
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Bloquear el scroll del body mientras el menú fullscreen está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <Box ref={navRef} as="nav" position="fixed" top={0} left={0} right={0} zIndex={1000} style={{ opacity: 0 }}>
      <AnimatePresence>
        {menuOpen && <MobileMenu onNavigate={handleLink} active={active} />}
      </AnimatePresence>

      <Flex
        position="relative"
        zIndex={2}
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, lg: 8 }}
        py={{ base: 3, lg: 3 }}
        bg={scrolled || menuOpen ? 'brand.dark3' : 'transparent'}
        backdropFilter={scrolled || menuOpen ? 'blur(14px) saturate(140%)' : 'none'}
        borderBottom="1px solid"
        borderColor={scrolled && !menuOpen ? 'brand.amberLight' : 'transparent'}
        transition="background 0.35s, border-color 0.35s, backdrop-filter 0.35s"
      >
        {/* Logo: bastón rojo + iniciales + guión dorado */}
        <Flex align="center" gap={2.5} cursor="pointer" onClick={(e) => handleLink(e, '#hero')} role="group">
          <Box
            w="5px"
            h="22px"
            bg="brand.amber"
            transform="skewX(-12deg)"
            transition="background 0.25s"
            _groupHover={{ bg: 'brand.dorado' }}
          />
          <Text fontFamily="heading" fontSize="2xl" letterSpacing="wider" color="brand.bone" lineHeight={1}>
            {playerData.initials}<Box as="span" color="brand.dorado">_</Box>
          </Text>
        </Flex>

        {/* Links desktop con indicador deslizante de sección activa */}
        <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <Box
                key={link.href}
                as="a"
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                position="relative"
                px={4}
                py={'5px'}
                cursor="pointer"
              >
                {isActive && (
                  <MotionBox
                    layoutId="nav-active-pill"
                    position="absolute"
                    inset={0}
                    borderRadius="10px"
                    bg="brand.amber2"
                    boxShadow="0 4px 18px rgba(239,45,56,0.35)"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Text
                  as="span"
                  position="relative"
                  zIndex={1}
                  fontFamily="mono"
                  fontSize="2xs"
                  fontWeight="600"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  color={isActive ? 'brand.bone' : 'brand.gray'}
                  transition="color 0.25s"
                  _hover={{ color: isActive ? 'brand.bone' : 'brand.boneWarm' }}
                >
                  {link.label}
                </Text>
              </Box>
            )
          })}
        </HStack>

        {/* CTA desktop: contorno dorado que se enciende en rojo */}
        <Box
          as="a"
          href="#contact"
          onClick={(e) => handleLink(e, '#contact')}
          display={{ base: 'none', lg: 'block' }}
          px={4}
          py={1.5}
          border="1px solid"
          borderColor="brand.dorado"
          borderRadius="full"
          fontFamily="mono"
          fontSize="2xs"
          fontWeight="600"
          letterSpacing="wider"
          textTransform="uppercase"
          color="brand.boneWarm"
          cursor="pointer"
          transition="all 0.25s"
          _hover={{ bg: 'brand.amber', borderColor: 'brand.amber', color: 'brand.bone' }}
        >
          Contacto
        </Box>

        {/* Hamburguesa mobile */}
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          direction="column"
          gap="5px"
          cursor="pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          p={2}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="22px"
              h="2px"
              bg={menuOpen ? 'brand.amber' : 'brand.bone'}
              transition="all 0.25s"
              transform={
                menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none'
              }
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}
