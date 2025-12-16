// import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [{
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: false,
    },
    external: (id) => [
        'react',
        'react-dom'
    ].some(pattern => id.startsWith(pattern)),
    plugins: [
        resolve(),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'dist',
            declarationMap: false,
            sourceMap: false
        }),
    ]
}];
