/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

/**
 * Joins CSS class tokens from defaults and overrides without duplicates.
 * Used so ColumnDefaults `*ClassName` still applies when a Column sets its
 * own `*ClassName`.
 */
export function mergeClassNames(
    ...classNames: Array<(string | undefined | null)>
): string | undefined {
    const tokens: string[] = [];

    for (const value of classNames) {
        if (typeof value !== 'string' || !value.trim()) {
            continue;
        }
        for (const token of value.trim().split(/\s+/)) {
            if (token && !tokens.includes(token)) {
                tokens.push(token);
            }
        }
    }

    return tokens.length ? tokens.join(' ') : void 0;
}
