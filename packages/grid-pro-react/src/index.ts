/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import GridPro from '@highcharts/grid-pro';

export { default as Grid } from './Grid';
export { default as GridPro } from './Grid';
export {
    Caption,
    Data,
    ColumnDefaults,
    Column,
    Description,
    Pagination,
    Header
} from '@highcharts/grid-shared-react';
export { DataTable, DataConnector } from '@highcharts/grid-pro';
export { merge } from '@highcharts/grid-pro/es-modules/Shared/Utilities.js';
export type {
    GridInstance,
    GridRefHandle,
    CaptionProps,
    DescriptionProps,
    DataProps,
    DataColumns,
    DataColumnValue,
    ColumnProps,
    ColumnOptionsProps,
    ColumnDataType,
    ColumnSortingOrder,
    CellValueGetterContext,
    PaginationProps,
    HeaderProps,
    GroupedHeaderOptions,
    HeaderCellAccessibilityProps
} from '@highcharts/grid-shared-react';
export type GridOptions = GridPro.Options;
