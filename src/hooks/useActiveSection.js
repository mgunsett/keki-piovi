import { useState, useEffect } from 'react'

// Scrollspy: devuelve el href ("#id") de la sección visible en el viewport.
// `hrefs` debe ser una referencia estable (definirla a nivel de módulo).
export function useActiveSection(hrefs) {
  const [active, setActive] = useState(hrefs[0] ?? null)

  useEffect(() => {
    const sections = hrefs
      .map((href) => document.querySelector(href))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      // Banda central del viewport: la sección que la cruza es la activa
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.15, 0.4] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [hrefs])

  return active
}
