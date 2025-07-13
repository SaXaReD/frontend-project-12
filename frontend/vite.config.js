import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5001',
        changeOrigin: false,
        secure: false,
      },
      '/socket.io': {
        target: 'ws://0.0.0.0:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
