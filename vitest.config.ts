import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        include: ['packages/*/src/**/*.test.{ts,tsx}'],
        globals: true,
        css: true,
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [
                { browser: 'chromium' }
            ],
            headless: true
        }
    }
});
