import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
  build: {
    // El chunk más grande es Firestore, que se carga de forma diferida
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Vendors en chunks separados: cachean mejor entre deploys
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('firebase')) return // lo resuelven los import() dinámicos
          // El orden importa: '@emotion/react' contiene '/react/' en la ruta
          if (id.includes('@chakra-ui') || id.includes('@emotion')) return 'chakra'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (id.includes('gsap') || id.includes('lenis')) return 'gsap'
          if (/node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react'
        },
      },
    },
  },
})
