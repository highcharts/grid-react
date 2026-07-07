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
import { merge } from '@highcharts/grid-pro/es-modules/Shared/Utilities.js';
import Grid from '@highcharts/grid-pro/es-modules/masters/grid-pro.src';
import '@highcharts/grid-pro/css/grid-pro.css';
import type { Options } from '@highcharts/grid-pro/es-modules/Grid/Core/Options';

export default function GridPro(props: GridProps<Options>) {
    const { gridRef, children, options, ...gridProps } = props;
    const childOptions = useMemo(() => getChildProps(children), [children]);
    const columnKey = useMemo(() => {
        const columns = childOptions.columns as Array<{ id?: string }> | undefined;

        return columns?.map((column) => column.id).join('\0') ?? '';
    }, [childOptions]);
    const gridOptions = useMemo(
        () => merge(childOptions, options ?? {}) as Options,
        [childOptions, options]
    );

    return (
        <BaseGrid
            key={columnKey}
            {...gridProps}
            options={gridOptions}
            Grid={Grid}
            ref={gridRef}
        />
    );
}
