/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import * as Shared from '@highcharts/grid-shared-react';
import type { GridProOptions } from './utils/mappers/grid';
import type { ProColumnProps } from './utils/mappers/column';
import type { ProPaginationProps } from './utils/mappers/pagination';

export { default as Grid } from './Grid';
export { default as GridPro } from './Grid';
export { DataTable, DataConnector } from '@highcharts/grid-pro';
export { merge } from '@highcharts/grid-pro/es-modules/Shared/Utilities.js';

export type CaptionProps = Shared.CaptionProps<GridProOptions['caption']>;
export type DataProps = Shared.DataProps<GridProOptions['data']>;
export type ColumnDefaultsProps = Shared.ColumnDefaultsProps<
    GridProOptions['columnDefaults']
>;
export type DescriptionProps = Shared.DescriptionProps<
    GridProOptions['description']
>;
export type HeaderProps = Shared.HeaderProps<GridProOptions['header']>;
export type ColumnProps = ProColumnProps;
export type PaginationProps = ProPaginationProps;

export const Caption = Shared.Caption as (props: CaptionProps) => null;
export const Data = Shared.Data as (props: DataProps) => null;
export const ColumnDefaults = Shared.ColumnDefaults as (
    props: ColumnDefaultsProps
) => null;
export const Description = Shared.Description as (
    props: DescriptionProps
) => null;
export const Header = Shared.Header as (props: HeaderProps) => null;
export const Column = Shared.Column as (props: ProColumnProps) => null;
export const Pagination = Shared.Pagination as (
    props: ProPaginationProps
) => null;

export type {
    GridInstance,
    GridRefHandle,
    DataColumns,
    DataColumnValue,
    ColumnOptionsProps,
    ColumnDataType,
    ColumnSortingOrder,
    CellValueGetterContext,
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
