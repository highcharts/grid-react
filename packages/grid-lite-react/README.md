# @highcharts/grid-lite-react

React wrapper for [Highcharts Grid Lite](https://www.highcharts.com/docs/grid/getting-started/grid-lite).

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

### `GridOptions`

Type exported from the package for TypeScript support.

```tsx
import type { GridOptions } from '@highcharts/grid-lite-react';
```

## Examples

This package includes example applications demonstrating usage:

- **[React Example](../../examples/grid-lite/minimal-react/)** - Minimal React application using Vite
- **[Next.js Example](../../examples/grid-lite/minimal-nextjs/)** - Minimal Next.js application

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

For detailed documentation on available options and features, see the [Highcharts Grid Lite documentation](https://www.highcharts.com/docs/grid/getting-started/grid-lite).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/packages/grid-lite-react/LICENSE).

