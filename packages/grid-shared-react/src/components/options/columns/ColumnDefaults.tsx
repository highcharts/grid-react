/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnOptionsProps } from './columnProps';

/**
 * ColumnDefaults props include shared column options plus grid-level row
 * class hooks (lifted to `rendering.rows` during normalize).
 */
export interface ColumnDefaultsProps extends ColumnOptionsProps {
    /**
     * Links to Grid.Options.rendering.rows.className
     */
    rowClassName?: string;
    /**
     * Links to Grid.Options.rendering.rows.evenClassName
     */
    evenRowClassName?: string;
}

/**
 * Default options applied to every column.
 *
 * Links to Grid.Options.columnDefaults
 */
export function ColumnDefaults(_props: ColumnDefaultsProps) {
    return null;
}

ColumnDefaults._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults'
};
