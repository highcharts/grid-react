/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { PaginationProps } from '../../../components/options/pagination/paginationProps';

export function normalizePaginationOptions(
    props: Record<string, unknown>
): Record<string, unknown> {
    const {
        pageInfo,
        pageSizeSelector,
        pageSizeOptions,
        pageButtons,
        pageButtonsCount,
        firstLast,
        previousNext,
        enabled,
        page,
        pageSize,
        align
    } = props as PaginationProps;

    const result: Record<string, unknown> = {
        enabled: enabled ?? true
    };

    if (page !== void 0) {
        result.page = page;
    }
    if (pageSize !== void 0) {
        result.pageSize = pageSize;
    }
    if (align !== void 0) {
        result.align = align;
    }

    const controls: Record<string, unknown> = {};

    if (pageInfo !== void 0) {
        controls.pageInfo = pageInfo;
    }

    if (pageSizeSelector === false) {
        controls.pageSizeSelector = false;
    } else if (pageSizeOptions !== void 0) {
        controls.pageSizeSelector = {
            enabled: true,
            options: pageSizeOptions
        };
    } else if (pageSizeSelector !== void 0) {
        controls.pageSizeSelector = pageSizeSelector;
    }

    if (pageButtons === false) {
        controls.pageButtons = false;
    } else if (pageButtonsCount !== void 0) {
        controls.pageButtons = {
            enabled: true,
            count: pageButtonsCount
        };
    } else if (pageButtons !== void 0) {
        controls.pageButtons = pageButtons;
    }

    if (firstLast !== void 0) {
        controls.firstLastButtons = firstLast;
    }

    if (previousNext !== void 0) {
        controls.previousNextButtons = previousNext;
    }

    if (Object.keys(controls).length > 0) {
        result.controls = controls;
    }

    return result;
}
