import { render, waitFor } from '@testing-library/react';
import { useRef, ComponentType } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { GridProps, GridRefHandle } from '../components/BaseGrid';
import { GridInstance } from '../hooks/useGrid';

interface TestOptions {
    dataTable: {
        columns: Record<string, unknown[]>;
    };
}

/**
 * Creates a standard test suite for a Grid component.
 * Use this to avoid duplicating tests between grid-lite-react and grid-pro-react.
 */
export function createGridTests<TOptions extends TestOptions>(
    name: string,
    GridComponent: ComponentType<GridProps<TOptions>>
) {
    const testOptions = {
        dataTable: {
            columns: {
                name: ['Alice', 'Bob'],
                age: [30, 25]
            }
        }
    } as TOptions;

    describe(name, () => {
        it('renders a container div and initializes grid', async () => {
            let gridInstance: GridInstance<TOptions> | null = null;

            const onGridReady = (grid: GridInstance<TOptions>) => {
                gridInstance = grid;
            };

            const { container } = render(
                <GridComponent options={testOptions} callback={onGridReady} />
            );

            expect(container.firstChild).toBeInstanceOf(HTMLDivElement);

            await waitFor(() => {
                expect(gridInstance).not.toBeNull();
            });
        });

        it('provides grid instance via ref', async () => {
            let gridRef: React.RefObject<GridRefHandle<TOptions> | null>;
            let initialized = false;

            function TestComponent() {
                gridRef = useRef<GridRefHandle<TOptions>>(null);
                return (
                    <GridComponent
                        options={testOptions}
                        gridRef={gridRef}
                        callback={() => { initialized = true; }}
                    />
                );
            }

            render(<TestComponent />);

            await waitFor(() => {
                expect(initialized).toBe(true);
                expect(gridRef.current?.grid).toBeDefined();
            });
        });

        it('calls callback when grid is initialized', async () => {
            const callback = vi.fn();
            render(<GridComponent options={testOptions} callback={callback} />);

            await waitFor(() => {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
}
