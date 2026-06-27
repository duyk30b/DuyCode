import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      (monacoEditorPlugin as any).default({
        languageWorkers: ['editorWorkerService', 'json', 'html', 'typescript', 'css'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'docs',
      emptyOutDir: true,
    },
  }
})
