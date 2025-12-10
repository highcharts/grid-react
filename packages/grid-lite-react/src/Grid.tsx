/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import {
    BaseGrid,
    GridProps
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-lite';
import '@highcharts/grid-lite/css/grid-lite.css';
import type { Options } from '@highcharts/grid-lite/es-modules/Grid/Core/Options.js';

export default function GridLite({ options, gridRef, callback }: GridProps<Options>) {
    return <BaseGrid options={options} Grid={Grid} ref={gridRef} callback={callback} />;
}
