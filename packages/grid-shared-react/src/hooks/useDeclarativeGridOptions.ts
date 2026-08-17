/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { useMemo, type ReactNode } from 'react';
import { getChildProps } from '../utils/getChildProps';

export interface OptionsBuildFn<TOptions> {
    (childOptions: Record<string, unknown>, options?: TOptions): TOptions;
}

export type DeclarativeGridOptionsState<TOptions> = {
    gridOptions: TOptions;
    columnKey: string;
};

/**
 * Builds a React key that remounts the grid when declarative column ids change.
 */
function getColumnKey(childOptions: Record<string, unknown>): string {
    const columns = childOptions.columns as Array<{ id?: string }> | undefined;

    return columns?.map((column) => column.id).join('\0') ?? '';
}

export interface UseDeclarativeGridOptionsFn {
    <T>(
        children: ReactNode | undefined,
        options: T | undefined,
        build: OptionsBuildFn<T>,
        buildDeps?: unknown[]
    ): DeclarativeGridOptionsState<T>;
}

export const useDeclarativeGridOptions: UseDeclarativeGridOptionsFn = (
    children,
    options,
    build,
    buildDeps = []
) => {
    const childOptions = useMemo(
        () => (children != null ? getChildProps(children) : {}),
        [children]
    );
    const columnKey = useMemo(
        () => getColumnKey(childOptions),
        [childOptions]
    );
    const gridOptions = useMemo(
        () => build(childOptions, options),
        [childOptions, options, ...buildDeps]
    );

    return { gridOptions, columnKey };
};
