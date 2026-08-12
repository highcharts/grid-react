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
 *
 * `theme` → `rendering.theme`
 * `tableClassName` → `rendering.table.className` (`.hcg-table`)
 *
 * `className` is React-only on the mount container
 * (parent of `.hcg-container`).
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
    const rendering: Record<string, unknown> = {};

    if (props.theme !== void 0) {
        rendering.theme = props.theme;
    }
    if (props.tableClassName !== void 0) {
        rendering.table = { className: props.tableClassName };
    }

    const result = merge(
        true,
        {},
        merge(declarativeOptions, options ?? {}),
        // Skip empty `{ rendering: {} }` so merge does not inject a blank
        // rendering block when theme / tableClassName were omitted.
        Object.keys(rendering).length ? { rendering } : {},
        normalizeGridEventProps(props)
    ) as GridProOptions;

    result.gridKey = gridKey;

    return result;
}
