import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages serves the site at /garnet_web_app/; dev stays at the root.
  base: mode === 'production' ? '/garnet_web_app/' : '/',
  plugins: [react(), tailwindcss()],
}))
