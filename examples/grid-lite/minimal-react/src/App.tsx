import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridOptions,
  type GridRefHandle,
  GridLite
} from '@highcharts/grid-lite-react';

function App() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
        age: [23, 34, 45, 56, 67],
        city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
        salary: [50000, 60000, 70000, 80000, 90000]
      }
    },
    caption: {
      text: 'Grid Lite'
    },
    pagination: {
      enabled: true,
      pageSize: 3,
      controls: {
        pageSizeSelector: true,
        pageButtons: true
      }
    }
  });
  const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  const onButtonClick = () => {
    console.info('(ref) gridLite:', grid.current?.grid);
  };
  const onGridLiteCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) gridLite:', grid);
  };

  return (
    <>
      <GridLite options={options} gridRef={grid} callback={onGridLiteCallback} />
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
}

export default App;

