/* *
 *
 *  Base Grid React Component
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 * */

// 'use strict';

import { useRef } from 'react';
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
export interface BaseGridProps<TOptions> extends GridProps<TOptions> {
    /**
     * Grid instance (from @highcharts/grid-lite or @highcharts/grid-pro)
     */
    Grid: GridType<TOptions>;
}

export function BaseGrid<TOptions>(props: BaseGridProps<TOptions>) {
    const { options, Grid } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useGrid({
        containerRef,
        options,
        Grid
    });

    return <div ref={containerRef} />;
}
