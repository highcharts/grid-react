/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { PaginationProps } from './paginationProps';

/**
 * Page size and pagination controls. Position in the JSX tree sets
 * `pagination.position` (`top` before other components, `bottom` after).
 *
 * Links to Grid.Options.pagination
 */
export function Pagination<TOptions = unknown>(
    _props: PaginationProps<TOptions>
) {
    return null;
}

Pagination._GridReact = {
    type: 'Grid_Option',
    gridOption: 'pagination'
};
