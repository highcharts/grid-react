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
    grid(container: HTMLDivElement, options: TOptions): GridInstance<TOptions>;
}

export interface UseGridOptions<TOptions> extends BaseGridProps<TOptions> {
    containerRef: RefObject<HTMLDivElement | null>;
}

export function useGrid<TOptions>({
    containerRef,
    options,
    Grid,
}: UseGridOptions<TOptions>) {
    const currGridRef = useRef<GridInstance<TOptions> | null>(null);

    useEffect(() => {
        if (!containerRef?.current) {
            return;
        } else if (currGridRef.current) {
            currGridRef.current?.update(options, true);
        } else {
            currGridRef.current = Grid.grid(containerRef.current, options);
        }
    }, [options]);

    useEffect(() => {
        return () => {
            if (currGridRef.current) {
                currGridRef.current.destroy();
                currGridRef.current = null;
            }
        };
    }, []);

    return { currGridRef };
}
