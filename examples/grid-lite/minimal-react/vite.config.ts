import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@highcharts\/grid-lite(\/.*)?$/,
        replacement: resolve(__dirname, 'node_modules/@highcharts/grid-lite$1')
      }
    ]
  },
  server: {
    port: 3000
  }
});

