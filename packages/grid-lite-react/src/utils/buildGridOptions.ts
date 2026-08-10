/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { normalizeChildOptions } from '@highcharts/grid-shared-react';
import { merge } from '@highcharts/grid-lite/es-modules/Shared/Utilities.js';
import type { Options } from '@highcharts/grid-lite/es-modules/Grid/Core/Options';

/**
 * Builds final Grid Lite options from raw declarative child options.
 *
 * `theme` → `rendering.theme`
 * `tableClassName` → `rendering.table.className` (`.hcg-table`)
 *
 * `className` is React-only on the mount container
 * (parent of `.hcg-container`).
 */
export function buildGridOptions(
    childOptions: Record<string, unknown>,
    options?: Options,
    theme?: string,
    tableClassName?: string
): Options {
    const rendering: Record<string, unknown> = {};

    if (theme !== void 0) {
        rendering.theme = theme;
    }
    if (tableClassName !== void 0) {
        rendering.table = { className: tableClassName };
    }

    return merge(
        normalizeChildOptions(childOptions),
        options ?? {},
        // Skip empty `{ rendering: {} }` so merge does not inject a blank
        // rendering block when theme / tableClassName were omitted.
        Object.keys(rendering).length ? { rendering } : {}
    ) as Options;
}
