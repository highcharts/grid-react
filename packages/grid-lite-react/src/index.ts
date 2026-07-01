/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import GridLite from '@highcharts/grid-lite';

export { default as Grid } from './Grid';
export { default as GridLite } from './Grid';
export { Caption, Description } from '@highcharts/grid-shared-react';
export type { GridInstance, GridRefHandle, CaptionProps, DescriptionProps } from '@highcharts/grid-shared-react';
export type GridOptions = GridLite.Options;
