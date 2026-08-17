import { describe, it, expect } from 'vitest';
import { Column } from '../../src/components/options/columns/Column';
import { ColumnDefaults } from '../../src/components/options/columns/ColumnDefaults';
import { getChildProps } from '../../src/utils/getChildProps';
import { normalizeChildOptions } from '../../src/utils/normalizeChildOptions';

describe('ColumnDefaults parser', () => {
    it('collects raw column defaults props', () => {
        expect(
            getChildProps(
                <ColumnDefaults
                    width={160}
                    sortingEnabled
                    cellFormat="{value}"
                />
            )
        ).toEqual({
            columnDefaults: {
                width: 160,
                sortingEnabled: true,
                cellFormat: '{value}'
            }
        });
    });
});

describe('ColumnDefaults normalization', () => {
    it('maps column defaults props into options.columnDefaults', () => {
        expect(
            normalizeChildOptions(
                getChildProps(
                    <ColumnDefaults
                        width={160}
                        sortingEnabled
                        cellFormat="{value}"
                    />
                )
            )
        ).toEqual({
            columnDefaults: {
                width: 160,
                sorting: {
                    enabled: true
                },
                cells: {
                    format: '{value}'
                }
            }
        });
    });

    it('merges columnDefaults classNames into column overrides', () => {
        const options = normalizeChildOptions(
            getChildProps(
                <>
                    <ColumnDefaults
                        headerClassName="p-4 text-left border-b"
                        cellClassName="p-4 text-left border-b"
                    />
                    <Column
                        columnId="name"
                        className="hcg-name-column"
                        headerClassName="hcg-name-header"
                        cellClassName="hcg-name-cell"
                    />
                </>
            )
        );

        expect(options.columns).toEqual([
            {
                id: 'name',
                className: 'hcg-name-column',
                header: {
                    className: 'p-4 text-left border-b hcg-name-header'
                },
                cells: {
                    className: 'p-4 text-left border-b hcg-name-cell'
                }
            }
        ]);
    });

    it('lifts rowClassName and evenRowClassName to rendering.rows', () => {
        const options = normalizeChildOptions(
            getChildProps(
                <ColumnDefaults
                    rowClassName="hover:bg-slate-50"
                    evenRowClassName="bg-slate-50"
                />
            )
        );

        expect(options.columnDefaults).toEqual({});
        expect(options.rendering).toEqual({
            rows: {
                className: 'hover:bg-slate-50',
                evenClassName: 'bg-slate-50'
            }
        });
    });
});
