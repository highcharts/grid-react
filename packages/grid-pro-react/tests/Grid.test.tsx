import { createGridTests } from '@highcharts/grid-shared-react/tests/createGridTests';
import { Grid, GridOptions } from '../src/index';

const GRID_KEY = 'AAAA-BBBB-CCCC-DDDD-EEEE-FFFF';

createGridTests<GridOptions, { gridKey: string }>(
    'Grid Pro',
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
    },
    {
        gridKey: GRID_KEY
    }
);
