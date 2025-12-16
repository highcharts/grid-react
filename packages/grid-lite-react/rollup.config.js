import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const isExternal = (id) => [
    'react',
    'react-dom',
    '@highcharts/grid-lite'
].some(pattern => id.startsWith(pattern));

export default [{
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: false,
    },
    external: isExternal,
    plugins: [
        resolve(),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'dist',
            declaration: false,
            declarationMap: false,
            sourceMap: false
        }),
    ]
}, {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.d.ts',
        format: 'esm'
    },
    external: isExternal,
    plugins: [
        dts({
            resolve: true,
            respectExternal: true
        })
    ]
}];
