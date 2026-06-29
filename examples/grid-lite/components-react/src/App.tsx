import { useState, useRef } from 'react';
import {
  // type GridInstance,
  // type GridRefHandle,
  type GridOptions,
  Grid
} from '@highcharts/grid-lite-react';

function App() {
  /* const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  const onButtonClick = () => {
    console.info('(ref) grid:', grid.current?.grid);
  };
  const onGridCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) grid:', grid);
  };*/

  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
        age: [23, 34, 45, 56, 67],
        city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
        salary: [50000, 60000, 70000, 80000, 90000]
      }
    }
  });

  return (
    <>
      <Grid
        options={options}
        // gridRef={grid}
        // callback={onGridCallback} 
      >
        <div>Whatever</div>
        {/* <Caption>Grid Caption</Caption> */}
        {/* <Description>Grid Description</Description>
        <DataTable>
          <Column>
            <Header>Grid Header</Header>
            <Cell>Grid Cell</Cell>
          </Column>
        </DataTable> */}
        {/* <Pagination>Grid Pagination</Pagination> */}
      </Grid>
      {/* <button onClick={onButtonClick}>Click me</button> */}
    </>
  );
}

export default App;
