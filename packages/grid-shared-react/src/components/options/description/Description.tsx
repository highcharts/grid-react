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
     * The custom CSS class name for the description.
     */
    className?: string;
    children?: ReactNode;
}

export function Description(_props: DescriptionProps) {
    return null;
}

Description._GridReact = {
    type: 'Grid_Option',
    gridOption: 'description',
    childOption: 'text',
    isArrayType: false
};
