/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useRef, RefObject, useEffect } from 'react';
import {
    useGrid,
    GridType,
    GridInstance
} from '../hooks/useGrid';

/**
 * Props for Grid component
 */
export interface GridProps<TOptions> {
    /**
     * Grid configuration options
     */
    options: TOptions;
    /**
     * Optional ref to access the grid instance
     */
    gridRef?: RefObject<GridInstance<TOptions> | null>;
}

/**
 * Props for BaseGrid component
 */
export interface BaseGridProps<TOptions> extends GridProps<TOptions> {
    /**
     * Grid instance (from @highcharts/grid-lite or @highcharts/grid-pro)
     */
    Grid: GridType<TOptions>;
}

export function BaseGrid<TOptions>(props: BaseGridProps<TOptions>) {
    const { options, Grid, gridRef } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const { currGridRef } = useGrid({
        containerRef,
        options,
        Grid
    });

    // Synchronize external gridRef with internal gridRef
    // Run on every render to check if grid is ready, but only update when grid exists
    useEffect(() => {
        if (gridRef && 'current' in gridRef) {
            gridRef.current = currGridRef.current;
        }
    }); // No dependency array - runs on every render to sync ref when grid is ready

    return <div ref={containerRef} />;
}
