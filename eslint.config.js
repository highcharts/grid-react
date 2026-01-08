import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['**/dist/**', '**/build/**'],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'curly': ['error', 'all'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/no-trailing-spaces': ['error']
        },
    },
    {
        files: ['scripts/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
);
