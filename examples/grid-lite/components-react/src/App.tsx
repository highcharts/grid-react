import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridRefHandle,
  type GridOptions,
  Grid,
  Caption,
  Data,
  DataTable
} from '@highcharts/grid-lite-react';

function App() {
  const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  // ==== OPTIONS ====
  // const [options] = useState<GridOptions>({
  //   dataTable: {
  //     columns: {
  //       name: ['1111Alice', 'Bob', 'Charlie', 'David', 'Eve'],
  //       age: [23, 34, 45, 56, 67],
  //       city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
  //       salary: [50000, 60000, 70000, 80000, 90000]
  //     }
  //   }
  // });

  // ==== DATA ====
  // Data Columns
  const [dataSource, setDataSource] = useState({
    name: ['COLUMNS', 'Bob', 'Charlie', 'David', 'Eve'],
    age: [23, 34, 45, 56, 67],
    city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
    salary: [50000, 60000, 70000, 80000, 90000]
  });

  // Data Table
  const dataTable = new DataTable({
    columns: {
      name: ['DATATABLE', 'Bob', 'Charlie', 'David', 'Eve'],
      age: [23, 34, 45, 56, 67],
      city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
      salary: [50000, 60000, 70000, 80000, 90000]
    }
  });

  // ==== ACTIONS ====
  const onButtonClick = () => {
    // console.info('(ref) grid:', grid.current?.grid);
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
        // options={options}
        // gridRef={grid}
        callback={onGridCallback} 
      >
        <Caption>Grid Caption</Caption>
        <Data
          // dataTable={dataTable}
          columns={dataSource}
        />
          {/* <Column>
            <Header>Grid Header</Header>
            <Cell>Grid Cell</Cell>
          </Column> */}
        {/* <Description>Grid Description</Description> */}
        {/* <Pagination>Grid Pagination</Pagination> */}
      </Grid>
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
}

export default App;
