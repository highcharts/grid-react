/* *
 *
 *  Custom hook for Highcharts Grid React wrappers
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 * */

// 'use strict';

import { useEffect, RefObject } from 'react';
import { BaseGridProps } from '../components/BaseGrid';

/**
 * Interface describing the shape of a Grid instance returned by Grid.grid()
 */
export interface GridInstance {
    destroy(): void;
}

/**
 * Interface describing the shape of the Grid class/object
 * This allows grid-shared-react to work with any Grid implementation
 * (e.g., @highcharts/grid-lite or @highcharts/grid-pro) without
 * directly depending on their types.
 */
export interface GridType<TOptions> {
    grid(container: HTMLDivElement, options: TOptions): GridInstance;
}

export interface UseGridOptions<TOptions> extends BaseGridProps<TOptions> {
    containerRef: RefObject<HTMLDivElement | null>;
}

export function useGrid<TOptions>({
    containerRef,
    options,
    Grid,
}: UseGridOptions<TOptions>) {
    useEffect(() => {
        if (!containerRef?.current) {
            return;
        }

        const grid = Grid.grid(containerRef.current, options);

        return () => {
            grid?.destroy();
        };
    }, [options]);
}
