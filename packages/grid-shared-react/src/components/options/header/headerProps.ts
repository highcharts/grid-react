/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

/**
 * Accessibility options for a header cell in the header tree.
 */
export interface HeaderCellAccessibilityProps {
    description?: string;
}

/**
 * Header node in the `header` tree. A group (with `columns`) or a leaf
 * (with `columnId`). Mirrors Grid Core `GroupedHeaderOptions`.
 */
export interface GroupedHeaderOptions {
    accessibility?: HeaderCellAccessibilityProps;
    format?: string;
    className?: string;
    columnId?: string;
    columns?: Array<GroupedHeaderOptions | string>;
}

export interface HeaderProps<TOptions = unknown> {
    /**
     * Options JSON, same as in the Grid JS API (`header`).
     */
    options?: TOptions;
}
