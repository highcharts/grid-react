/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { ColumnOptionsProps } from './columnProps';

export interface ColumnDefaultsProps<TOptions = unknown>
    extends ColumnOptionsProps {
    /**
     * Links to Grid.Options.rendering.rows.className
     */
    rowClassName?: string;
    /**
     * Links to Grid.Options.rendering.rows.evenClassName
     */
    evenRowClassName?: string;
    /**
     * Options JSON, same as in the Grid JS API (`columnDefaults`).
     *
     * Links to Grid.Options.columnDefaults
     */
    options?: TOptions;
}

/**
 * Default options applied to every column.
 *
 * Links to Grid.Options.columnDefaults
 */
export function ColumnDefaults<TOptions = unknown>(
    _props: ColumnDefaultsProps<TOptions>
) {
    return null;
}

ColumnDefaults._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults'
};
