'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { type GridInstance, type GridOptions as GridLiteOptions } from '@highcharts/grid-lite-react';
import { type GridOptions as GridProOptions } from '@highcharts/grid-pro-react';
import { type GridRefHandle } from '../../../packages/grid-shared-react/src/components/BaseGrid';

// Import CSS - Next.js will handle this correctly
import '@highcharts/grid-lite/css/grid-lite.css';
import '@highcharts/grid-pro/css/grid-pro.css';

// Dynamically import Grids with SSR disabled to avoid window is not defined error
const GridLite = dynamic(
  () => import('@highcharts/grid-lite-react').then((mod) => mod.GridLite),
  { ssr: false }
);

const GridPro = dynamic(
  () => import('@highcharts/grid-pro-react').then((mod) => mod.GridPro),
  { ssr: false }
);

export default function Home() {
  const [liteOptions] = useState<GridLiteOptions>({
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

  const [proOptions] = useState<GridProOptions>({
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
  });

  const gridLite = useRef<GridRefHandle<GridLiteOptions> | null>(null);
  const gridPro = useRef<GridRefHandle<GridProOptions> | null>(null);

  const onButtonClick = () => {
    console.info('(ref) gridLite:', gridLite.current?.grid);
    console.info('(ref) gridPro:', gridPro.current?.grid);
  };
  const onGridLiteCallback = (grid: GridInstance<GridLiteOptions>) => {
    console.info('(callback) gridLite:', grid);
  };
  const onGridProCallback = (grid: GridInstance<GridProOptions>) => {
    console.info('(callback) gridPro:', grid);
  };

  return (
    <>
        <GridLite options={liteOptions} gridRef={gridLite} callback={onGridLiteCallback} />
        <GridPro options={proOptions} gridRef={gridPro} callback={onGridProCallback} />
        <button onClick={onButtonClick}>Click me</button>
    </>
  );
}


