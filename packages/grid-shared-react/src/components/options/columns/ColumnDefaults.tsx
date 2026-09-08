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
     * CSS class names on every body `<tr>`.
     * Maps to Core `rendering.rows.className`.
     */
    rowClassName?: string;
    /**
     * CSS class names on even body `<tr>` (Core `.hcg-row-even` parity).
     * Maps to Core `rendering.rows.evenClassName`.
     */
    evenRowClassName?: string;
    /**
     * Options JSON, same as in the Grid JS API (`columnDefaults`).
     */
    options?: TOptions;
}

export function ColumnDefaults<TOptions = unknown>(
    _props: ColumnDefaultsProps<TOptions>
) {
    return null;
}

ColumnDefaults._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults'
};
