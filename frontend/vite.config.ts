import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Define environment variables available to the app
  define: {
    '__API_URL__': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000/api')
  }
})
