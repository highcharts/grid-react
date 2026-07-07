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
     * Whether pagination should be rendered.
     * Defaults to `true` when the `<Pagination>` component is used.
     * Pass `false` to disable pagination while keeping other options.
     */
    enabled?: boolean;
    /**
     * The current page number.
     */
    page?: number;
    /**
     * Number of rows per page.
     */
    pageSize?: number;
    /**
     * Alignment of pagination elements within the wrapper.
     */
    align?: 'left' | 'center' | 'right' | 'distributed';
    /**
     * Whether to show the page information text.
     */
    pageInfo?: boolean;
    /**
     * Whether to show the page size selector.
     */
    pageSizeSelector?: boolean;
    /**
     * Available options for the page size selector dropdown.
     */
    pageSizeOptions?: number[];
    /**
     * Whether to show numbered page buttons.
     */
    pageButtons?: boolean;
    /**
     * Maximum number of page number buttons to show before using ellipsis.
     */
    pageButtonsCount?: number;
    /**
     * Whether to show the first and last page navigation buttons.
     */
    firstLast?: boolean;
    /**
     * Whether to show the previous and next page navigation buttons.
     */
    previousNext?: boolean;
}
