/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { PaginationProps } from './paginationProps';

export function Pagination<TOptions = unknown>(
    _props: PaginationProps<TOptions>
) {
    return null;
}

Pagination._GridReact = {
    type: 'Grid_Option',
    gridOption: 'pagination'
};
