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
 */
export function buildGridOptions(
    childOptions: Record<string, unknown>,
    options?: Options,
    theme?: string,
    className?: string
): Options {
    const containerTheme = [theme, className]
        .filter(Boolean)
        .join(' ') || void 0;

    return merge(
        normalizeChildOptions(childOptions),
        options ?? {},
        containerTheme ? { rendering: { theme: containerTheme } } : {}
    ) as Options;
}
