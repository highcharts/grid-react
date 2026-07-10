import { describe, it, expect } from 'vitest';
import { ColumnDefaults } from '../../src/components/options/columns/ColumnDefaults';
import { getChildProps } from '../../src/utils/getChildProps';

describe('ColumnDefaults', () => {
    it('maps column defaults props into options.columnDefaults', () => {
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
