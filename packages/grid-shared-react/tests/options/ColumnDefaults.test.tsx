import { describe, it, expect } from 'vitest';
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
});
