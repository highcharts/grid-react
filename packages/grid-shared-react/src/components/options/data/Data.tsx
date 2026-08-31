/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

export type DataColumnValue = boolean | null | number | string | undefined;

export type DataColumns = Record<string, Array<DataColumnValue>>;

export interface DataProps {
    /**
     * Links to Grid.Options.data.providerType
     */
    providerType?: 'local' | string;
    /**
     * When declarative `<Column>` components are used, the React wrapper sets
     * this to `false` unless the prop is passed explicitly.
     *
     * Links to Grid.Options.data.autogenerateColumns
     */
    autogenerateColumns?: boolean;
    /**
     * Links to Grid.Options.data.columns
     */
    columns?: DataColumns;
    /**
     * Links to Grid.Options.data.dataTable
     */
    dataTable?: unknown;
    /**
     * Links to Grid.Options.data.connector
     */
    connector?: unknown;
    /**
     * Links to Grid.Options.data.updateOnChange
     */
    updateOnChange?: boolean;
    /**
     * Links to Grid.Options.data.idColumn
     */
    idColumn?: string;
}

/**
 * Data source for the grid.
 *
 * Links to Grid.Options.data
 */
export function Data(_props: DataProps) {
    return null;
}

Data._GridReact = {
    type: 'Grid_Option',
    gridOption: 'data',
    isArrayType: false
};
