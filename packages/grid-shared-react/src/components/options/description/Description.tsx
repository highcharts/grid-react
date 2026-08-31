/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { ReactNode } from 'react';

export interface DescriptionProps {
    /**
     * Links to Grid.Options.description.className
     */
    className?: string;
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
export function Description(_props: DescriptionProps) {
    return null;
}

Description._GridReact = {
    type: 'Grid_Option',
    gridOption: 'description',
    childOption: 'text',
    isArrayType: false
};
