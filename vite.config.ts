import { config } from './node_modules/rxjs/src/internal/config';
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    pugPlugin(<any>{
      pretty: true,
      compilerOptions: {},
    }),
    quasar({
      sassVariables: fileURLToPath(
        new URL('./playground/quasar-variables.sass', import.meta.url)
      ),
    })
  ],
  root: './playground',
  build: {
    outDir: '../dist-playground',
  },
})
