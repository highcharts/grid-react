/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { BaseGrid } from './components/BaseGrid';
import { GridType, GridInstance } from './hooks/useGrid';
import type { GridProps, GridRefHandle } from './components/BaseGrid';

export { BaseGrid };
export {
    Caption,
    Data,
    ColumnDefaults,
    Column,
    Description,
    Pagination,
    Header
} from './components/options';
export { getChildProps } from './utils/getChildProps';
export { isObject } from './utils/isObject';
export { mergeClassNames } from './utils/mergeClassNames';
export { normalizeChildOptions } from './utils/normalizeChildOptions';
export { useDeclarativeGridOptions } from './hooks/useDeclarativeGridOptions';
export type {
    CaptionProps,
    DescriptionProps,
    DataProps,
    DataColumns,
    DataColumnValue,
    ColumnProps,
    ColumnOptionsProps,
    ColumnDefaultsProps,
    ColumnDataType,
    ColumnSortingOrder,
    CellValueGetterContext,
    PaginationProps,
    HeaderProps,
    GroupedHeaderOptions,
    HeaderCellAccessibilityProps
} from './components/options';
export type { GridType, GridInstance, GridProps, GridRefHandle };
