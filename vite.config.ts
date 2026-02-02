import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Use base path only for production (GitHub Pages)
  base: command === 'build' ? '/agent-notes/' : '/',
}))
