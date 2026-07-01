import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridRefHandle,
  type GridOptions,
  Grid,
  Caption,
  Description
} from '@highcharts/grid-lite-react';

function App() {
  // const grid = useRef<GridRefHandle<GridOptions> | null>(null);
  const [description, setDescription] = useState<string>('Grid Description');
  const onSetDescriptionClick = () => {
    setDescription('This is a new description');
    // console.info('(ref) grid:', grid.current?.grid);
  };

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
        // callback={(grid) => console.info('(callback) grid:', grid)} 
      >
        <Caption>Grid Caption</Caption>
        <Description>{description}</Description>
        { /* <DataTable>
          <Column>
            <Header>Grid Header</Header>
            <Cell>Grid Cell</Cell>
          </Column>
        </DataTable> */}
        {/* <Pagination>Grid Pagination</Pagination> */}
      </Grid>
      <button onClick={onSetDescriptionClick}>Set new description</button>
    </>
  );
}

export default App;
