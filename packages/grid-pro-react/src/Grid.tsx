/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useCallback } from 'react';
import {
    BaseGrid,
    useDeclarativeGridOptions
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-pro/es-modules/masters/grid-pro.src';
import '@highcharts/grid-pro/css/grid-pro.css';
import type { GridProOptions, GridProProps } from './utils/mappers/grid';
import { buildGridOptions } from './utils/buildGridOptions';

/**
 * Grid Pro React component.
 *
 * Links to Grid.Options
 */
export default function GridPro(props: GridProProps) {
    const {
        gridRef,
        children,
        options,
        callback,
        className,
        gridKey,
        theme,
        tableClassName,
        onBeforeLoad,
        onAfterLoad,
        onBeforeUpdate,
        onAfterUpdate,
        onBeforeRedraw,
        onAfterRedraw,
        onBeforeTreeRowToggle,
        onAfterTreeRowToggle,
        onBeforeRowPin,
        onAfterRowPin
    } = props;
    const build = useCallback(
        (
            childOptions: Record<string, unknown>,
            opts?: GridProOptions
        ) => buildGridOptions(gridKey, childOptions, opts, {
            gridKey,
            theme,
            className,
            tableClassName,
            onBeforeLoad,
            onAfterLoad,
            onBeforeUpdate,
            onAfterUpdate,
            onBeforeRedraw,
            onAfterRedraw,
            onBeforeTreeRowToggle,
            onAfterTreeRowToggle,
            onBeforeRowPin,
            onAfterRowPin
        } as GridProProps),
        [
            gridKey,
            theme,
            className,
            tableClassName,
            onBeforeLoad,
            onAfterLoad,
            onBeforeUpdate,
            onAfterUpdate,
            onBeforeRedraw,
            onAfterRedraw,
            onBeforeTreeRowToggle,
            onAfterTreeRowToggle,
            onBeforeRowPin,
            onAfterRowPin
        ]
    );
    const { gridOptions, columnKey } = useDeclarativeGridOptions(
        children,
        options,
        build
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
