# @highcharts/grid-pro-react

React wrapper for [Highcharts Grid Pro](https://www.highcharts.com/docs/grid/general).

## Installation

```bash
npm install @highcharts/grid-pro-react
```

## Requirements

- React 18 or higher

## Quick Start

```tsx
import React, { useState } from 'react';
import { GridPro, type GridOptions } from '@highcharts/grid-pro-react';

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

  return <GridPro options={options} />;
}
```

## API

### `GridPro`

React component that wraps Highcharts Grid Pro.

#### Props

- `options` (required): Configuration options for the grid. Type: `GridOptions`
- `gridRef` (optional): Ref to access the underlying grid instance. Type: `RefObject<GridRefHandle<GridOptions>>`
- `callback` (optional): Callback function called when the grid is initialized. Receives the grid instance as parameter. Type: `(grid: GridInstance<GridOptions>) => void`

### `GridOptions`

Type exported from the package for TypeScript support.

```tsx
import type { GridOptions } from '@highcharts/grid-pro-react';
```

### `GridRefHandle`

Type for the ref handle that provides access to the underlying grid instance.

```tsx
import type { GridRefHandle } from '@highcharts/grid-pro-react';

const gridRef = useRef<GridRefHandle<GridOptions> | null>(null);
// Access the grid instance via gridRef.current?.grid
```

### `GridInstance`

Type for the grid instance returned by the ref or callback.

```tsx
import type { GridInstance } from '@highcharts/grid-pro-react';
```

### Using Ref and Callback

You can access the grid instance in two ways:

**Using ref:**
```tsx
import { useRef } from 'react';
import { GridPro, type GridRefHandle, type GridOptions } from '@highcharts/grid-pro-react';

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
      <GridPro options={options} gridRef={gridRef} />
      <button onClick={handleClick}>Access Grid</button>
    </>
  );
}
```

**Using callback:**
```tsx
import { GridPro, type GridInstance, type GridOptions } from '@highcharts/grid-pro-react';

function App() {
  const handleGridReady = (grid: GridInstance<GridOptions>) => {
    console.log('Grid initialized:', grid);
  };

  return <GridPro options={options} callback={handleGridReady} />;
}
```

### Next.js Integration

When using this package with Next.js, you need to disable Server-Side Rendering (SSR) for the Grid component:

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { type GridOptions } from '@highcharts/grid-pro-react';
import '@highcharts/grid-pro/css/grid-pro.css';

// Disable SSR for the Grid component
const GridPro = dynamic(
  () => import('@highcharts/grid-pro-react').then((mod) => mod.GridPro),
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

  return <GridPro options={options} />;
}
```

**Important:** The Grid component must be rendered client-side only. Always use `dynamic` import with `ssr: false` and mark your component with `'use client'` directive.

## Documentation

For detailed documentation on available options and features, see the [Highcharts Grid Pro documentation](https://www.highcharts.com/docs/grid/general).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/packages/grid-pro-react/LICENSE).
