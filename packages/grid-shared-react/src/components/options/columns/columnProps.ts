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
    /**
     * Links to Grid.Options.columnDefaults.dataType
     */
    dataType?: ColumnDataType;
    /**
     * Links to Grid.Options.columnDefaults.width
     */
    width?: number | string;
    /**
     * Links to Grid.Options.columnDefaults.sorting.enabled
     */
    sortingEnabled?: boolean;
    /**
     * Links to Grid.Options.columns.sorting.order
     */
    sortingOrder?: ColumnSortingOrder;
    /**
     * Links to Grid.Options.columns.sorting.priority
     */
    sortingPriority?: number;
    /**
     * Links to Grid.Options.columnDefaults.sorting.orderSequence
     */
    sortingOrderSequence?: ColumnSortingOrder[];
    /**
     * Links to Grid.Options.columnDefaults.sorting.compare
     */
    sortingCompare?: (a: unknown, b: unknown) => number;
    /**
     * Links to Grid.Options.columnDefaults.filtering.enabled
     */
    filteringEnabled?: boolean;
    /**
     * Links to Grid.Options.columnDefaults.filtering.inline
     */
    filteringInline?: boolean;
    /**
     * Links to Grid.Options.columnDefaults.filtering.condition
     */
    filteringCondition?: string;
    /**
     * Links to Grid.Options.columnDefaults.filtering.value
     */
    filteringValue?: string | number | boolean | null;
    /**
     * Links to Grid.Options.columnDefaults.header.className
     */
    headerClassName?: string;
    /**
     * Links to Grid.Options.columnDefaults.header.format
     */
    headerFormat?: string;
    /**
     * Links to Grid.Options.columnDefaults.header.formatter
     */
    headerFormatter?: (this: unknown) => string;
    /**
     * Links to Grid.Options.columnDefaults.header.style
     */
    headerStyle?: unknown;
    /**
     * Links to Grid.Options.columnDefaults.cells.rowHeader
     */
    cellRowHeader?: boolean;
    /**
     * Links to Grid.Options.columnDefaults.cells.className
     */
    cellClassName?: string;
    /**
     * Links to Grid.Options.columnDefaults.cells.format
     */
    cellFormat?: string;
    /**
     * Links to Grid.Options.columnDefaults.cells.formatter
     */
    cellFormatter?: (this: unknown) => string;
    /**
     * Custom cell value resolver. `this` is the Grid table cell (`row.index`
     * is the row index in the presentation data).
     *
     * Links to Grid.Options.columnDefaults.cells.valueGetter
     */
    cellValueGetter?: (this: CellValueGetterContext) => unknown;
    /**
     * Links to Grid.Options.columnDefaults.cells.contextMenu
     */
    cellContextMenu?: {
        enabled?: boolean;
        items?: unknown[];
    };
    /**
     * Links to Grid.Options.columnDefaults.cells.style
     */
    cellStyle?: unknown;
    /**
     * Links to Grid.Options.columnDefaults.style
     */
    style?: unknown;
    /**
     * Links to Grid.Options.columnDefaults.exportable
     */
    exportable?: boolean;
}

export interface ColumnProps extends ColumnOptionsProps {
    /**
     * HTML `id` attribute for styling hooks. Not passed to Grid options.
     */
    id?: string;
    /**
     * Data field this column configures. Becomes `columns[].id` in Grid Core.
     *
     * Links to Grid.Options.columns.id
     */
    columnId?: string;
    /**
     * Links to Grid.Options.columns.className
     */
    className?: string;
    /**
     * Links to Grid.Options.columns.enabled
     */
    enabled?: boolean;
}
