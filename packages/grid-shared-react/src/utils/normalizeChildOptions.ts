/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { isObject } from './isObject';
import { normalizeColumnOptions } from './mappers/column';
import { normalizePaginationOptions } from './mappers/pagination';

/**
 * Maps raw declarative child options onto nested Grid option paths.
 * Used by lite and pro build pipelines after `getChildProps`.
 */
export function normalizeChildOptions(
    raw: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...raw };

    if (isObject(result.columnDefaults)) {
        result.columnDefaults = normalizeColumnOptions({
            ...result.columnDefaults
        });
    }

    if (Array.isArray(result.columns)) {
        result.columns = result.columns.map((column) => (
            isObject(column) ? normalizeColumnOptions({ ...column }) : column
        ));
    }

    if (isObject(result.pagination)) {
        const pagination = { ...result.pagination };
        const { position, ...props } = pagination;
        const normalized = normalizePaginationOptions(props);

        if (position !== void 0) {
            normalized.position = position;
        }

        result.pagination = normalized;
    }

    return result;
}
