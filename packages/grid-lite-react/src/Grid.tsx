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
    useDeclarativeGridOptions
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-lite/es-modules/masters/grid-lite.src';
import '@highcharts/grid-lite/css/grid-lite.css';
import type { Options } from '@highcharts/grid-lite/es-modules/Grid/Core/Options';
import type { GridProps } from '@highcharts/grid-shared-react';
import { buildGridOptions } from './utils/buildGridOptions';

/**
 * Grid Lite React component.
 *
 * Links to Grid.Options
 */
export default function GridLite(props: GridProps<Options>) {
    const {
        gridRef,
        children,
        options,
        callback,
        theme,
        className,
        tableClassName
    } = props;
    const { gridOptions, columnKey } = useDeclarativeGridOptions(
        children,
        options,
        (childOptions, opts) => buildGridOptions(
            childOptions,
            opts,
            theme,
            tableClassName
        ),
        [theme, tableClassName]
    );

    return (
        <BaseGrid
            key={columnKey}
            options={gridOptions}
            Grid={Grid}
            callback={callback}
            ref={gridRef}
            className={className}
        />
    );
}
