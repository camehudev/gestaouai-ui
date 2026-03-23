import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Isso ensina o Vite que "@" significa a pasta "src"
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
