/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        '@highcharts/grid-lite',
    ],
    noExternal: ['@highcharts/grid-shared-react'],
});
