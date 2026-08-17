/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

function withClassName(
    value: unknown,
    className: string | undefined
): unknown {
    if (className === void 0) {
        return value;
    }

    // Disabled control is not rendered — keep boolean, drop className.
    if (value === false) {
        return false;
    }

    if (value !== null && typeof value === 'object') {
        return { ...value as Record<string, unknown>, className };
    }

    return {
        enabled: value === void 0 ? true : Boolean(value),
        className
    };
}

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
        align,
        className,
        infoClassName,
        controlsClassName,
        sizeClassName,
        ...rest
    } = props;

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
    if (typeof className === 'string') {
        result.className = className;
    }

    const controls: Record<string, unknown> = {};

    if (typeof controlsClassName === 'string') {
        controls.className = controlsClassName;
    }

    const pageInfoValue = withClassName(pageInfo, asString(infoClassName));
    if (pageInfoValue !== void 0) {
        controls.pageInfo = pageInfoValue;
    }

    let pageSizeSelectorValue: unknown = pageSizeSelector;

    if (pageSizeSelector === false) {
        pageSizeSelectorValue = false;
    } else if (pageSizeOptions !== void 0) {
        pageSizeSelectorValue = {
            enabled: true,
            options: pageSizeOptions
        };
    } else if (pageSizeSelector !== void 0) {
        pageSizeSelectorValue = pageSizeSelector;
    }

    pageSizeSelectorValue = withClassName(
        pageSizeSelectorValue,
        asString(sizeClassName)
    );

    if (pageSizeSelectorValue !== void 0) {
        controls.pageSizeSelector = pageSizeSelectorValue;
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

    return { ...result, ...rest };
}

function asString(value: unknown): string | undefined {
    return typeof value === 'string' ? value : void 0;
}
