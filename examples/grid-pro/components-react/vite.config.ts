import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        // Exact match — string aliases are prefix-based and break subpath ids.
        find: /^@highcharts\/grid-pro-react$/,
        replacement: resolve(__dirname, '../../../packages/grid-pro-react/src/index.ts')
      },
      {
        find: /^@highcharts\/grid-shared-react$/,
        replacement: resolve(__dirname, '../../../packages/grid-shared-react/src/index.ts')
      },
      {
        find: /^@highcharts\/grid-pro(\/.*)?$/,
        replacement: resolve(__dirname, 'node_modules/@highcharts/grid-pro$1')
      }
    ]
  },
  server: {
    host: true,
    port: 3002
  }
});
