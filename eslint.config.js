import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig(
    {
        ignores: [
            '**/dist/**',
            '**/build/**',
            '**/.next/**',
            '**/node_modules/**'
        ],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            '@stylistic': stylistic,
            'react-hooks': reactHooks,
        },
        rules: {
            'curly': ['error', 'all'],
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_'
            }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/no-trailing-spaces': ['error'],
            '@stylistic/max-len': ['error', {
                code: 80,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }],
            // Core hooks rules (skip React Compiler suite from flat.recommended).
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        files: ['scripts/**/*.{js,ts}', '**/next.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
);
