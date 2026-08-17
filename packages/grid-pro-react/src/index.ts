/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ComponentType } from 'react';
import {
    Column as SharedColumn,
    Data as SharedData,
    Pagination as SharedPagination,
    Caption,
    ColumnDefaults,
    Description,
    Header
} from '@highcharts/grid-shared-react';
import type { ProColumnProps } from './utils/mappers/column';
import type { ProPaginationProps } from './utils/mappers/pagination';

export { default as Grid } from './Grid';
export { default as GridPro } from './Grid';
export { Caption, ColumnDefaults, Description, Header };
export const Column = SharedColumn as ComponentType<ProColumnProps>;
export const Data = SharedData;
export const Pagination = SharedPagination as ComponentType<ProPaginationProps>;
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
    ColumnOptionsProps,
    ColumnDataType,
    ColumnSortingOrder,
    CellValueGetterContext,
    HeaderProps,
    GroupedHeaderOptions,
    HeaderCellAccessibilityProps
} from '@highcharts/grid-shared-react';
export type {
    GridProProps,
    GridProOptions,
    GridOptions,
    GridEventProps,
    GridLevelEventProps,
    RowPinningEventProps
} from './utils/mappers/grid';
export type {
    ProColumnProps,
    ProColumnEventProps,
    ColumnLevelEventProps,
    CellLevelEventProps,
    HeaderLevelEventProps
} from './utils/mappers/column';
export type {
    ProPaginationProps,
    PaginationEventProps
} from './utils/mappers/pagination';
