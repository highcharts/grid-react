/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

/**
 * Metadata attached to declarative option components
 * rendered as BaseGrid children.
 */
export interface BaseGridOptions {
    type: 'Grid_Option';
    /**
     * Dot-notation path of the Grid option (e.g. `caption`).
     */
    gridOption: string;
    /**
     * Sub-option that receives string children (e.g. `text`).
     */
    childOption?: string;
    defaultOptions?: Record<string, unknown>;
    isArrayType?: boolean;
}

/**
 * A React component that maps JSX props to a Grid options path
 * via `_GridReact`.
 */
export interface BaseGridOptionsComponent {
    _GridReact: BaseGridOptions;
}
