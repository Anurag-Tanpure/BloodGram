import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      // All /auth/* calls → Spring Boot Auth Service on :8082
      '/auth': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
      // All /donor/* calls → Spring Boot Donor Service on :8083
      '/donor': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
