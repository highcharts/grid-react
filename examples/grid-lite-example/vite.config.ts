import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@highcharts\/grid-lite(\/.*)?$/,
        replacement: resolve(__dirname, 'node_modules/@highcharts/grid-lite$1')
      },
      {
        find: /^@highcharts\/grid-pro(\/.*)?$/,
        replacement: resolve(__dirname, 'node_modules/@highcharts/grid-pro$1')
      }
    ]
  },
  server: {
    port: 3000
  }
});

