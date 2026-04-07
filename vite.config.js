import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo name on GitHub — used as base path for GitHub Pages.
const REPO = 'Portfolio'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${REPO}/` : '/',
  server: { port: 5173, open: true }
}))
