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
     * CSS class names on every body `<tr>`.
     * Maps to Core `rendering.rows.className`.
     */
    rowClassName?: string;
    /**
     * CSS class names on even body `<tr>` (Core `.hcg-row-even` parity).
     * Maps to Core `rendering.rows.evenClassName`.
     */
    evenRowClassName?: string;
}

export function ColumnDefaults(_props: ColumnDefaultsProps) {
    return null;
}

ColumnDefaults._GridReact = {
    type: 'Grid_Option',
    gridOption: 'columnDefaults'
};
