import { useState, useRef, useLayoutEffect } from 'react';
import {
  GridPro,
  type GridOptions,
  type GridInstance
} from '@highcharts/grid-pro-react';

function App() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
        age: [23, 34, 45, 56, 67],
        city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
        salary: [50000, 60000, 70000, 80000, 90000],
        active: [true, false, true, false, true]
      }
    },
    columnDefaults: {
      cells: {
        editMode: {
          enabled: true
        }
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
    },
    columns: [{
      id: 'active',
      cells: {
        renderer: {
          type: 'checkbox'
        }
      }
    }]
  });

  const grid = useRef<GridInstance<GridOptions> | null>(null);

  useLayoutEffect(() => {
    if (grid.current) {
      console.log('Grid instance available:', grid.current);
    }
  }, [grid.current]);

  return (
    <>
      <GridPro options={options} gridRef={grid} />
    </>
  );
}

export default App;

