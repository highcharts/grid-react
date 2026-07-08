import { createGridTests } from '@highcharts/grid-shared-react/tests/createGridTests';
import { Grid, GridOptions } from '../src/index';

createGridTests<GridOptions>(
    'Grid Lite',
    Grid,
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
