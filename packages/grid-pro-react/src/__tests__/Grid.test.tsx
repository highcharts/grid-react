import { createGridTests } from '@highcharts/grid-shared-react/src/test/createGridTests';
import { GridPro, GridOptions } from '../index';

createGridTests<GridOptions>(
    'GridPro',
    GridPro,
    {
        dataTable: {
            columns: {
                name: ['Alice', 'Bob'],
                age: [30, 25]
            }
        }
    },
    {
        dataTable: {
            columns: {
                name: ['Charlie', 'Diana'],
                age: [40, 35]
            }
        }
    }
);
