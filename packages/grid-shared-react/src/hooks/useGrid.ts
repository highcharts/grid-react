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
    const callbackRef = useRef(callback);
    const pendingOptionsRef = useRef<TOptions | null>(null);
    const initStartedRef = useRef(false);

    // Keep callback ref in sync
    callbackRef.current = callback;

    // Effect for initialization - only depends on container and Grid
    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        // Prevent double initialization
        if (initStartedRef.current || currGridRef.current) {
            return;
        }
        initStartedRef.current = true;

        // Track if this effect has been cleaned up to handle race conditions
        let isCleanedUp = false;

        const initGrid = async () => {
            try {
                // Use pending options if available (from rapid updates during init)
                const initOptions = pendingOptionsRef.current ?? options;
                pendingOptionsRef.current = null;

                const grid = await Grid.grid(container, initOptions, true);

                if (isCleanedUp) {
                    // Component unmounted while we were initializing - destroy immediately
                    grid.destroy();
                    return;
                }

                currGridRef.current = grid;

                // Apply any pending options that came in while we were initializing
                if (pendingOptionsRef.current) {
                    grid.update(pendingOptionsRef.current, true);
                    pendingOptionsRef.current = null;
                }

                callbackRef.current?.(grid);
            } catch (error) {
                // Re-throw unless we've been cleaned up (component unmounted)
                if (!isCleanedUp) {
                    throw error;
                }
            }
        };

        initGrid();

        return () => {
            isCleanedUp = true;
            initStartedRef.current = false;
            if (currGridRef.current) {
                currGridRef.current.destroy();
                currGridRef.current = null;
            }
        };
    }, [containerRef, Grid]);

    // Effect for options updates - separate from init
    useEffect(() => {
        if (currGridRef.current) {
            // Grid exists, update it directly
            currGridRef.current.update(options, true);
        } else {
            // Grid still initializing, queue the update
            pendingOptionsRef.current = options;
        }
    }, [options]);

    return currGridRef;
}
