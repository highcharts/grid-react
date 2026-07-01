/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnsProps } from './columnProps';

export function Columns(_props: ColumnsProps) {
    return null;
}

Columns._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults',
    role: 'columnsContainer'
};
