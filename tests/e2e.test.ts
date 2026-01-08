/**
 * E2E tests for demo applications.
 * These tests start the actual demo servers and verify the grid renders.
 * Run with: pnpm test:e2e
 */
import { test, expect } from 'vitest';
import { chromium, Browser, Page } from 'playwright';
import { spawn, ChildProcess } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

interface DemoServer {
    name: string;
    cwd: string;
    port: number;
    args: string[];
    process?: ChildProcess;
}

const demos: DemoServer[] = [
    {
        name: 'grid-pro React (Vite)',
        cwd: resolve(rootDir, 'examples/grid-pro/minimal-react'),
        port: 51731,
        args: ['dev', '--port', '51731', '--strictPort']
    },
    {
        name: 'grid-pro Next.js',
        cwd: resolve(rootDir, 'examples/grid-pro/minimal-nextjs'),
        port: 51732,
        args: ['dev', '--port', '51732']
    }
];

async function waitForServer(port: number, timeout = 30000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            const response = await fetch(`http://localhost:${port}`);
            if (response.ok) return;
        } catch {
            // Server not ready yet
        }
        await new Promise(r => setTimeout(r, 500));
    }
    throw new Error(`Server on port ${port} did not start within ${timeout}ms`);
}

function startServer(demo: DemoServer): ChildProcess {
    const proc = spawn('pnpm', demo.args, {
        cwd: demo.cwd,
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: true,
        detached: false
    });

    proc.stdout?.on('data', (data) => {
        console.log(`[${demo.name}] ${data}`);
    });

    proc.stderr?.on('data', (data) => {
        console.error(`[${demo.name}] ${data}`);
    });

    return proc;
}

let browser: Browser;
let servers: ChildProcess[] = [];

test.beforeAll(async () => {
    // Start all demo servers
    for (const demo of demos) {
        console.log(`Starting ${demo.name} at ${demo.cwd}...`);
        demo.process = startServer(demo);
        servers.push(demo.process);
    }

    // Wait for all servers to be ready
    console.log('Waiting for servers to be ready...');
    await Promise.all(demos.map(d => waitForServer(d.port)));
    console.log('All servers ready');

    // Launch browser
    browser = await chromium.launch({ headless: true });
}, 90000);

test.afterAll(async () => {
    await browser?.close();

    // Kill all servers
    for (const server of servers) {
        server.kill('SIGTERM');
    }
});

for (const demo of demos) {
    test(`${demo.name}: renders grid with data`, async () => {
        const page: Page = await browser.newPage();

        try {
            await page.goto(`http://localhost:${demo.port}`);

            // Wait for grid table to appear
            await page.waitForSelector('table', { timeout: 10000 });

            // Verify data is rendered - wait for text to be visible
            await page.locator('text=Alice').waitFor({ state: 'visible', timeout: 5000 });
            await page.locator('text=Bob').waitFor({ state: 'visible', timeout: 5000 });

            // Verify grid structure exists
            const cells = await page.locator('td').count();
            expect(cells).toBeGreaterThan(0);
        } finally {
            await page.close();
        }
    }, 30000);
}
