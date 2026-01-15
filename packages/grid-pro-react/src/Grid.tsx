/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { forwardRef, type ForwardedRef } from 'react';
import {
    BaseGrid,
    GridProps,
    type GridRefHandle
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-pro/es-modules/masters/grid-pro.src';
import '@highcharts/grid-pro/css/grid-pro.css';
import type { Options } from '@highcharts/grid-pro/es-modules/Grid/Core/Options';

const GridPro = forwardRef(function GridPro(
    { options, gridRef, callback }: GridProps<Options>,
    ref: ForwardedRef<GridRefHandle<Options>>
) {
    const resolvedRef = ref ?? gridRef;

    return <BaseGrid options={options} Grid={Grid} ref={resolvedRef} callback={callback} />;
});

export default GridPro;
