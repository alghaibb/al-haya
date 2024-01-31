/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: (import.meta as any).env.VITE_SERVER_URL || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
