/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnOptionsProps } from './columnProps';

export function ColumnDefaults(_props: ColumnOptionsProps) {
    return null;
}

ColumnDefaults._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults'
};
