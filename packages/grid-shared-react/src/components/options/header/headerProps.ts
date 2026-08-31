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
    /**
     * Links to Grid.Options.header.accessibility.description
     */
    description?: string;
}

/**
 * Header node in the `header` tree. A group (with `columns`) or a leaf
 * (with `columnId`).
 */
export interface GroupedHeaderOptions {
    /**
     * Links to Grid.Options.header.accessibility
     */
    accessibility?: HeaderCellAccessibilityProps;
    /**
     * Links to Grid.Options.header.format
     */
    format?: string;
    /**
     * Links to Grid.Options.header.className
     */
    className?: string;
    /**
     * Links to Grid.Options.header.columnId
     */
    columnId?: string;
    /**
     * Nested header entries. A string is a column id.
     *
     * Links to Grid.Options.header.columns
     */
    columns?: Array<GroupedHeaderOptions | string>;
}

export interface HeaderProps {
    /**
     * Header tree: column order, inclusion, and grouping. Each entry is a
     * column id (`string`) or a {@link GroupedHeaderOptions} object.
     *
     * Links to Grid.Options.header
     */
    header?: Array<GroupedHeaderOptions | string>;
}
