/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

export interface PaginationProps {
    /**
     * Defaults to `true` when the `<Pagination>` component is used. Pass
     * `false` to disable pagination while keeping other options.
     *
     * @default true
     *
     * Links to Grid.Options.pagination.enabled
     */
    enabled?: boolean;
    /**
     * Links to Grid.Options.pagination.className
     */
    className?: string;
    /**
     * Links to Grid.Options.pagination.controls.pageInfo.className
     */
    infoClassName?: string;
    /**
     * Links to Grid.Options.pagination.controls.className
     */
    controlsClassName?: string;
    /**
     * Links to Grid.Options.pagination.controls.pageSizeSelector.className
     */
    sizeClassName?: string;
    /**
     * Links to Grid.Options.pagination.page
     */
    page?: number;
    /**
     * Links to Grid.Options.pagination.pageSize
     */
    pageSize?: number;
    /**
     * Links to Grid.Options.pagination.align
     */
    align?: 'left' | 'center' | 'right' | 'distributed';
    /**
     * Links to Grid.Options.pagination.controls.pageInfo
     */
    pageInfo?: boolean;
    /**
     * Links to Grid.Options.pagination.controls.pageSizeSelector
     */
    pageSizeSelector?: boolean;
    /**
     * Links to Grid.Options.pagination.controls.pageSizeSelector.options
     */
    pageSizeOptions?: number[];
    /**
     * Links to Grid.Options.pagination.controls.pageButtons
     */
    pageButtons?: boolean;
    /**
     * Links to Grid.Options.pagination.controls.pageButtons.count
     */
    pageButtonsCount?: number;
    /**
     * Links to Grid.Options.pagination.controls.firstLastButtons
     */
    firstLast?: boolean;
    /**
     * Links to Grid.Options.pagination.controls.previousNextButtons
     */
    previousNext?: boolean;
}
