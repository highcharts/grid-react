'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { GridLite, type GridOptions as GridLiteOptions, type GridInstance as GridLiteInstance } from '@highcharts/grid-lite-react';
import { GridPro, type GridOptions as GridProOptions, type GridInstance as GridProInstance } from '@highcharts/grid-pro-react';

// Import CSS - Next.js will handle this correctly
import '@highcharts/grid-lite/css/grid-lite.css';
import '@highcharts/grid-pro/css/grid-pro.css';

// Dynamically import Grids with SSR disabled to avoid window is not defined error
// const GridLite = dynamic(
//   () => import('@highcharts/grid-lite-react').then((mod) => mod.GridLite),
//   { ssr: false }
// );

// const GridPro = dynamic(
//   () => import('@highcharts/grid-pro-react').then((mod) => mod.GridPro),
//   { ssr: false }
// );

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

  const gridLite = useRef<GridLiteInstance<GridLiteOptions> | null>(null);
  const gridPro = useRef<GridProInstance<GridProOptions> | null>(null);

  useLayoutEffect(() => {
    if (gridLite.current) {
      console.log('Grid Lite instance available:', gridLite.current);
    }
    if (gridPro.current) {
      console.log('Grid Pro instance available:', gridPro.current);
    }
    // Don't depend on .current - it changes but shouldn't trigger re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridLite.current, gridPro.current]);

  return (
    <>
        <GridLite options={liteOptions} gridRef={gridLite} />
        <GridPro options={proOptions} gridRef={gridPro} />
    </>
  );
}


