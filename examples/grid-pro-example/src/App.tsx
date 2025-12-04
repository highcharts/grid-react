import { useState, useRef, useEffect } from 'react';
import {
  GridPro,
  type Options,
  type GridInstance
} from '@highcharts/grid-pro-react';

function App() {
  const [options, setOptions] = useState<Options>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
        age: [23, 34, 45, 56, 67],
        city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
        salary: [50000, 60000, 70000, 80000, 90000]
      }
    },
    caption: {
      text: 'Grid Pro'
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

  const grid = useRef<GridInstance<Options> | null>(null);

  useEffect(() => {
    if (grid.current) {
      // Do something with the grid instance
      console.log('Grid instance:', grid.current);
    }
  }, [grid.current]);

  return (
    <>
      <GridPro options={options} gridRef={grid} />
    </>
  );
}

export default App;

