import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` makes the build use relative paths so it works
// regardless of where you upload it on Hostinger (root or subfolder).
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
