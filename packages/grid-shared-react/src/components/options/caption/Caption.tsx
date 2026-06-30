/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { ReactNode } from 'react';

export interface CaptionProps {
    /**
     * The custom CSS class name for the table caption.
     */
    className?: string;
    /**
     * The HTML tag to use for the caption.
     */
    htmlTag?: string;
    children?: ReactNode;
}

export function Caption(_props: CaptionProps): null;
export function Caption(): null {
    return null;
}

Caption._GridReact = {
    type: 'Grid_Option',
    gridOption: 'caption',
    childOption: 'text',
    isArrayType: false
};
