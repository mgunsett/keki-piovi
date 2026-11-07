import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import heroImage from '@assets/piovi-hero.webp'

import argentina from '@assets/argentina.webp'
//Escudos trayectoria
import escudoEstudiantes from '@assets/escudos/escudo_estudiantes.webp'
import escudoLigadequito from '@assets/escudos/escudo_ligadequito.webp'
import escudoAlmagro from '@assets/escudos/escudo_almagro.webp'
import escudoArsenal from '@assets/escudos/escudo_arsenal.webp'
import escudoFenix from '@assets/escudos/escudo_fenix.webp'
import escudoLamadrid from '@assets/escudos/escudo_lamadrid.webp'
import escudoMessina from '@assets/escudos/escudo_messina.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
import image8 from '@assets/gallery/image8.webp'
import image9 from '@assets/gallery/image9.webp'
import image10 from '@assets/gallery/image10.webp'
import image11 from '@assets/gallery/image11.webp'
import image12 from '@assets/gallery/image12.webp'
import image13 from '@assets/gallery/image13.webp'
import image14 from '@assets/gallery/image14.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


const name = 'EZEQUIEL'
const fullName = 'PIOVI'

// Fecha de nacimiento en formato ISO: de acá salen la edad y el texto visible
const BIRTH_DATE = '1992-08-20'

function ageFrom(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const now = new Date()
  let age = now.getFullYear() - y
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--
  return age
}

function formatBirthDate(iso) {
  const [y, m, d] = iso.split('-')
  return `${d} / ${m} / ${y}`
}

export const playerData = {
  name,
  fullName,
  initials: `${name[0]}${fullName[0]}`, // iniciales para logos (EP)
  displayName: `${name} ${fullName}`,   // nombre completo para textos legales / alt
  number: 21,
  position: 'Mediocampista',
  positionDetail: 'Mediocampista central',
  positionShort: 'MID',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  age: ageFrom(BIRTH_DATE),
  height: '1.70m',
  weight: '72kg',
  foot: 'Derecho',
  birthDate: formatBirthDate(BIRTH_DATE),
  birthPlace: 'Morón, Buenos Aires, Argentina',
  currentClub: 'Estudiantes de La Plata',
  logoCurrentClub: escudoEstudiantes,
  image: heroImage,

  stats: [
    { label: 'Velocidad', value: 85 },
    { label: 'Pases', value: 88 },
    { label: 'Regate', value: 87 },
    { label: 'Recuperos', value: 89 },
    { label: 'Presión Alta', value: 90 },
    { label: 'Visión de Juego', value: 86 },
  ],

  // highlight: se muestran en rojo en la ficha (los números que mejor lo definen)
  seasonStats: [
    { label: 'Recuperos', value: 82, highlight: true },
    { label: 'Partidos', value: 15 },
    { label: 'Minutos jugados', value: "1.726'" },
    { label: 'Valoración', value: 7.9, highlight: true },
    { label: 'Tiros al arco', value: 17 },
    { label: 'Asistencias', value: 1 },
  ],

  clubs: [
    {
      name: 'Estudiantes de La Plata',
      country: 'Argentina',
      years: '2025 — Actualidad',
      logo: escudoEstudiantes,
      titles: ['Torneo Clausura 2025', 'Trofeo de Campeones 2025'],
      info: '',
    },
    {
      name: 'Liga de Quito',
      country: 'Ecuador',
      years: '2020 — 2024',
      logo: escudoLigadequito,
      titles: ['Supercopa Ecuador 2021', 'Serie A Ecuador 2023', 'Copa Sudamericana 2023', 'Serie A Ecuador 2024'],
      info: ['Once ideal de la Copa Sudamericana 2023', 'Mejor volante central de la LigaPro Serie A 2023', 'Once ideal de la LigaPro Serie A 2023', 'Mejor volante defensivo de la LigaPro Serie A 2024', 'Once ideal de la LigaPro Serie A 2024'],
    },
    {
      name: 'Arsenal de Sarandí',
      country: 'Argentina',
      loan: true,
      years: '2019 — 2020',
      logo: escudoArsenal,
      titles: [],
      info: '',
    },
    {
      name: 'Almagro',
      country: 'Argentina',
      years: '2016 — 2020',
      logo: escudoAlmagro,
      titles: [],
      info: '',
    },
    {
      name: 'Fénix',
      country: 'Argentina',
      years: '2015 — 2016',
      logo: escudoFenix,
      titles: [],
      info: '',
    },
    {
      name: 'General Lamadrid',
      country: 'Argentina',
      years: '2014',
      logo: escudoLamadrid,
      titles: [],
      info: '',
    },
    {
      name: 'A.C.R Messina',
      country: 'Italia',
      years: '2013 — 2014',
      logo: escudoMessina,
      titles: [],
      info: '',
    },
  ],

  videos: [
    {
      id: 'v1',
      // instagramId: código del reel. En https://www.instagram.com/reel/DXXXXXXXXXX/ es "DXXXXXXXXXX"
      instagramId: 'DS5j1OFkXzC',
      title: 'Resumen 2025',
      fullTitle: 'Keki Piovi | Jugadas destacadas',
      season: 'Highlights',
      league: 'Temporada 2025',
      thumbnail: image7,
      cover: image12,
      category: 'Highlights',
    },
    {
      id: 'v2',
      instagramId: 'DSi6ZzcETed',
      title: 'Campeonato Estudiantes 2025',
      fullTitle: 'Keki Piovi | Compilado',
      season: 'Campeonato 2025',
      league: 'Campeón Liga Argentina',
      thumbnail: image1,
      cover: image3,
      category: 'Estudiantes',
    },
    {
      id: 'v3',
      instagramId: 'DC2GDxaRMKs',
      title: 'Temporada 2024',
      fullTitle: 'Keki Piovi | Asistencias y Gol',
      season: 'Liga de Quito 2024',
      league: 'Temporada 2024',
      thumbnail: image4,
      cover: image1,
      category: 'Liga de Quito',
    },
  ],

  press: [
    {
      media: 'CONMEBOL Libertadores',
      logo: logo3,
      title: '⚔️🇦🇹 Ezequiel Piovi no duda en jugarse todo por @edelpoficial',
      date: 'Mayo 2026',
      url: 'https://www.instagram.com/p/DX61iBPJehE/?__d=1',
    },
    {
      media: 'Olé',
      logo: logo2,
      title: '⚽ Con mayoría de Liga de Quito, Ezequiel Piovi en el 11 ideal de la LigaPro 2024',
      date: 'Mayo 2024',
      url: 'https://www.ole.com.ar/ecuador/liga-pro/11-once-equipo-ideal-ligapro-2024-liga-quito-pro-gala-alex-arce_0_7b1vsdcSaJ.html#google_vignette',
    },
    {
      media: 'ESPN Deportes',
      logo: logo1,
      title: 'Ezequiel Piovi: el caudillo de Liga de Quito que impulsó al club con su liderazgo y su juego.',
      date: 'Febrero 2024',
      url: 'https://www.espn.com.ar/futbol/nota/_/id/13294198/ezequiel-piovi-el-caudillo-de-liga-de-quito-que-impulso-al-club-con-su-liderazgo',
    },
  ],

  // Galería dividida en categorías (pestañas). El orden de cada lista es el orden en pantalla:
  // la primera foto sale grande en el mosaico. Se muestran 4 y el resto queda tras "Ver más fotos".
  // Para sumar fotos: importar la imagen arriba y agregarla a la categoría que corresponda.
  galleries: [
    {
      key: 'estudiantes',
      name: 'Estudiantes',
      description: 'Partidos con el Pincha desde 2025.',
      photos: [
        { src: image2, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image13, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image3, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image12, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image5, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image4, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image11, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image6, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image9, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image10, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image14, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
      ],
    },
    {
      key: 'entrenamiento',
      name: 'Entrenamiento',
      description: 'Semana de trabajo y entradas en calor.',
      photos: [
        { src: image7, alt: 'Keki Piovi en la entrada en calor antes de un partido' },
      ],
    },
    {
      key: 'clubes',
      name: 'Clubes',
      description: 'Sus etapas anteriores, antes de llegar a La Plata.',
      photos: [
        { src: image1, alt: 'Keki Piovi jugando para Liga de Quito' },
        { src: image8, alt: 'Keki Piovi jugando para Liga de Quito' },
      ],
    },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@kekipiovi18',
      url: 'https://www.instagram.com/kekipiovi18/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '@ezequiel-piovi',
      url: 'https://www.transfermarkt.com.ar/ezequiel-piovi/profil/spieler/487346',
      hoverColor: '#307de1',
    },
  ],

  contact: [
    {
      title: 'Representante Deportivo',
      label: 'Moon Sports Group',
      image: moon,
      handle: '@moonsportsgroup_',
      url: 'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title: 'Contacto Marketing',
      label: 'led sports marketing',
      image: ledsports,
      handle: '@_ledsports',
      url: 'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
