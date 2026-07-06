/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { mapPrefixedProps } from '../mapPrefixedProps';

/** Flat prop prefix → nested Grid option key for columns. */
const COLUMN_PROP_PREFIXES = {
    sorting: 'sorting',
    filtering: 'filtering',
    header: 'header',
    cell: 'cells'
} as const;

export function normalizeColumnOptions(
    props: Record<string, unknown>
): Record<string, unknown> {
    return mapPrefixedProps(props, COLUMN_PROP_PREFIXES);
}
