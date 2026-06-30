import { describe, it, expect } from 'vitest';
import { Data } from '../components/options/data/Data';
import { getChildProps } from './getChildProps';

describe('getChildProps', () => {
    it('maps Data columns to options.data.columns', () => {
        const columns = {
            name: ['Alice', 'Bob'],
            age: [23, 34]
        };

        expect(getChildProps(<Data columns={columns} />)).toEqual({
            data: {
                columns
            }
        });
    });

    it('maps all Data props to options.data', () => {
        const columns = {
            name: ['Alice']
        };
        const connector = { id: 'csv' };
        const dataTable = { id: 'table-1' };

        expect(
            getChildProps(
                <Data
                    providerType="local"
                    autogenerateColumns={false}
                    columns={columns}
                    connector={connector}
                    dataTable={dataTable}
                    updateOnChange
                    idColumn="id"
                />
            )
        ).toEqual({
            data: {
                providerType: 'local',
                autogenerateColumns: false,
                columns,
                connector,
                dataTable,
                updateOnChange: true,
                idColumn: 'id'
            }
        });
    });
});
