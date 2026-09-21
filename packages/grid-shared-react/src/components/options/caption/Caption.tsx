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
     * Links to Grid.Options.caption.className
     */
    className?: string;
    /**
     * Links to Grid.Options.caption.htmlTag
     */
    htmlTag?: string;
    /**
     * Options JSON, same as in the Grid JS API (`caption`).
     *
     * Links to Grid.Options.caption
     */
    options?: TOptions;
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
export function Caption<TOptions = unknown>(_props: CaptionProps<TOptions>) {
    return null;
}

Caption._GridReact = {
    type: 'Grid_Option',
    gridOption: 'caption',
    childOption: 'text',
    isArrayType: false
};
