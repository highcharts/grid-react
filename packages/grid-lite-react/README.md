# @highcharts/grid-lite-react

React integration for [Highcharts Grid Lite](https://www.highcharts.com/docs/grid/general).

## Installation

```bash
npm install @highcharts/grid-lite-react
```

## Requirements

- React 18 or higher

## Quick Start

```tsx
import React, { useState } from 'react';
import { GridLite, type GridOptions } from '@highcharts/grid-lite-react';

function App() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45],
        city: ['New York', 'Oslo', 'Paris']
      }
    },
    caption: {
      text: 'My Grid'
    }
  });

  return <GridLite options={options} />;
}
```

## API

### `GridLite`

React component that wraps Highcharts Grid Lite.

#### Props

- `options` (required): Configuration options for the grid. Type: `GridOptions`
- `gridRef` (optional): Ref to access the underlying grid instance. Type: `RefObject<GridRefHandle<GridOptions>>`
- `callback` (optional): Callback function called when the grid is initialized. Receives the grid instance as parameter. Type: `(grid: GridInstance<GridOptions>) => void`

### `GridOptions`

Type exported from the package for TypeScript support.

```tsx
import type { GridOptions } from '@highcharts/grid-lite-react';
```

### `GridRefHandle`

Type for the ref handle that provides access to the underlying grid instance.

```tsx
import type { GridRefHandle } from '@highcharts/grid-lite-react';

const gridRef = useRef<GridRefHandle<GridOptions> | null>(null);
// Access the grid instance via gridRef.current?.grid
```

### `GridInstance`

Type for the grid instance returned by the ref or callback.

```tsx
import type { GridInstance } from '@highcharts/grid-lite-react';
```

### Using Ref and Callback

You can access the grid instance in two ways:

**Using ref:**
```tsx
import { useRef } from 'react';
import { GridLite, type GridRefHandle, type GridOptions } from '@highcharts/grid-lite-react';

function App() {
  const gridRef = useRef<GridRefHandle<GridOptions> | null>(null);
  
  const handleClick = () => {
    // Access the grid instance
    const gridInstance = gridRef.current?.grid;
    if (gridInstance) {
      console.log('Grid instance:', gridInstance);
    }
  };

  return (
    <>
      <GridLite options={options} gridRef={gridRef} />
      <button onClick={handleClick}>Access Grid</button>
    </>
  );
}
```

**Using callback:**
```tsx
import { GridLite, type GridInstance, type GridOptions } from '@highcharts/grid-lite-react';

function App() {
  const handleGridReady = (grid: GridInstance<GridOptions>) => {
    console.log('Grid initialized:', grid);
  };

  return <GridLite options={options} callback={handleGridReady} />;
}
```

### Next.js Integration

When using this package with Next.js, you need to disable Server-Side Rendering (SSR) for the Grid component:

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { type GridOptions } from '@highcharts/grid-lite-react';
import '@highcharts/grid-lite/css/grid-lite.css';

// Disable SSR for the Grid component
const GridLite = dynamic(
  () => import('@highcharts/grid-lite-react').then((mod) => mod.GridLite),
  { ssr: false }
);

export default function Page() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <GridLite options={options} />;
}
```

**Important:** The Grid component must be rendered client-side only. Always use `dynamic` import with `ssr: false` and mark your component with `'use client'` directive.

## Documentation

For detailed documentation on available options and features, see the [Highcharts Grid Lite documentation](https://www.highcharts.com/docs/grid/general).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/packages/grid-lite-react/LICENSE).

