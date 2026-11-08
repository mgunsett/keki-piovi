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
import image15 from '@assets/libertadores/remate-maracana.webp'
import image16 from '@assets/gallery/image16.webp'
import image17 from '@assets/gallery/image17.webp'
import image18 from '@assets/gallery/image18.webp'
import image19 from '@assets/gallery/image19.webp'
import image20 from '@assets/gallery/image20.webp'
import image21 from '@assets/gallery/image21.webp'
import image22 from '@assets/gallery/image22.webp'
import image23 from '@assets/gallery/image23.webp'
import image24 from '@assets/gallery/image24.webp'
import image25 from '@assets/gallery/image25.webp'
import image26 from '@assets/gallery/image26.webp'
import image27 from '@assets/gallery/image27.webp'
import image28 from '@assets/gallery/image28.webp'
import image29 from '@assets/gallery/image29.webp'
import image30 from '@assets/gallery/image30.webp'
import image31 from '@assets/gallery/image31.webp'
import image32 from '@assets/gallery/image32.webp'
import image33 from '@assets/gallery/image33.webp'
import image34 from '@assets/gallery/image34.webp'
import image35 from '@assets/gallery/image35.webp'
import image36 from '@assets/gallery/image36.webp'
import image37 from '@assets/gallery/image37.webp'
import image38 from '@assets/gallery/image38.webp'
import image39 from '@assets/gallery/image39.webp'
import image40 from '@assets/gallery/image40.webp'
import image41 from '@assets/gallery/image41.webp'
import image42 from '@assets/gallery/image42.webp'
import image43 from '@assets/gallery/image43.webp'
import image44 from '@assets/gallery/image44.webp'
import image45 from '@assets/gallery/image45.webp'
import image46 from '@assets/gallery/image46.webp'
import image47 from '@assets/gallery/image47.webp'
import image48 from '@assets/gallery/image48.webp'
import image49 from '@assets/gallery/image49.webp'
import image50 from '@assets/gallery/image50.webp'
import image51 from '@assets/gallery/image51.webp'
import image52 from '@assets/gallery/image52.webp'
import image53 from '@assets/gallery/image53.webp'
import image54 from '@assets/gallery/image54.webp'
import image55 from '@assets/gallery/image55.webp'
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
      id: 'v0',
      instagramId: 'DejbgvYCU51',
      title: 'Libertadores 2026',
      fullTitle: 'Keki Piovi | Jugadas destacadas',
      season: 'Copa Libertadores 2026',
      league: 'Temporada 2026',
      thumbnail: image2,
      cover: image15,
      category: 'Highlights', 
    },
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
      type: 'Publicación',
      title: 'Ezequiel Piovi no duda en jugarse todo por Estudiantes',
      date: 'Mayo 2026',
      url: 'https://www.instagram.com/p/DX61iBPJehE/',
    },
    {
      media: 'Olé',
      logo: logo2,
      type: 'Nota',
      title: 'Con mayoría de Liga de Quito, Ezequiel Piovi en el 11 ideal de la LigaPro 2024',
      date: 'Mayo 2024',
      url: 'https://www.ole.com.ar/ecuador/liga-pro/11-once-equipo-ideal-ligapro-2024-liga-quito-pro-gala-alex-arce_0_7b1vsdcSaJ.html',
    },
    {
      media: 'ESPN',
      logo: logo1,
      type: 'Nota',
      title: 'Ezequiel Piovi: el caudillo de Liga de Quito que impulsó al club con su liderazgo y su juego',
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
        { src: image16, alt: 'Keki Piovi controla la pelota en el clásico ante Gimnasia' },
        { src: image17, alt: 'Keki Piovi conduce la pelota en un partido de Copa Libertadores', pos: '40% center' },
        { src: image20, alt: 'Keki Piovi, de espaldas con la 21, saluda al entrenador tras un partido', pos: 'center 22%' },
        { src: image55, alt: 'Keki Piovi entre el humo de la tribuna en un partido de Estudiantes', pos: 'center 35%' },
        { src: image50, alt: 'Keki Piovi le pega de volea ante Boca con la tribuna de Estudiantes de fondo', pos: '62% 40%' },
        { src: image2, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image45, alt: 'Keki Piovi junto a la pelota en un partido ante River', pos: '44% center' },
        { src: image13, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image22, alt: 'Formación titular de Estudiantes en la Copa Libertadores' },
        { src: image53, alt: 'Keki Piovi llega al estadio con la delegación de Estudiantes', pos: '48% 30%' },
        { src: image18, alt: 'Keki Piovi encara ante Corinthians por la Copa Libertadores', pos: '60% center' },
        { src: image3, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image21, alt: 'Keki Piovi festeja con sus compañeros de Estudiantes', pos: 'center 35%' },
        { src: image46, alt: 'Keki Piovi da indicaciones antes de un tiro libre ante River', pos: 'center 40%' },
        { src: image12, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image54, alt: 'Keki Piovi sonríe al llegar al estadio con el mate en la mano', pos: 'center 22%' },
        { src: image19, alt: 'Keki Piovi con la pelota en un partido de la Liga Profesional', pos: '45% center' },
        { src: image5, alt: 'Keki Piovi jugando para Estudiantes de La Plata' },
        { src: image23, alt: 'Keki Piovi en una pausa del partido con la camiseta de Estudiantes', pos: '42% center' },
        { src: image24, alt: 'Keki Piovi de espaldas con la 21 frente a la tribuna de Estudiantes' },
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
        { src: image49, alt: 'Keki Piovi sonríe durante la entrada en calor de Estudiantes', pos: '64% center' },
        { src: image25, alt: 'Keki Piovi en la entrada en calor con el plantel de Estudiantes', pos: 'center 4%' },
        { src: image26, alt: 'Keki Piovi sonríe durante la entrada en calor', pos: 'center 25%' },
        { src: image47, alt: 'Keki Piovi elonga junto al plantel antes de un partido', pos: 'center 35%' },
        { src: image52, alt: 'Keki Piovi trota en la entrada en calor con la remera de Estudiantes', pos: 'center 20%' },
        { src: image48, alt: 'Keki Piovi le pega a la pelota en la entrada en calor', pos: '50% center' },
        { src: image51, alt: 'Keki Piovi toca la pelota en la entrada en calor', pos: '52% center' },
        { src: image7, alt: 'Keki Piovi en la entrada en calor antes de un partido', pos: 'center 30%' },
      ],
    },
    {
      key: 'clubes',
      name: 'Clubes',
      description: 'Sus etapas anteriores, antes de llegar a La Plata.',
      photos: [
        { src: image34, alt: 'Keki Piovi levanta la Copa Sudamericana 2023 con Liga de Quito', pos: 'center 15%' },
        { src: image35, alt: 'Keki Piovi festeja un gol con la camiseta de Liga de Quito', pos: '50% center' },
        { src: image36, alt: 'Keki Piovi con la camiseta y la cinta de capitán de Liga de Quito', pos: 'center 20%' },
        { src: image44, alt: 'Keki Piovi encabeza la salida de Liga de Quito al campo del estadio Rodrigo Paz Delgado' },
        { src: image33, alt: 'Keki Piovi con el trofeo de la Copa Sudamericana 2023 ganada con Liga de Quito', pos: 'center 12%' },
        { src: image37, alt: 'Keki Piovi sale del túnel con Liga de Quito en la Copa Libertadores', pos: '55% center' },
        { src: image38, alt: 'Keki Piovi con la camiseta alternativa de Liga de Quito antes de un partido', pos: 'center 22%' },
        { src: image40, alt: 'Keki Piovi con la cinta de capitán de Liga de Quito', pos: 'center 35%' },
        { src: image39, alt: 'Keki Piovi conduce ante Fluminense en el Maracaná con Liga de Quito', pos: 'center 40%' },
        { src: image41, alt: 'Keki Piovi conduce la pelota con la camiseta negra de Liga de Quito', pos: '42% center' },
        { src: image43, alt: 'Keki Piovi se prepara para patear un córner con Liga de Quito', pos: '55% center' },
        { src: image1, alt: 'Keki Piovi jugando para Liga de Quito' },
        { src: image8, alt: 'Keki Piovi jugando para Liga de Quito' },
        { src: image42, alt: 'Keki Piovi conduce la pelota en un partido de Liga de Quito', pos: 'center 40%' },
        { src: image32, alt: 'Keki Piovi con la camiseta de Almagro', pos: 'center 30%' },
        { src: image31, alt: 'Keki Piovi con la camiseta de Almagro', pos: 'center 22%' },
        { src: image29, alt: 'Keki Piovi jugando para Arsenal de Sarandí', pos: 'center 25%' },
        { src: image30, alt: 'Keki Piovi jugando para Arsenal de Sarandí', pos: 'center 25%' },
        { src: image27, alt: 'Keki Piovi en sus comienzos en el ascenso argentino', pos: 'center 60%' },
        { src: image28, alt: 'Keki Piovi en sus comienzos en el ascenso argentino', pos: 'center 60%' },
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
      title: 'Representación deportiva',
      label: 'Moon Sports Group',
      image: moon,
      handle: '@moonsportsgroup_',
      forWhom: 'clubes, intermediarios y propuestas deportivas',
      cta: 'Escribir a Moon Sports Group',
      url: 'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title: 'Marketing y Gestión',
      label: 'LED Sports Marketing',
      image: ledsports,
      handle: '@_ledsports',
      forWhom: 'marcas, campañas, eventos y prensa',
      cta: 'Escribir a LED Sports',
      url: 'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
