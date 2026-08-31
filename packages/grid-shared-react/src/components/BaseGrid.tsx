/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useRef, useImperativeHandle, forwardRef, ForwardedRef, ReactNode } from 'react';
import {
    useGrid,
    GridType,
    GridInstance
} from '../hooks/useGrid';

/**
 * Ref handle exposed by Grid components.
 */
export interface GridRefHandle<TOptions> {
    /**
     * Access to the underlying grid instance.
     */
    readonly grid: GridInstance<TOptions> | null;
}

/**
 * Props for the Grid component.
 */
export interface GridProps<TOptions> {
    /**
     * Grid options object. Merged with options from child
     * components.
     *
     * Links to Grid.Options
     */
    options?: TOptions;
    /**
     * Optional CSS class names on the React mount container (parent of
     * `.hcg-container`). Independent of `theme`.
     */
    className?: string;
    /**
     * Optional CSS class names mapped to Core `rendering.table.className` on
     * `.hcg-table`. Independent of `className` / `theme`.
     *
     * Links to Grid.Options.rendering.table.className
     */
    tableClassName?: string;
    /**
     * Omitted uses the Core default (`hcg-theme-default`). An empty string
     * disables the theme.
     *
     * Links to Grid.Options.rendering.theme
     */
    theme?: string;
    /**
     * Declarative option components (e.g. Caption) passed as children.
     */
    children?: ReactNode;
    /**
     * Ref to access the grid instance.
     */
    gridRef?: ForwardedRef<GridRefHandle<TOptions>>;
    /**
     * Callback to be called when the grid is initialized.
     */
    callback?: (grid: GridInstance<TOptions>) => void;
}

/**
 * Props for BaseGrid component
 */
export interface BaseGridProps<TOptions> {
    options?: TOptions;
    Grid: GridType<TOptions>;
    callback?: (grid: GridInstance<TOptions>) => void;
    className?: string;
}

export const BaseGrid = forwardRef(function BaseGrid<TOptions>(
    props: BaseGridProps<TOptions>,
    ref: ForwardedRef<GridRefHandle<TOptions>>
) {
    const { options, Grid, callback, className } = props;
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

    return <div ref={containerRef} className={className} />;
});
