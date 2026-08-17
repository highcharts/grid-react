/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { isObject } from './isObject';
import { mergeClassNames } from './mergeClassNames';
import { normalizeColumnOptions } from './mappers/column';
import { normalizePaginationOptions } from './mappers/pagination';

/**
 * Maps raw declarative child options onto nested Grid option paths.
 * Used by lite and pro build pipelines after `getChildProps`.
 *
 * Also merges `columnDefaults` `className` / `header.className` /
 * `cells.className` into each column so Column overrides do not wipe
 * defaults (same semantics as Core `createOptionsProxy`).
 *
 * Lifts `rowClassName` / `evenRowClassName` from ColumnDefaults onto
 * `rendering.rows` (not column options).
 */
export function normalizeChildOptions(
    raw: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...raw };

    if (isObject(result.columnDefaults)) {
        const defaults = { ...result.columnDefaults };
        const rowClassName = defaults.rowClassName;
        const evenRowClassName = defaults.evenRowClassName;
        delete defaults.rowClassName;
        delete defaults.evenRowClassName;

        result.columnDefaults = normalizeColumnOptions(defaults);

        const rows: Record<string, string> = {};
        if (typeof rowClassName === 'string') {
            rows.className = rowClassName;
        }
        if (typeof evenRowClassName === 'string') {
            rows.evenClassName = evenRowClassName;
        }

        if (Object.keys(rows).length) {
            const rendering = isObject(result.rendering) ?
                { ...result.rendering } :
                {};
            const existingRows = isObject(rendering.rows) ?
                { ...rendering.rows as Record<string, unknown> } :
                {};
            rendering.rows = { ...existingRows, ...rows };
            result.rendering = rendering;
        }
    }

    if (Array.isArray(result.columns)) {
        const defaults = isObject(result.columnDefaults) ?
            result.columnDefaults as Record<string, unknown> :
            void 0;

        result.columns = result.columns.map((column) => {
            if (!isObject(column)) {
                return column;
            }

            const normalized = normalizeColumnOptions({ ...column });
            return defaults ?
                mergeColumnClassNames(normalized, defaults) :
                normalized;
        });
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

function mergeColumnClassNames(
    column: Record<string, unknown>,
    defaults: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...column };
    const className = mergeClassNames(
        asString(defaults.className),
        asString(column.className)
    );

    if (className !== void 0) {
        result.className = className;
    }

    result.header = mergeNestedClassName(
        column.header,
        defaults.header
    );
    result.cells = mergeNestedClassName(
        column.cells,
        defaults.cells
    );

    return result;
}

function mergeNestedClassName(
    target: unknown,
    defaults: unknown
): Record<string, unknown> | unknown {
    const targetObj = isObject(target) ? { ...target } : {};
    const defaultsObj = isObject(defaults) ? defaults : {};
    const className = mergeClassNames(
        asString(defaultsObj.className),
        asString(targetObj.className)
    );

    if (className === void 0 && !isObject(target)) {
        return target;
    }

    if (className !== void 0) {
        targetObj.className = className;
    }

    return targetObj;
}

function asString(value: unknown): string | undefined {
    return typeof value === 'string' ? value : void 0;
}
