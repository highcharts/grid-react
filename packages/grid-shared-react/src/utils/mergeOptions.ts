/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { isObject } from './isObject';

/**
 * Deep-merges plain objects. Arrays and primitives in `override` replace
 * `base`. `undefined` in `override` is skipped so omitted React props do
 * not clobber values from `options`.
 */
function deepMerge(
    base: Record<string, unknown>,
    override: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = { ...base };

    for (const [key, value] of Object.entries(override)) {
        if (value === void 0) {
            continue;
        }

        const existing = result[key];

        result[key] = isObject(existing) && isObject(value) ?
            deepMerge(existing, value) :
            value;
    }

    return result;
}

/**
 * Merges a Core-shaped `options` bag with flattened props. Flattened
 * props win. Pass `map` when those props need prefix mapping first.
 */
export function mergeComponentOptions(
    props: Record<string, unknown>,
    map?: (flat: Record<string, unknown>) => Record<string, unknown>
): Record<string, unknown> {
    const { options, ...rest } = props;
    const mapped = map ? map(rest) : rest;

    return isObject(options) ? deepMerge(options, mapped) : mapped;
}
