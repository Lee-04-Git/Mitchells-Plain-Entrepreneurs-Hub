import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The only chunk over Vite's 500 kB default is MedalScene (three.js, ~263 kB gzip):
    // it's lazy, desktop/tablet-only, and loads after the page is idle — expected, not a regression.
    chunkSizeWarningLimit: 1000,
  },
})
