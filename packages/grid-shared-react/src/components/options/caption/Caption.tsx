/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { ReactNode } from 'react';

export interface CaptionProps<TOptions = unknown> {
    /**
     * The custom CSS class name for the table caption.
     */
    className?: string;
    /**
     * The HTML tag to use for the caption.
     */
    htmlTag?: string;
    /**
     * Options JSON, same as in the Grid JS API (`caption`).
     */
    options?: TOptions;
    children?: ReactNode;
}

export function Caption<TOptions = unknown>(_props: CaptionProps<TOptions>) {
    return null;
}

Caption._GridReact = {
    type: 'Grid_Option',
    gridOption: 'caption',
    childOption: 'text',
    isArrayType: false
};
