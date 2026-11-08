// ─────────────────────────────────────────────────────────────
// Galería — pestañas por categoría + mosaico.
// Muestra 4 fotos por categoría (un bloque completo del mosaico) y
// el resto queda colapsado tras "Ver más fotos".
// ─────────────────────────────────────────────────────────────
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Box, Flex, Grid, Text, Image, Collapse,
  Modal, ModalOverlay, ModalContent,
} from '@chakra-ui/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi'
import useScrubReveal from '../../hooks/useScrubReveal'
import { playerData } from '../../data/playerData'

const GALLERIES = playerData.galleries.filter((g) => g.photos.length > 0)
const VISIBLE = 4 // fotos antes del corte
const GOLD = '#D9BE7E'

const MotionBox = motion(Box)

// Forma de cada celda: la primera grande (si hay suficientes), cada 5 una ancha
const baseShape = (i, n) => {
  if (n >= 5 && i === 0) return { colSpan: 2, rowSpan: 2 }
  if (i % 5 === 3 || n <= 2) return { colSpan: 2, rowSpan: 1 }
  return { colSpan: 1, rowSpan: 1 }
}

// Ajusta las últimas celdas para que cada grilla cierre sin huecos
// (4 columnas en desktop, 2 en mobile: alcanza con que el total sea múltiplo de 4).
// Con 5+ fotos hay dos grillas (las primeras VISIBLE y el resto), así que se ajusta solo el resto.
const shapesFor = (n) => {
  const shapes = Array.from({ length: n }, (_, i) => baseShape(i, n))
  if (n <= 2) return shapes
  const from = n >= 5 ? VISIBLE : 0
  const units = shapes.slice(from).reduce((a, s) => a + s.colSpan * s.rowSpan, 0)
  const r = units % 4
  if (r === 0) return shapes
  const last = (cond) => { for (let i = n - 1; i >= from; i--) if (cond(shapes[i])) return i; return -1 }
  if (r === 1) {
    const w = last((s) => s.colSpan === 2 && s.rowSpan === 1)
    if (w !== -1) { shapes[w] = { colSpan: 1, rowSpan: 1 }; return shapes }
  }
  for (let k = 0; k < 4 - r; k++) {
    const i = last((s) => s.colSpan === 1)
    if (i === -1) break
    shapes[i] = { colSpan: 2, rowSpan: 1 }
  }
  return shapes
}

const plural = (n) => `${n} ${n === 1 ? 'foto' : 'fotos'}`

// ── Mosaico ──────────────────────────────────────────────────
function Mosaic({ photos, offset = 0, total, shapes, onOpen }) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      autoRows={{ base: '150px', md: '180px', lg: '230px' }}
      autoFlow="dense"
      gap={{ base: 2, md: '10px' }}
    >
      {photos.map((p, k) => {
        const i = k + offset
        const { colSpan, rowSpan } = shapes[i]
        return (
          <Box
            key={p.src}
            as="button"
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Ampliar foto ${i + 1} de ${total}`}
            gridColumn={`span ${colSpan}`}
            gridRow={`span ${rowSpan}`}
            position="relative"
            overflow="hidden"
            borderRadius="10px"
            bg="#1c1818"
            _focusVisible={{ outline: '2px solid', outlineColor: GOLD, outlineOffset: '3px' }}
            sx={{
              '& img': { transition: 'transform .6s cubic-bezier(0.23, 1, 0.32, 1)' },
              '& .zoom': { opacity: 0, transition: 'opacity .2s ease' },
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover img': { transform: 'scale(1.04)' },
                '&:hover .zoom': { opacity: 1 },
              },
            }}
          >
            <Image src={p.src} alt={p.alt} loading="lazy" w="100%" h="100%" objectFit="cover" objectPosition={p.pos || "center"} />
            <Flex className="zoom" aria-hidden="true" position="absolute" right="10px" bottom="10px"
                  boxSize="34px" borderRadius="full" bg="rgba(10,5,5,.6)" align="center" justify="center">
              <Box as={FiZoomIn} boxSize="16px" color="white" />
            </Flex>
          </Box>
        )
      })}
    </Grid>
  )
}

// ── Lightbox ─────────────────────────────────────────────────
function Lightbox({ gallery, index, onClose, onIndex }) {
  const reduce = useReducedMotion()
  const isOpen = index !== null
  const photos = gallery.photos
  const go = (d) => {
    const n = index + d
    if (n >= 0 && n < photos.length) onIndex(n)
  }
  const navBtn = {
    as: 'button', type: 'button', boxSize: '46px', borderRadius: 'full', border: '1px solid', borderColor: 'whiteAlpha.400',
    color: 'white', bg: 'rgba(10,5,5,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    _disabled: { opacity: 0.25, cursor: 'default' },
    _focusVisible: { outline: '2px solid', outlineColor: GOLD, outlineOffset: '3px' },
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none">
      <ModalOverlay bg="rgba(10,5,5,.95)" backdropFilter="blur(10px)" />
      <ModalContent
        bg="transparent" color="brand.bone" m={0} boxShadow="none"
        aria-label={`Galería ${gallery.name}`}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1) }}
      >
        {isOpen && (
          <Grid h="100dvh" templateRows="auto 1fr auto" gap={3} px={{ base: 4, md: 6 }} pt={4} pb={{ base: 20, md: 6 }}>
            <Flex justify="space-between" align="center">
              <Text fontFamily="mono" fontSize="sm" fontWeight={600}>
                {gallery.name}
                <Text as="span" color="brand.gray" fontWeight={500} ml={2.5}>{plural(photos.length)}</Text>
              </Text>
              <Box {...navBtn} onClick={onClose} aria-label="Cerrar"><Box as={FiX} boxSize="20px" /></Box>
            </Flex>

            <Flex position="relative" align="center" justify="center" minH={0}
                  onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
              <AnimatePresence mode="wait" initial={false}>
                <MotionBox
                  key={photos[index].src}
                  as="img"
                  src={photos[index].src}
                  alt={photos[index].alt}
                  maxW="100%" maxH="100%" objectFit="contain" borderRadius="8px"
                  drag={reduce ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) go(info.offset.x < 0 ? 1 : -1)
                  }}
                  initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  style={{ cursor: reduce ? 'default' : 'grab' }}
                />
              </AnimatePresence>
              <Box {...navBtn} position="absolute" left={{ base: '28%', md: 0 }} top={{ base: 'auto', md: '50%' }}
                   bottom={{ base: '-64px', md: 'auto' }} transform={{ md: 'translateY(-50%)' }}
                   onClick={() => go(-1)} disabled={index === 0} aria-label="Foto anterior">
                <Box as={FiChevronLeft} boxSize="20px" />
              </Box>
              <Box {...navBtn} position="absolute" right={{ base: '28%', md: 0 }} top={{ base: 'auto', md: '50%' }}
                   bottom={{ base: '-64px', md: 'auto' }} transform={{ md: 'translateY(-50%)' }}
                   onClick={() => go(1)} disabled={index === photos.length - 1} aria-label="Foto siguiente">
                <Box as={FiChevronRight} boxSize="20px" />
              </Box>
            </Flex>

            <Text textAlign="center" fontFamily="mono" fontSize="sm" color="brand.gray" letterSpacing="0.08em" aria-live="polite">
              {index + 1} de {photos.length}
            </Text>
          </Grid>
        )}
      </ModalContent>
    </Modal>
  )
}

// ── Sección ──────────────────────────────────────────────────
export default function GallerySection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const inkRef = useRef(null)
  const reduce = useReducedMotion()
  const [cur, setCur] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  // Subrayado de la pestaña activa (transform, no width/left)
  const placeInk = () => {
    const tab = tabsRef.current?.querySelectorAll('[role="tab"]')[cur]
    if (tab && inkRef.current) inkRef.current.style.transform = `translateX(${tab.offsetLeft}px) scaleX(${tab.offsetWidth})`
  }
  useLayoutEffect(placeInk, [cur])
  useEffect(() => {
    window.addEventListener('resize', placeInk)
    document.fonts?.ready.then(placeInk)
    return () => window.removeEventListener('resize', placeInk)
  })

  if (!GALLERIES.length) return null
  const gallery = GALLERIES[cur]
  const first = gallery.photos.slice(0, VISIBLE)
  const rest = gallery.photos.slice(VISIBLE)
  const shapes = shapesFor(gallery.photos.length)

  const select = (i, focus) => {
    setCur(i)
    setExpanded(false)
    if (focus) tabsRef.current?.querySelectorAll('[role="tab"]')[i]?.focus()
  }

  const toggle = () => {
    if (expanded) {
      // Al cerrar, volver al inicio del mosaico para no quedar perdido más abajo
      tabsRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
    setExpanded((e) => !e)
  }

  return (
    <Box as="section" id="galeria" ref={sectionRef} aria-labelledby="galeria-title" bg="brand.dark"
         py={{ base: 16, lg: 20 }} px={{ base: 5, lg: 10 }}>
      <Box maxW="1400px" mx="auto">
        <Box ref={headerRef}>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
            Fotos
          </Text>
          <Text as="h2" id="galeria-title" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.88}
                color="brand.amber" mt={1}>
            Galería
          </Text>
        </Box>

        {/* Pestañas */}
        <Flex mt={10} justify="space-between" align="flex-end" gap={5} flexWrap="wrap" borderBottom="1px solid"
              borderColor="whiteAlpha.300" sx={{ scrollMarginTop: '90px' }} ref={tabsRef}>
          <Flex role="tablist" aria-label="Galerías" position="relative" gap={{ base: 4, md: 9 }}
                onKeyDown={(e) => {
                  const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
                  if (d) { e.preventDefault(); select((cur + d + GALLERIES.length) % GALLERIES.length, true) }
                }}>
            {GALLERIES.map((g, i) => (
              <Flex
                key={g.key}
                as="button"
                type="button"
                role="tab"
                id={`galeria-tab-${g.key}`}
                aria-controls="galeria-panel"
                aria-selected={i === cur}
                tabIndex={i === cur ? 0 : -1}
                onClick={() => select(i)}
                align="baseline"
                pb={4}
                color={i === cur ? 'brand.bone' : 'brand.gray'}
                transition="color .2s ease"
                _focusVisible={{ outline: '2px solid', outlineColor: GOLD, outlineOffset: '4px', borderRadius: '4px' }}
                sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { color: 'brand.bone' } } }}
              >
                <Text as="span" fontFamily="heading" fontSize={{ base: '25px', md: '40px' }} lineHeight={1}>{g.name}</Text>
              </Flex>
            ))}
            <Box ref={inkRef} aria-hidden="true" position="absolute" left={0} bottom="-1px" h="3px" w="1px" bg="brand.amber"
                 transformOrigin="left" transition={reduce ? 'none' : 'transform .3s cubic-bezier(0.23, 1, 0.32, 1)'} />
          </Flex>
        </Flex>

        {/* Mosaico */}
        <Box id="galeria-panel" role="tabpanel" aria-labelledby={`galeria-tab-${gallery.key}`} mt={7}>
          <AnimatePresence mode="wait" initial={false}>
            <MotionBox
              key={gallery.key}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <Box position="relative">
                <Mosaic photos={first} total={gallery.photos.length} shapes={shapes} onOpen={setLightbox} />
                {/* Fundido sobre el corte mientras está colapsado */}
                {rest.length > 0 && (
                  <Box aria-hidden="true" position="absolute" left={0} right={0} bottom="-1px" h={{ base: '90px', md: '120px' }}
                       pointerEvents="none" bgGradient="linear(to-b, transparent, brand.dark)"
                       opacity={expanded ? 0 : 1} transition="opacity .25s ease" />
                )}
              </Box>

              {rest.length > 0 && (
                <>
                  <Collapse in={expanded} animateOpacity>
                    <Box id="galeria-mas" pt={{ base: 2, md: '10px' }}>
                      <Mosaic photos={rest} offset={VISIBLE} total={gallery.photos.length} shapes={shapes} onOpen={setLightbox} />
                    </Box>
                  </Collapse>

                  <Flex justify="center" mt={{ base: 5, md: 7 }}>
                    <Flex
                      as="button"
                      type="button"
                      onClick={toggle}
                      aria-expanded={expanded}
                      aria-controls="galeria-mas"
                      align="center"
                      gap={2.5}
                      px={5}
                      py={2.5}
                      borderRadius="full"
                      border="1px solid"
                      borderColor="whiteAlpha.400"
                      fontFamily="mono"
                      fontSize="md"
                      fontWeight={600}
                      color="brand.bone"
                      transition="border-color .2s ease, transform .16s cubic-bezier(0.23, 1, 0.32, 1)"
                      _active={{ transform: 'scale(0.97)' }}
                      _focusVisible={{ outline: '2px solid', outlineColor: GOLD, outlineOffset: '3px' }}
                      sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { borderColor: 'brand.amber' } } }}
                    >
                      {expanded ? 'Ver menos' : 'Ver más fotos'}
                      {!expanded && <Text as="span" color="brand.amber">+{rest.length}</Text>}
                      <Box as={FiChevronDown} boxSize="18px" transform={expanded ? 'rotate(180deg)' : 'none'}
                           transition="transform .2s cubic-bezier(0.23, 1, 0.32, 1)" />
                    </Flex>
                  </Flex>
                </>
              )}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Box>

      <Lightbox gallery={gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </Box>
  )
}
