import { describe, it, expect } from 'vitest';
import { Column } from '../../src/components/options/columns/Column';
import { getChildProps } from '../../src/utils/getChildProps';
import { normalizeChildOptions } from '../../src/utils/normalizeChildOptions';

describe('Column parser', () => {
    it('collects raw column props into options.columns', () => {
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
                sortingEnabled: true,
                sortingOrder: 'asc',
                headerFormat: '{value} USD',
                id: 'price'
            }],
            data: {
                autogenerateColumns: false
            }
        });
    });

    it('collects multiple raw columns into options.columns array', () => {
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

describe('Column normalization', () => {
    it('maps prefixed column props onto nested Grid option paths', () => {
        expect(
            normalizeChildOptions(
                getChildProps(
                    <Column
                        columnId="price"
                        width={120}
                        sortingEnabled
                        sortingOrder="asc"
                        headerFormat="{value} USD"
                    />
                )
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
});
