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
     * Links to Grid.Options.caption.className
     */
    className?: string;
    /**
     * Links to Grid.Options.caption.htmlTag
     */
    htmlTag?: string;
    /**
     * Caption text, passed as the component children.
     *
     * Links to Grid.Options.caption.text
     */
    children?: ReactNode;
}

/**
 * Table caption. Pass the caption text as children.
 *
 * Links to Grid.Options.caption
 */
export function Caption(_props: CaptionProps) {
    return null;
}

Caption._GridReact = {
    type: 'Grid_Option',
    gridOption: 'caption',
    childOption: 'text',
    isArrayType: false
};
