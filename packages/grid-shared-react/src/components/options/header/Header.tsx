/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import type { HeaderProps } from './headerProps';

export function Header<TOptions = unknown>(_props: HeaderProps<TOptions>) {
    return null;
}

Header._GridReact = {
    type: 'Grid_Option',
    gridOption: 'header'
};
