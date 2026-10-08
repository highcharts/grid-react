import { describe, it, expect } from 'vitest';
import { Column } from '../../src/components/options/columns/Column';
import { getChildProps } from '../../src/utils/getChildProps';
import { normalizeChildOptions } from '../../src/utils/normalizeChildOptions';

describe('Column parser', () => {
    it('collects raw column props into options.columns', () => {
        expect(
            getChildProps(
                <Column
                    id="price"
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
                    <Column id="product" width={200} />
                    <Column id="price" width={120} />
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

    it('keeps dataId for unbound columns', () => {
        expect(
            getChildProps(
                <Column id="index" dataId={null} width={40} />
            )
        ).toEqual({
            columns: [{
                id: 'index',
                dataId: null,
                width: 40
            }],
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
                        id="price"
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

    it('merges Core-shaped options under flattened props', () => {
        expect(
            normalizeChildOptions(
                getChildProps(
                    <Column
                        id="price"
                        options={{
                            sorting: { enabled: true, order: 'desc' },
                            header: { className: 'price-header' }
                        }}
                        headerFormat="{value} USD"
                    />
                )
            )
        ).toEqual({
            columns: [{
                id: 'price',
                sorting: {
                    enabled: true,
                    order: 'desc'
                },
                header: {
                    className: 'price-header',
                    format: '{value} USD'
                }
            }],
            data: {
                autogenerateColumns: false
            }
        });
    });
});
