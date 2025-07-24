import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, './src/config'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/shared/models'),
      '@schemas': path.resolve(__dirname, './src/shared/validationSchemas'),
      '@services': path.resolve(__dirname, './src/shared/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
    },
  },
  plugins: [react(), tailwindcss()],
});
