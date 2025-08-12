// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['hirrd-2.onrender.com'], // ✅ Add your Render domain here
  }
})
