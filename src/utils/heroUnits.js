// Unidad de diseño del Hero, independiente del zoom del navegador.
//
// `--hu` equivale a 1px de diseño expresado en unidades de viewport (vw/vh).
// Con zoom el viewport en px CSS cambia en la misma proporción que los px,
// así que todo lo que se mida con u() mantiene su tamaño físico en pantalla.
//
// Referencias (ancho de diseño por layout): en esos anchos u(n) === n px.
// Desktop usa UNA sola referencia (1440) para todo lg+: el zoom mueve el ancho
// CSS entre breakpoints (1440 al 125% = 1152), y una referencia distinta por
// breakpoint haría saltar los tamaños. Por eso en pantallas más chicas o más
// grandes los textos escalan en proporción, igual que el nombre (13vw).
// Alto estable del Hero en mobile: --sv = 1svh (alto con la barra del navegador visible).
// No cambia cuando Chrome/Safari muestran u ocultan la barra al hacer scroll, así que la
// foto y los textos no se reacomodan. Fallback: 1vh en navegadores sin svh.
export const SV_VARS = { '--sv': '1vh', '@supports (height: 1svh)': { '--sv': '1svh' } }

export const u = (n) => `calc(${n} * var(--hu))`

// Celular en horizontal (o ventanas muy bajas): layout compacto tipo desktop
export const LANDSCAPE = '@media (orientation: landscape) and (max-height: 540px)'

const ref = (w) => `${+(100 / w).toFixed(5)}vw`

export const heroUnitVars = {
  '--hu': ref(390),                                       // mobile  (base)
  '@media screen and (min-width: 48em)': { '--hu': ref(820) },  // tablet  (md)
  '@media screen and (min-width: 62em)': { '--hu': ref(1440) }, // desktop (lg+)
  // En horizontal manda el alto (alto estable --sv, ver Hero): 1px de diseño = 1px en una pantalla de 390 de alto
  [LANDSCAPE]: { '--hu': `calc(${+(100 / 390).toFixed(5)} * var(--sv, 1vh))` },
}
