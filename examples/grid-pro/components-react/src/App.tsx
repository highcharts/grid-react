import { useState } from 'react';
import {
  type GridInstance,
  type GridOptions,
  Grid,
  Caption,
  Data,
  ColumnDefaults,
  Column,
  Description,
  Pagination
} from '@highcharts/grid-pro-react';

const GRID_KEY = 'AAAA-BBBB-CCCC-DDDD-EEEE-FFFF';

function App() {
  const [dataSource, setDataSource] = useState({
    name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    age: [23, 34, 45, 56, 67],
    city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
    salary: [50000, 60000, 70000, 80000, 90000]
  });

  const onButtonClick = () => {
    setDataSource({
      name: ['John', 'Jane', 'Jim', 'Jill', 'Jack'],
      age: [30, 25, 35, 40, 45],
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
      salary: [40000, 35000, 45000, 50000, 55000]
    });
  };

  const onGridCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) grid:', grid);
  };

  return (
    <>
      <Grid
        gridKey={GRID_KEY}
        callback={onGridCallback}
        onAfterLoad={function () {
          console.info('Grid loaded');
        }}
      >
        <Data columns={dataSource} />
        <ColumnDefaults
          dataType="string"
          sortingEnabled
          filteringEnabled
        />
        <Caption>Grid Pro Components</Caption>
        <Description>Declarative API with gridKey and event props</Description>
        <Column
          columnId="name"
          headerFormat="Name"
          onAfterSort={function () {
            console.info('Sorted name column');
          }}
          onCellClick={function () {
            console.info('Clicked name cell', this);
          }}
          onHeaderClick={function () {
            console.info('Clicked name header', this);
          }}
        />
        <Column
          columnId="age"
          dataType="number"
          headerFormat="Age"
        />
        <Column
          columnId="city"
          headerFormat="City"
        />
        <Column
          columnId="salary"
          dataType="number"
          headerFormat="Salary (USD)"
          cellFormat="${value}"
        />
        <Pagination
          page={1}
          pageSize={3}
          pageSizeOptions={[3, 5, 10]}
          onBeforePageChange={function (event) {
            console.info('Before page change', event);
          }}
        />
      </Grid>
      <div id="controls">
        <button onClick={onButtonClick}>Update data</button>
      </div>
    </>
  );
}

export default App;
