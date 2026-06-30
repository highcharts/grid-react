/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useMemo } from 'react';
import {
    BaseGrid,
    GridProps,
    getChildProps
} from '@highcharts/grid-shared-react';
import { merge } from '@highcharts/grid-lite/es-modules/Shared/Utilities.js';
import Grid from '@highcharts/grid-lite/es-modules/masters/grid-lite.src';
import '@highcharts/grid-lite/css/grid-lite.css';
import type { Options } from '@highcharts/grid-lite/es-modules/Grid/Core/Options';

export default function GridLite(props: GridProps<Options>) {
    const { gridRef, children, options, ...gridProps } = props;
    const gridOptions = useMemo(
        () => merge(getChildProps(children), options ?? {}) as Options,
        [children, options]
    );

    return <BaseGrid {...gridProps} options={gridOptions} Grid={Grid} ref={gridRef} />;
}
