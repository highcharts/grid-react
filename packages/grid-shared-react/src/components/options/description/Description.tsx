/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { ReactNode } from 'react';

export interface DescriptionProps<TOptions = unknown> {
    /**
     * The custom CSS class name for the description.
     */
    className?: string;
    /**
     * Options JSON, same as in the Grid JS API (`description`).
     */
    options?: TOptions;
    children?: ReactNode;
}

export function Description<TOptions = unknown>(
    _props: DescriptionProps<TOptions>
) {
    return null;
}

Description._GridReact = {
    type: 'Grid_Option',
    gridOption: 'description',
    childOption: 'text',
    isArrayType: false
};
