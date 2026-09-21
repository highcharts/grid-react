/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import GridLite from '@highcharts/grid-lite';
import type { IndividualColumnOptions } from '@highcharts/grid-lite/es-modules/Grid/Core/Options';
import * as Shared from '@highcharts/grid-shared-react';

export { default as Grid } from './Grid';
export { default as GridLite } from './Grid';
export { DataTable, DataConnector } from '@highcharts/grid-lite';
export { merge } from '@highcharts/grid-lite/es-modules/Shared/Utilities.js';

export type CaptionProps = Shared.CaptionProps<GridLite.Options['caption']>;
export type DataProps = Shared.DataProps<GridLite.Options['data']>;
export type ColumnDefaultsProps = Shared.ColumnDefaultsProps<
    GridLite.Options['columnDefaults']
>;
export type ColumnProps = Shared.ColumnProps<
    Omit<IndividualColumnOptions, 'id'>
>;
export type DescriptionProps = Shared.DescriptionProps<
    GridLite.Options['description']
>;
export type PaginationProps = Shared.PaginationProps<
    GridLite.Options['pagination']
>;
export type HeaderProps = Shared.HeaderProps<GridLite.Options['header']>;

export const Caption = Shared.Caption as (props: CaptionProps) => null;
export const Data = Shared.Data as (props: DataProps) => null;
export const ColumnDefaults = Shared.ColumnDefaults as (
    props: ColumnDefaultsProps
) => null;
export const Column = Shared.Column as (props: ColumnProps) => null;
export const Description = Shared.Description as (
    props: DescriptionProps
) => null;
export const Pagination = Shared.Pagination as (
    props: PaginationProps
) => null;
export const Header = Shared.Header as (props: HeaderProps) => null;

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
export type GridOptions = GridLite.Options;
