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
     * Links to Grid.Options.description.className
     */
    className?: string;
    /**
     * Options JSON, same as in the Grid JS API (`description`).
     *
     * Links to Grid.Options.description
     */
    options?: TOptions;
    /**
     * Description text, passed as the component children.
     *
     * Links to Grid.Options.description.text
     */
    children?: ReactNode;
}

/**
 * Table description. Pass the description text as children.
 *
 * Links to Grid.Options.description
 */
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
