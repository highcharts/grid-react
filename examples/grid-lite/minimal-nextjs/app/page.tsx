'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  type GridInstance,
  type GridOptions,
  type GridRefHandle
} from '@highcharts/grid-lite-react';

// Dynamically import Grid with SSR disabled to avoid window is not defined error
const GridLite = dynamic(
  () => import('@highcharts/grid-lite-react').then((mod) => mod.GridLite),
  { ssr: false }
);

export default function Home() {
  const [liteOptions] = useState<GridOptions>({
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

  const gridLite = useRef<GridRefHandle<GridOptions> | null>(null);

  const onButtonClick = () => {
    console.info('(ref) gridLite:', gridLite.current?.grid);
  };
  const onGridLiteCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) gridLite:', grid);
  };

  return (
    <>
        <GridLite options={liteOptions} gridRef={gridLite} callback={onGridLiteCallback} />
        <button onClick={onButtonClick}>Click me</button>
    </>
  );
}

