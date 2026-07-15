/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { normalizeChildOptions } from '@highcharts/grid-shared-react';
import { merge } from '@highcharts/grid-pro/es-modules/Shared/Utilities.js';
import { mergeColumnEventProps } from './mappers/column';
import { mergePaginationEventProps } from './mappers/pagination';
import {
    normalizeGridEventProps,
    type GridProOptions,
    type GridProProps
} from './mappers/grid/gridOptions';

/**
 * Builds final Grid Pro options from raw declarative child options.
 */
export function buildGridOptions(
    gridKey: string,
    childOptions: Record<string, unknown>,
    options: GridProOptions | undefined,
    props: GridProProps
): GridProOptions {
    const declarativeOptions = mergePaginationEventProps(
        mergeColumnEventProps(normalizeChildOptions(childOptions))
    );
    const containerTheme = [props.theme, props.className]
        .filter(Boolean)
        .join(' ') || void 0;
    const result = merge(
        true,
        {},
        merge(declarativeOptions, options ?? {}),
        containerTheme ? { rendering: { theme: containerTheme } } : {},
        normalizeGridEventProps(props)
    ) as GridProOptions;

    result.gridKey = gridKey;

    return result;
}
