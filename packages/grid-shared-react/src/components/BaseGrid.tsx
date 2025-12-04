/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useRef, RefObject, useImperativeHandle } from 'react';
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
     * Optional ref to access the grid instance (React 17 compatible)
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

    // Use useImperativeHandle to expose grid instance through gridRef prop (React 17 compatible)
    useImperativeHandle<GridInstance<TOptions> | null, GridInstance<TOptions> | null>(
        gridRef,
        () => currGridRef.current,
        [currGridRef.current]
    );

    return <div ref={containerRef} />;
}
