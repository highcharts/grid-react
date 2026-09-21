/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { isObject } from '@highcharts/grid-shared-react';

function setNestedValue(
    target: Record<string, unknown>,
    path: readonly string[],
    value: unknown
): void {
    if (path.length === 0) {
        return;
    }

    let current = target;

    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];

        if (key === void 0) {
            continue;
        }

        const next = current[key];

        if (!isObject(next)) {
            current[key] = {};
        } else {
            current[key] = { ...next };
        }

        current = current[key] as Record<string, unknown>;
    }

    const lastKey = path.at(-1);

    if (lastKey !== void 0) {
        current[lastKey] = value;
    }
}

/**
 * Maps flat event props onto nested option paths.
 *
 * When `source` is omitted, handlers are read from `target` and flat props
 * are removed after mapping. When `source` is provided, handlers are copied
 * onto `target` without mutating `source`.
 *
 * @example
 * mapEventsProps(column, {
 *   onCellClick: ['cells', 'events', 'click']
 * });
 */
export function mapEventsProps(
    target: Record<string, unknown>,
    aliases: Record<string, readonly string[]>,
    source?: Record<string, unknown>
): void {
    const props = source ?? target;
    const removeFlatProps = source === void 0;

    for (const [propName, path] of Object.entries(aliases)) {
        const handler = props[propName];

        if (typeof handler !== 'function') {
            continue;
        }

        if (removeFlatProps) {
            delete target[propName];
        }

        setNestedValue(target, path, handler);
    }
}
