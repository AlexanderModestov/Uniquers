import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'react-hook-form'],
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    hmr: {
      port: 5174,
      host: 'localhost'
    },
    allowedHosts: [
      '19029bb6-96d3-4e3f-a70d-891fb196e9b8-00-38lckmsbikts5.spock.replit.dev',
      'uniquers-aleksandrmodest.replit.app',
      'uniquers.us',
      'all'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    },
    middlewareMode: false
  },
  preview: {
    host: '0.0.0.0',
    port: 5174
  }
});