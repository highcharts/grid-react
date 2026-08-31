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
import Grid from '@highcharts/grid-pro/es-modules/masters/grid-pro.src';
import '@highcharts/grid-pro/css/grid-pro.css';
import type { GridProProps } from './utils/mappers/grid';
import {
    getGridEventPropDeps
} from './utils/mappers/grid';
import { buildGridOptions } from './utils/buildGridOptions';

/**
 * Grid Pro React component.
 *
 * Links to Grid.Options
 */
export default function GridPro(props: GridProProps) {
    const { gridRef, children, options, callback, className } = props;
    const { gridOptions, columnKey } = useDeclarativeGridOptions(
        children,
        options,
        (childOptions, opts) => buildGridOptions(
            props.gridKey,
            childOptions,
            opts,
            props
        ),
        getGridEventPropDeps(props)
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
