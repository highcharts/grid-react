/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnProps } from './columnProps';

/**
 * Per-column configuration. Flattened React props map onto `columns[]`.
 *
 * Links to Grid.Options.columns
 */
export function Column(_props: ColumnProps) {
    return null;
}

Column._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columns',
    isArrayType: true
};
