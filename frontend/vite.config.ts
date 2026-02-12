import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsInlineLimit: 0,
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep images at root level, not in assets folder
          if (assetInfo.name && /\.(png|jpe?g|svg|gif|ico)$/i.test(assetInfo.name)) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  publicDir: 'public',
  server: {
    port: 3000,
  },
}); 