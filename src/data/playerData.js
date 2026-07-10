import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'

import argentina from '@assets/argentina.webp'
import universitario from '@assets/escudo_univ.webp'
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

export const playerData = {
  name,
  fullName,
  initials: `${name[0]}${fullName[0]}`, // iniciales para logos (PF)
  displayName: `${name} ${fullName}`,   // nombre completo para textos legales / alt
  number: 21,
  position: 'Mediocampista',
  positionShort: 'MID',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  age: 33,
  height: '1.70m',
  weight: '72kg',
  foot: 'Izquierdo',
  birthDate: '20 / 08 / 1992',
  birthPlace: 'Morón, Buenos Aires, Argentina',
  currentClub: 'Estudiantes de La Plata',
  logoCurrentClub: escudoEstudiantes,
  image: polaco1,


  stats: [
    { label: 'Velocidad', value: 85 },
    { label: 'Pases', value: 69 },
    { label: 'Regate', value: 87 },
    { label: 'Juego Aéreo', value: 75 },
    { label: 'Presión Alta', value: 90 },
    { label: 'Visión de Juego', value: 86 },
  ],

  seasonStats: [
    { label: 'Partidos', value: 14 },
    { label: 'Goles', value: 3 },
    { label: 'Asistencias', value: 1 },
    { label: 'Tiros al árco', value: 26  },
    { label: 'Min / Part.', value: "1,726'" },
    { label: 'Valoración', value: 7.9 },

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
      years: '2016 - 2019',
      logo: escudoArsenal,
      titles: [],
      info: '',
    },
    {
      name: 'Almagro',
      country: 'Argentina',
      years: '2021 — 2022',
      logo: escudoAlmagro,
      titles: [],
      info: '',
    },
    {
      name: 'Fénix',
      country: 'Argentina',
      years: '2015 - 2016',
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
      years: '2013 - 2014',
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
      league: 'Campeon Liga Argentina',
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
      media: 'ESPN Deportes',
      logo: logo1,
      title: 'Lisandro Alzugaray volvió con gol clave para Universitario en CONMEBOL Libertadores',
      date: 'Abril 2026',
      url: 'https://espndeportes.espn.com/futbol/copa-libertadores/nota/_/id/16648033/lisandro-alzugaray-volvio-con-gol-clave-para-universitario-en-conmebol-libertadores',
    },
    {
      media: 'CONMEBOL Libertadores',
      logo: logo3,
      title: '🔥⚽🇵🇪 Un delantero siempre presente en la CONMEBOL #Libertadores: @lisandroalzugaray',
      date: 'Mayo 2026',
      url: 'https://www.instagram.com/p/DYSwt6NDBIC/?hl=es&img_index=4',
    },
    {
      media: 'CONMEBOL Libertadores',
      logo: logo3,
      title: '¡El equipo de la semana! Lisandro Alzugaray en el 11 ideal tras la semifinal de ida de la CONMEBOL #Libertadores.',
      date: 'Octubre 2025',
      url: 'https://x.com/Libertadores/status/1981820492257669422/photo/1?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1981820492257669422%7Ctwgr%5E81681f2548c9342a151787ad10c31eabb903f3c2%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.teleamazonas.com%2Fdeportes%2Ffutbol%2Flibertadores%2Fseis-futbolistas-liga-quito-equipo-ideal-semana-copa-libertadores-105112%2F',
    },
  ],

  gallery: [
    { id: 1, src: image1, alt: 'Francisco Fydriszewski', caption: 'Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Francisco Fydriszewski', caption: 'Festejo ante Racing', category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Francisco Fydriszewski', caption: 'Pretemporada 2025', category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Francisco Fydriszewski', caption: 'Copa Argentina 2024', category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Francisco Fydriszewski', caption: 'Plantel Talleres 2024', category: 'Equipo', aspect: 'wide' },
    { id: 6, src: image6, alt: 'Francisco Fydriszewski', caption: 'Foto oficial 2024', category: 'Retrato', aspect: 'tall' },
    { id: 7, src: image7, alt: 'Francisco Fydriszewski', caption: 'Liga Profesional 2025', category: 'Partido', aspect: 'wide' },
    { id: 8, src: image8, alt: 'Francisco Fydriszewski', caption: 'Copa Sudamericana 2023', category: 'Partido', aspect: 'wide' },
    { id: 9, src: image9, alt: 'Francisco Fydriszewski', caption: 'Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 10, src: image10, alt: 'Francisco Fydriszewski', caption: 'Festejo ante Racing', category: 'Festejo', aspect: 'tall' },
    { id: 11, src: image11, alt: 'Francisco Fydriszewski', caption: 'Pretemporada 2025', category: 'Entrenamiento', aspect: 'square' },
    { id: 12, src: image12, alt: 'Francisco Fydriszewski', caption: 'Copa Argentina 2024', category: 'Partido', aspect: 'wide' },
    { id: 13, src: image13, alt: 'Francisco Fydriszewski', caption: 'Plantel Talleres 2024', category: 'Equipo', aspect: 'wide' },
    { id: 14, src: image14, alt: 'Francisco Fydriszewski', caption: 'Foto oficial 2024', category: 'Retrato', aspect: 'tall' },
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
      hoverColor: 'brand.brownLight',
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
