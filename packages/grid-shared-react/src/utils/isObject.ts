/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

export function isObject(
    value: unknown
): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
