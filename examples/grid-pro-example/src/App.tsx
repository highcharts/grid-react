import { useState } from 'react';
import {
  GridPro,
  type Options
} from '@highcharts/grid-pro-react';

function App() {
  const [options] = useState<Options>({
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

  return (
    <>
      <GridPro options={options} />
    </>
  );
}

export default App;

