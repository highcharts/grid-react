/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import React, { useRef } from 'react';
import {
    useGrid,
    GridType
} from '../hooks/useGrid';

/**
 * Props for Grid component
 */
export interface GridProps<TOptions> {
    /**
     * Grid configuration options
     */
    options: TOptions;
}

/**
 * Props for BaseGrid component
 */
export interface BaseGridProps<TOptions, TGrid extends GridType<TOptions> = GridType<TOptions>> extends GridProps<TOptions> {
    /**
     * Grid instance (from @highcharts/grid-lite or @highcharts/grid-pro)
     */
    Grid: TGrid;
}

export function BaseGrid<TOptions, TGrid extends GridType<TOptions> = GridType<TOptions>>(props: BaseGridProps<TOptions, TGrid>) {
    const { options, Grid } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useGrid({
        containerRef,
        options,
        Grid
    });

    return (
        <div
            ref={containerRef}
        />
    );
}
