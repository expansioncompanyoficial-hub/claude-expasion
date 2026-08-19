/**
 * Embute os arquivos de public/ referenciados em runtime como data URIs,
 * transformando dist-preview/index.html em uma prévia 100% autocontida
 * (expansion-preview.html) que funciona aberta direto do disco.
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(root, 'dist-preview', 'index.html')

const ASSETS = [
  ['/brand/logo-horizontal.webp', 'image/webp'],
  ['/brand/logo-horizontal.png', 'image/png'],
  ['/brand/brand-art.webp', 'image/webp'],
  ['/favicon.svg', 'image/svg+xml'],
]

let html = readFileSync(htmlPath, 'utf8')
for (const [path, mime] of ASSETS) {
  const data = readFileSync(join(root, 'public', path)).toString('base64')
  const uri = `data:${mime};base64,${data}`
  // cobre tanto "./arquivo" (reescrito pelo Vite) quanto "/arquivo"
  html = html.replaceAll(`.${path}`, uri).replaceAll(path, uri)
}

const out = join(root, 'dist-preview', 'expansion-preview.html')
writeFileSync(out, html)
console.log(`prévia autocontida: ${out} (${(html.length / 1024).toFixed(0)} KB)`)
