import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['scripts/api-docs/**/*.test.ts'],
        environment: 'node',
        globals: false
    }
});
