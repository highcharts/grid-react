/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnProps } from './columnProps';

export function Column(_props: ColumnProps) {
    return null;
}

Column._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columns',
    role: 'column',
    isArrayType: true
};
