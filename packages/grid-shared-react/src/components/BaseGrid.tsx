/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useRef, useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import {
    useGrid,
    GridType,
    GridInstance
} from '../hooks/useGrid';

/**
 * Ref handle exposed by Grid components
 */
export interface GridRefHandle<TOptions> {
    /**
     * Access to the underlying grid instance
     */
    readonly grid: GridInstance<TOptions> | null;
}

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
    gridRef?: ForwardedRef<GridRefHandle<TOptions>>;
    /**
     * Optional callback to be called when the grid is initialized
     */
    callback?: (grid: GridInstance<TOptions>) => void;
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

export const BaseGrid = forwardRef(function BaseGrid<TOptions>(
    props: BaseGridProps<TOptions>,
    ref: ForwardedRef<GridRefHandle<TOptions>>
) {
    const { options, Grid, callback } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const currGridRef = useGrid({
        containerRef,
        options,
        Grid,
        callback
    });

    useImperativeHandle(
        ref,
        () => ({
            get grid() {
                return currGridRef.current;
            }
        }),
        []
    );

    return <div ref={containerRef} />;
});
