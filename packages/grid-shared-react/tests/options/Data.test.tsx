import { describe, it, expect } from 'vitest';
import { Data } from '../../src/components/options/data/Data';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Data', () => {
    it('maps columns to options.data.columns', () => {
        const columns = {
            product: ['Apples', 'Oranges'],
            price: [1.2, 2.4]
        };

        expect(
            getChildProps(
                <Data
                    columns={columns}
                    providerType="local"
                    autogenerateColumns
                />
            )
        ).toEqual({
            data: {
                columns,
                providerType: 'local',
                autogenerateColumns: true
            }
        });
    });

    it('maps dataTable to options.data.dataTable', () => {
        const dataTable = { id: 'table-1', rows: [] };

        expect(getChildProps(<Data dataTable={dataTable} />)).toEqual({
            data: {
                dataTable
            }
        });
    });
});
