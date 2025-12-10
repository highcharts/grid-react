import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridOptions,
  type GridRefHandle,
  GridPro,
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
  const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  const onButtonClick = () => {
    console.info('(ref) gridPro:', grid.current?.grid);
  };
  const onGridProCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) gridPro:', grid);
  };

  return (
    <>
      <GridPro options={options} gridRef={grid} callback={onGridProCallback} />
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
}

export default App;

