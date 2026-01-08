import { render, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, it, expect } from 'vitest';
import { BaseGrid } from '../components/BaseGrid';
import type { GridType, GridInstance } from './useGrid';

type TestOptions = { label?: string };

interface DeferredInit {
    id: number;
    resolve: () => Promise<void>;
}

function createDeferredGrid(initQueue: DeferredInit[]): GridType<TestOptions> {
    let nextId = 0;

    return {
        grid(container, _options, async) {
            const id = ++nextId;
            const grid: GridInstance<TestOptions> = {
                destroy: () => {
                    container.innerHTML = '';
                },
                update: () => {}
            };

            if (!async) {
                container.innerHTML = `<div data-grid-id="${id}">grid</div>`;
                return grid;
            }

            return new Promise((resolve) => {
                const resolveInit = async () => {
                    container.innerHTML = `<div data-grid-id="${id}">grid</div>`;
                    resolve(grid);
                    await Promise.resolve();
                };

                initQueue.push({
                    id,
                    resolve: resolveInit
                });
            });
        }
    };
}

describe('useGrid', () => {
    it('keeps the active grid when StrictMode double-inits', async () => {
        const initQueue: DeferredInit[] = [];
        const Grid = createDeferredGrid(initQueue);

        const { container } = render(
            <StrictMode>
                <BaseGrid options={{}} Grid={Grid} />
            </StrictMode>
        );

        await waitFor(() => {
            expect(initQueue).toHaveLength(1);
        });

        const [firstInit] = initQueue;

        await firstInit.resolve();

        await waitFor(() => {
            expect(container.querySelector('[data-grid-id="1"]')).not.toBeNull();
        });
    });
});
