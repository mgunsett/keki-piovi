import { extendTheme } from '@chakra-ui/react'

// Paleta de marca — fuente única de verdad para los colores del proyecto
// Basada en la identidad de Estudiantes de La Plata: rojo pincha,
// crema de los bastones y dorado kaki del borde/estrella del escudo
const brand = {
  brown:      '#191314', // negro carbón cálido (fondo de cajas/footer)
  brownDark:  '#3A0E13', // bordó profundo (paneles)
  brownLight: '#D9BE7E', // dorado claro (acentos secundarios)
  amber:      '#EF2D38', // rojo pincha — acento principal
  amber2:     '#EF2D388e', // rojo translúcido medio
  amberDark:  '#7C0E15', // rojo profundo
  amberLight: '#EF2D3852', // rojo translúcido suave (bordes)
  dorado:     '#B89B5E', // dorado kaki del escudo (estrella/borde)
  orange:     '#C4151F', // rojo oscuro (hover de botones)
  orangeDark: '#8A0F16', // rojo muy oscuro (hover de botones)
  orangeLight:'#F4646B', // rojo claro (hover de botones)
  dark:       '#1512129f', // negro carbón cálido (fondo global)
  dark3:      '#151212a1',
  dark2:      '#A9A29B',
  gray:       '#A39B92', // gris cálido (texto secundario)
  gray2:      '#ebebeb', // bordó apagado (bordes sutiles)
  bone:       '#F3EEE3', // crema de la camiseta (texto principal)
  boneWarm:   '#D8C088', // dorado suave (detalles)
  rec:        '#EF2D38', // rojo del indicador REC
  bgRef:      '#d9be7e21', // bg de hover en cajas (dorado sutil)
  accent:     '#EF2D38', // rojo pincha (scrollbar y acentos)
  accentMid:  '#C4151F', // rojo medio (gradientes)
  accentDeep: '#7C0E15', // rojo profundo (gradientes)
  rose:       '#F4646B', // rojo claro rosado
  panel:      '#1E1717', // fondo de paneles elevados
}

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading:   `'Bebas Neue', sans-serif`,
    body:      `'Barlow', sans-serif`,
    mono:      `'Barlow Condensed', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: 'white',
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.accent, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
