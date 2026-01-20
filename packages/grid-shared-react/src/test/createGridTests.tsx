import { render, waitFor, fireEvent } from '@testing-library/react';
import {
    useRef,
    useState,
    type ForwardRefExoticComponent,
    type RefAttributes
} from 'react';
import { describe, it, expect, vi } from 'vitest';
import { GridProps, GridRefHandle } from '../components/BaseGrid';
import { GridInstance } from '../hooks/useGrid';

/**
 * Creates a standard test suite for a Grid component.
 * Use this to avoid duplicating tests between grid-lite-react and grid-pro-react.
 */
export function createGridTests<TOptions>(
    name: string,
    GridComponent: ForwardRefExoticComponent<
        GridProps<TOptions> & RefAttributes<GridRefHandle<TOptions>>
    >,
    testOptions: TOptions,
    updatedOptions: TOptions
) {

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
                        ref={gridRef}
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

        it('provides grid instance via gridRef prop', async () => {
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

        it('updates grid when options change', async () => {
            let gridInstance: GridInstance<TOptions> | null = null;

            function TestComponent() {
                const [opts, setOpts] = useState(testOptions);

                const onGridReady = (grid: GridInstance<TOptions>) => {
                    gridInstance = grid;
                };

                return (
                    <>
                        <GridComponent options={opts} callback={onGridReady} />
                        <button
                            data-testid="update-options"
                            onClick={() => setOpts(updatedOptions)}
                        >
                            Update
                        </button>
                    </>
                );
            }

            const { getByTestId, container } = render(<TestComponent />);

            // Wait for initial grid creation
            await waitFor(() => {
                expect(gridInstance).not.toBeNull();
            });

            // Trigger options change
            fireEvent.click(getByTestId('update-options'));

            // Wait for the grid to update with new data
            await waitFor(() => {
                const cells = container.querySelectorAll('td[data-value]');
                const values = Array.from(cells).map(c => c.getAttribute('data-value'));
                expect(values).toContain('Charlie');
            });
        });

        it('calls destroy() on unmount', async () => {
            let destroySpy: ReturnType<typeof vi.fn> | null = null;

            const onGridReady = (grid: GridInstance<TOptions>) => {
                destroySpy = vi.spyOn(grid, 'destroy');
            };

            const { unmount } = render(
                <GridComponent options={testOptions} callback={onGridReady} />
            );

            // Wait for grid to initialize
            await waitFor(() => {
                expect(destroySpy).not.toBeNull();
            });

            // Unmount and verify destroy was called
            unmount();

            expect(destroySpy).toHaveBeenCalledTimes(1);
        });

    });
}
