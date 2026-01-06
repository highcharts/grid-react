/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useEffect, RefObject, useRef } from 'react';
import { BaseGridProps } from '../components/BaseGrid';

/**
 * Interface describing the shape of a Grid instance returned by Grid.grid()
 */
export interface GridInstance<TOptions> {
    destroy(): void;
    update(options: TOptions, redraw?: boolean): void;
}

/**
 * Interface describing the shape of the Grid class/object
 * This allows grid-shared-react to work with any Grid implementation
 * (e.g., @highcharts/grid-lite or @highcharts/grid-pro) without
 * directly depending on their types.
 */
export interface GridType<TOptions> {
    grid(container: HTMLDivElement, options: TOptions, async?: boolean): GridInstance<TOptions> | Promise<GridInstance<TOptions>>;
}

export interface UseGridOptions<TOptions> extends BaseGridProps<TOptions> {
    containerRef: RefObject<HTMLDivElement | null>;
}

export function useGrid<TOptions>({
    containerRef,
    options,
    Grid,
    callback
}: UseGridOptions<TOptions>) {
    const currGridRef = useRef<GridInstance<TOptions> | null>(null);
    const isInitializingRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        // Update grid if it already exists
        if (currGridRef.current) {
            currGridRef.current.update(options, true);
            return;
        }

        // Prevent double initialization
        if (isInitializingRef.current) {
            return;
        }

        isInitializingRef.current = true;

        const initGrid = async () => {
            try {
                const grid = await Grid.grid(container, options, true);
                currGridRef.current = grid;
                callback?.(grid);
            } finally {
                isInitializingRef.current = false;
            }
        };

        initGrid();

        return () => {
            currGridRef.current?.destroy();
            currGridRef.current = null;
            isInitializingRef.current = false;
        };
    }, [options, containerRef, Grid]);

    return currGridRef;
}
