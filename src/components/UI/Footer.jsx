// ─────────────────────────────────────────────────────────────
// Footer: logo (el mismo del navbar), copyright y, a la derecha,
// "Volver arriba" sobre el crédito de desarrollo.
// ─────────────────────────────────────────────────────────────
import { Box, Flex, Grid, Text, Link, useToken } from '@chakra-ui/react'
import { FiArrowUp } from 'react-icons/fi'
import { LiaLaptopCodeSolid } from 'react-icons/lia'
import BrandLogo from './BrandLogo'
import { scrollTo } from './Navbar'
import { playerData } from '../../data/playerData'

const GOLD = '#D9BE7E'
// "EZEQUIEL PIOVI" → "Ezequiel Piovi"
const playerName = playerData.displayName.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())
const focus = { outline: '2px solid', outlineColor: GOLD, outlineOffset: '3px', borderRadius: '4px' }

export default function Footer() {
  const [devCream, devGreen] = useToken('colors', ['dev.cream', 'dev.green'])
  const year = new Date().getFullYear()

  const toTop = (e) => {
    e.preventDefault()
    scrollTo('#hero')
  }

  return (
    <Box as="footer" bg="brand.brown" borderTop="1px solid" borderColor="whiteAlpha.100">
      <Grid
        maxW="1400px"
        mx="auto"
        px={{ base: 5, lg: 10 }}
        py={{ base: 10, md: 11 }}
        templateColumns={{ base: '1fr', md: '1fr auto 1fr' }}
        alignItems="center"
        justifyItems={{ base: 'center', md: 'stretch' }}
        gap={{ base: 6, md: 6 }}
      >
        {/* Logo → inicio */}
        <Box as="a" href="#hero" onClick={toTop} aria-label={`${playerName}, ir al inicio`}
             justifySelf={{ md: 'start' }} _focusVisible={focus}>
          <BrandLogo />
        </Box>

        <Text fontFamily="mono" fontSize="sm" fontWeight={500} color="brand.gray" textAlign="center">
          © {year} {playerName}. Todos los derechos reservados.
        </Text>

        {/* Volver arriba + crédito */}
        <Flex direction="column" align={{ base: 'center', md: 'flex-end' }} gap={3.5} justifySelf={{ md: 'end' }}>
          <Flex
            as="a"
            href="#hero"
            onClick={toTop}
            align="center"
            gap={2}
            pl={4}
            pr={3.5}
            py={2.5}
            borderRadius="full"
            border="1px solid"
            borderColor="whiteAlpha.300"
            fontFamily="mono"
            fontSize="sm"
            fontWeight={600}
            color="brand.bone"
            transition="border-color .2s ease, transform .16s cubic-bezier(0.23, 1, 0.32, 1)"
            _active={{ transform: 'scale(0.97)' }}
            _focusVisible={focus}
            sx={{
              '& svg': { transition: 'transform .25s cubic-bezier(0.23, 1, 0.32, 1)' },
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': { borderColor: 'brand.amber' },
                '&:hover svg': { transform: 'translateY(-2px)' },
              },
            }}
          >
            Volver arriba
            <Box as={FiArrowUp} boxSize="16px" aria-hidden="true" />
          </Flex>

          <Text fontFamily="mono" fontSize="13px" fontWeight={500} color="brand.gray">
            Desarrollo web:{' '}
            <Link
              href="https://matiasgunsett.netlify.app/"
              isExternal
              aria-label="Matias Gunsett, desarrollador web. Se abre en otra pestaña"
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              fontSize="14px"
              fontWeight={600}
              color={devCream}
              borderBottom="1px solid"
              borderColor={devGreen}
              pb="1px"
              transition="border-color .2s ease"
              _hover={{ textDecoration: 'none', borderColor: devCream }}
              _focusVisible={focus}
            >
              Matias Gunsett
              <Box as={LiaLaptopCodeSolid} boxSize="18px" color="#4f9a7a" aria-hidden="true" />
            </Link>
          </Text>
        </Flex>
      </Grid>
    </Box>
  )
}
