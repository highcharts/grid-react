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
     * The type of the data provider.
     *
     * @default 'local'
     */
    providerType?: 'local' | string;
    /**
     * Whether columns should be generated automatically from data source
     * column ids.
     *
     * Defaults to `true`. When declarative `<Column>` components are used,
     * the React wrapper sets this to `false` unless you pass this prop
     * explicitly.
     *
     * @default true
     */
    autogenerateColumns?: boolean;
    /**
     * Columns data to initialize the Grid with.
     */
    columns?: DataColumns;
    /**
     * Data table as a source of data for the grid.
     */
    dataTable?: unknown;
    /**
     * Connector instance or options used to populate the data table.
     */
    connector?: unknown;
    /**
     * Automatically update the grid when the data table changes.
     *
     * @default false
     */
    updateOnChange?: boolean;
    /**
     * The column ID that contains the stable, unique row IDs.
     */
    idColumn?: string;
}

export function Data(_props: DataProps) {
    return null;
}

Data._GridReact = {
    type: 'Grid_Option',
    gridOption: 'data',
    isArrayType: false
};
