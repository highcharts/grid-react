/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useRef, RefObject, useEffect, MutableRefObject } from 'react';
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

    useEffect(() => {
        if (gridRef && currGridRef.current) {
            // Type assertion for React 18 compatibility (RefObject.current is read-only in React 18 types)
            (gridRef as MutableRefObject<GridInstance<TOptions> | null>).current = currGridRef.current;
        }
    }, [gridRef, currGridRef]);

    return <div ref={containerRef} />;
}
