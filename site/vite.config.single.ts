import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Build de prévia: gera um único index.html autocontido (JS, CSS e fontes
 * embutidos) em dist-preview/. Rode `npm run build:preview` — o passo
 * seguinte (scripts/inline-public.mjs) embute também as imagens de public/.
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2020',
    outDir: 'dist-preview',
    assetsInlineLimit: 100_000_000,
  },
})
