import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // Source maps disabled for smaller bundle + no code disclosure in production
    sourcemap: false,
    // Raise chunk-size warning slightly — data.js is an intentional large asset
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split vendors from app code so the browser caches them separately
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react')) return 'react';
            if (id.includes('pptxgenjs')) return 'pptx';
            return 'vendor';
          }
          // Isolate the big content file so changing the app shell
          // doesn't invalidate the data cache on users' browsers.
          if (id.endsWith('/src/data.js') || id.endsWith('\\src\\data.js')) {
            return 'data';
          }
        },
      },
    },
  },
})
