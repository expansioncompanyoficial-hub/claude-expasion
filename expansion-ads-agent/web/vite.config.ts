import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Em desenvolvimento o frontend roda separado; a API continua sendo a
    // unica que fala com a Meta. O navegador nunca chama graph.facebook.com.
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
  build: { outDir: 'dist', sourcemap: false, target: 'es2022' },
});
