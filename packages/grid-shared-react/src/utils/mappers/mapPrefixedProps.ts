/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

/**
 * Maps flat props with a shared prefix into nested Grid option objects.
 *
 * Convention: `{prefix}{OptionKey}` → `{groupKey}.{optionKey}`
 *
 * @example
 * mapPrefixedProps(
 *   { sortingEnabled: true, sortingOrder: 'asc', width: 120 },
 *   { sorting: 'sorting' }
 * );
 * // => { width: 120, sorting: { enabled: true, order: 'asc' } }
 */
export type PrefixedPropMap = Record<string, string>;

export function mapPrefixedProps(
    props: Record<string, unknown>,
    prefixToGroup: PrefixedPropMap
): Record<string, unknown> {
    const result = { ...props };
    const groups: Record<string, Record<string, unknown>> = {};
    const prefixes = Object.keys(prefixToGroup).sort((a, b) => b.length - a.length);

    for (const flatKey of Object.keys(result)) {
        const prefix = prefixes.find(
            (candidate) => flatKey.startsWith(candidate) && flatKey.length > candidate.length
        );

        if (!prefix) {
            continue;
        }

        const groupKey = prefixToGroup[prefix];
        const nestedKey = toNestedKey(flatKey.slice(prefix.length));

        (groups[groupKey] ??= {})[nestedKey] = result[flatKey];
        delete result[flatKey];
    }

    for (const [groupKey, nested] of Object.entries(groups)) {
        result[groupKey] = nested;
    }

    return result;
}

function toNestedKey(segment: string): string {
    return segment.charAt(0).toLowerCase() + segment.slice(1);
}
