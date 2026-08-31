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
import type { PaginationProps } from '@highcharts/grid-shared-react';
import type {
    AfterPageChangeEvent,
    AfterPageSizeChangeEvent,
    BeforePageChangeEvent,
    BeforePageSizeChangeEvent
} from '@highcharts/grid-pro/es-modules/Grid/Pro/Pagination/PaginationComposition.js';

/**
 * Pagination event props mapped to `pagination.events`. Grid Pro.
 */
export interface PaginationEventProps {
    /**
     * Links to Grid.Options.pagination.events.beforePageChange
     */
    onBeforePageChange?: (e: BeforePageChangeEvent) => void;
    /**
     * Links to Grid.Options.pagination.events.afterPageChange
     */
    onAfterPageChange?: (e: AfterPageChangeEvent) => void;
    /**
     * Links to Grid.Options.pagination.events.beforePageSizeChange
     */
    onBeforePageSizeChange?: (e: BeforePageSizeChangeEvent) => void;
    /**
     * Links to Grid.Options.pagination.events.afterPageSizeChange
     */
    onAfterPageSizeChange?: (e: AfterPageSizeChangeEvent) => void;
}

/**
 * Pagination props for Grid Pro, including event handlers.
 */
export type ProPaginationProps = PaginationProps & PaginationEventProps;

/** Flat event prop → nested Grid option path for pagination. */
const PAGINATION_EVENT_ALIASES = {
    onBeforePageChange: ['events', 'beforePageChange'],
    onAfterPageChange: ['events', 'afterPageChange'],
    onBeforePageSizeChange: ['events', 'beforePageSizeChange'],
    onAfterPageSizeChange: ['events', 'afterPageSizeChange']
} as const satisfies Record<keyof PaginationEventProps, readonly string[]>;

/**
 * Maps Pro pagination event props onto nested Grid option paths.
 */
export function mapPaginationEventProps(
    props: Record<string, unknown>
): Record<string, unknown> {
    const options = { ...props };

    mapEventsProps(options, PAGINATION_EVENT_ALIASES);

    return options;
}

/**
 * Maps Pro pagination event props on declarative `options.pagination`.
 */
export function mergePaginationEventProps(
    options: Record<string, unknown>
): Record<string, unknown> {
    const pagination = options.pagination;

    if (!isObject(pagination)) {
        return options;
    }

    return {
        ...options,
        pagination: mapPaginationEventProps({ ...pagination })
    };
}
