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
    port: 5173,
    hmr: {
      host: '0.0.0.0'
    },
    allowedHosts: [
      '92cf39d7-48d9-4fa1-82f9-0192f2e3545a-00-o8wi3egusfbz.janeway.replit.dev',
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
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
});
