import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/assets/acs_legal/frontend/',
  build: {
    outDir: '../acs_legal/public/frontend',
    emptyOutDir: true,
  },
});
