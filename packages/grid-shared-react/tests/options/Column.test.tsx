import { describe, it, expect } from 'vitest';
import { Column } from '../../src/components/options/columns/Column';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Column', () => {
    it('maps column props into options.columns', () => {
        expect(
            getChildProps(
                <Column
                    columnId="price"
                    id="price-column"
                    width={120}
                    sortingEnabled
                    sortingOrder="asc"
                    headerFormat="{value} USD"
                />
            )
        ).toEqual({
            columns: [{
                width: 120,
                sorting: {
                    enabled: true,
                    order: 'asc'
                },
                header: {
                    format: '{value} USD'
                },
                id: 'price'
            }],
            data: {
                autogenerateColumns: false
            }
        });
    });

    it('maps multiple columns into options.columns array', () => {
        expect(
            getChildProps(
                <>
                    <Column columnId="product" width={200} />
                    <Column columnId="price" width={120} />
                </>
            )
        ).toEqual({
            columns: [
                { width: 200, id: 'product' },
                { width: 120, id: 'price' }
            ],
            data: {
                autogenerateColumns: false
            }
        });
    });
});
