import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: './playground',
  build: {
    outDir: '../dist-playground'
  }
})
