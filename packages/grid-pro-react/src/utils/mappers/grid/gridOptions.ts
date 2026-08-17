/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { GridProps as BaseGridProps } from '@highcharts/grid-shared-react';
import type GridPro from '@highcharts/grid-pro';
import type { GridEventCallback } from '@highcharts/grid-pro/es-modules/Grid/Pro/GridEvents.js';
import type {
    RowPinningChangeEventCallback
} from '@highcharts/grid-pro/es-modules/Grid/Pro/RowPinning/RowPinningController.js';
import type {
    AfterTreeRowToggleEvent,
    BeforeTreeRowToggleEvent
} from '@highcharts/grid-pro/es-modules/Grid/Pro/TreeView/Projection/TreeProjectionController.js';
import { mapEventsProps } from '../../mapEventsProps';

/**
 * Grid Pro options, including license key support from the Pro bundle.
 */
export type GridProOptions = GridPro.Options & {
    gridKey?: string;
};

export type GridOptions = GridProOptions;

/**
 * Grid-level event props mapped to `options.events`.
 */
export interface GridLevelEventProps {
    onBeforeLoad?: GridEventCallback;
    onAfterLoad?: GridEventCallback;
    onBeforeUpdate?: GridEventCallback;
    onAfterUpdate?: GridEventCallback;
    onBeforeRedraw?: GridEventCallback;
    onAfterRedraw?: GridEventCallback;
    onBeforeTreeRowToggle?: (e: BeforeTreeRowToggleEvent) => void;
    onAfterTreeRowToggle?: (e: AfterTreeRowToggleEvent) => void;
}

/**
 * Row pinning event props mapped to
 * `options.rendering.rows.pinning.events`.
 */
export interface RowPinningEventProps {
    onBeforeRowPin?: RowPinningChangeEventCallback;
    onAfterRowPin?: RowPinningChangeEventCallback;
}

export type GridEventProps = GridLevelEventProps & RowPinningEventProps;

/**
 * Props for the Grid Pro React component.
 */
export interface GridProProps
    extends BaseGridProps<GridProOptions>, GridEventProps {
    /**
     * Grid Pro license key.
     */
    gridKey: string;
}

/** Flat event prop → nested Grid option path for grid props. */
const GRID_EVENT_ALIASES = {
    onBeforeLoad: ['events', 'beforeLoad'],
    onAfterLoad: ['events', 'afterLoad'],
    onBeforeUpdate: ['events', 'beforeUpdate'],
    onAfterUpdate: ['events', 'afterUpdate'],
    onBeforeRedraw: ['events', 'beforeRedraw'],
    onAfterRedraw: ['events', 'afterRedraw'],
    onBeforeTreeRowToggle: ['events', 'beforeTreeRowToggle'],
    onAfterTreeRowToggle: ['events', 'afterTreeRowToggle'],
    onBeforeRowPin: ['rendering', 'rows', 'pinning', 'events', 'beforeRowPin'],
    onAfterRowPin: ['rendering', 'rows', 'pinning', 'events', 'afterRowPin']
} as const satisfies Record<keyof GridEventProps, readonly string[]>;

export const GRID_EVENT_PROP_KEYS = Object.keys(
    GRID_EVENT_ALIASES
) as (keyof GridEventProps)[];

/**
 * Maps Pro event props from declarative `<Grid>` props.
 */
export function normalizeGridEventProps(
    props: GridProProps
): Record<string, unknown> {
    const options: Record<string, unknown> = {};

    mapEventsProps(
        options,
        GRID_EVENT_ALIASES,
        props as unknown as Record<string, unknown>
    );

    return options;
}

/**
 * Event handler values from Grid props, for `useMemo` dependency lists.
 */
export function getGridEventPropDeps(props: GridProProps): unknown[] {
    return [
        props.gridKey,
        props.theme,
        props.className,
        props.tableClassName,
        ...GRID_EVENT_PROP_KEYS.map((key) => props[key])
    ];
}
