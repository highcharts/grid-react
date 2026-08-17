/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

export type ColumnDataType = 'string' | 'number' | 'boolean' | 'datetime';

export type ColumnSortingOrder = 'asc' | 'desc' | null;

/**
 * `this` context passed to `cellValueGetter` by Grid Core.
 */
export interface CellValueGetterContext {
    row: {
        index: number;
    };
}

/**
 * Shared column options (`columnDefaults` and per-column overrides).
 */
export interface ColumnOptionsProps {
    dataType?: ColumnDataType;
    width?: number | string;
    sortingEnabled?: boolean;
    sortingOrder?: ColumnSortingOrder;
    sortingPriority?: number;
    sortingOrderSequence?: ColumnSortingOrder[];
    sortingCompare?: (a: unknown, b: unknown) => number;
    filteringEnabled?: boolean;
    filteringInline?: boolean;
    filteringCondition?: string;
    filteringValue?: string | number | boolean | null;
    headerClassName?: string;
    headerFormat?: string;
    headerFormatter?: (this: unknown) => string;
    headerStyle?: unknown;
    cellRowHeader?: boolean;
    cellClassName?: string;
    cellFormat?: string;
    cellFormatter?: (this: unknown) => string;
    /**
     * Custom cell value resolver. `this` is the Grid table cell (`row.index`
     * is the row index in the presentation data).
     */
    cellValueGetter?: (this: CellValueGetterContext) => unknown;
    cellContextMenu?: {
        enabled?: boolean;
        items?: unknown[];
    };
    cellStyle?: unknown;
    style?: unknown;
    exportable?: boolean;
}

export interface ColumnProps extends ColumnOptionsProps {
    /**
     * HTML `id` attribute for styling hooks. Not passed to Grid options.
     */
    id?: string;
    /**
     * References the column to configure (data field id). Maps header, cells,
     * sorting, filtering, etc. to Grid Core column options.
     *
     * Becomes `options.columns[].id` in Grid Core (same identifier).
     */
    columnId?: string;
    className?: string;
    enabled?: boolean;
}
