/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { isObject } from '@highcharts/grid-shared-react';
import { mapEventsProps } from '../../mapEventsProps';
import type { ColumnProps } from '@highcharts/grid-shared-react';
import type {
    CellEventCallback,
    ColumnEventCallback
} from '@highcharts/grid-pro/es-modules/Grid/Pro/GridEvents.js';

/**
 * Column-level event props mapped to `columns[].events`.
 */
export interface ColumnLevelEventProps {
    onAfterResize?: ColumnEventCallback;
    onBeforeSort?: ColumnEventCallback;
    onAfterSort?: ColumnEventCallback;
    onBeforeFilter?: ColumnEventCallback;
    onAfterFilter?: ColumnEventCallback;
}

/**
 * Cell-level event props mapped to `columns[].cells.events`.
 */
export interface CellLevelEventProps {
    onCellClick?: CellEventCallback;
    onCellDblClick?: CellEventCallback;
    onCellMouseOver?: CellEventCallback;
    onCellMouseOut?: CellEventCallback;
    onCellAfterRender?: CellEventCallback;
    onCellAfterEdit?: CellEventCallback;
}

/**
 * Header-level event props mapped to `columns[].header.events`.
 */
export interface HeaderLevelEventProps {
    onHeaderClick?: ColumnEventCallback;
    onHeaderAfterRender?: ColumnEventCallback;
}

export type ProColumnEventProps = (
    ColumnLevelEventProps &
    CellLevelEventProps &
    HeaderLevelEventProps
);

/**
 * Column props for Grid Pro, including event handlers.
 */
export type ProColumnProps = ColumnProps & ProColumnEventProps;

/** Flat event prop → nested Grid option path for columns. */
const COLUMN_EVENT_ALIASES = {
    onAfterResize: ['events', 'afterResize'],
    onBeforeSort: ['events', 'beforeSort'],
    onAfterSort: ['events', 'afterSort'],
    onBeforeFilter: ['events', 'beforeFilter'],
    onAfterFilter: ['events', 'afterFilter'],
    onCellClick: ['cells', 'events', 'click'],
    onCellDblClick: ['cells', 'events', 'dblClick'],
    onCellMouseOver: ['cells', 'events', 'mouseOver'],
    onCellMouseOut: ['cells', 'events', 'mouseOut'],
    onCellAfterRender: ['cells', 'events', 'afterRender'],
    onCellAfterEdit: ['cells', 'events', 'afterEdit'],
    onHeaderClick: ['header', 'events', 'click'],
    onHeaderAfterRender: ['header', 'events', 'afterRender']
} as const satisfies Record<keyof ProColumnEventProps, readonly string[]>;

/**
 * Maps Pro column event props onto nested Grid option paths.
 */
export function mapColumnEventProps(
    props: Record<string, unknown>
): Record<string, unknown> {
    const options = { ...props };

    mapEventsProps(options, COLUMN_EVENT_ALIASES);

    return options;
}

/**
 * Maps Pro column event props on declarative `options.columns`.
 */
export function mergeColumnEventProps(
    options: Record<string, unknown>
): Record<string, unknown> {
    const columns = options.columns;

    if (!Array.isArray(columns)) {
        return options;
    }

    return {
        ...options,
        columns: columns.map((column) => (
            isObject(column) ? mapColumnEventProps(column) : column
        ))
    };
}
