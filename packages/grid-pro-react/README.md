# @highcharts/grid-pro-react

React wrapper for [Highcharts Grid Pro](https://www.highcharts.com/docs/grid/getting-started/grid-pro).

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

### `GridOptions`

Type exported from the package for TypeScript support.

```tsx
import type { GridOptions } from '@highcharts/grid-pro-react';
```

## Documentation

For detailed documentation on available options and features, see the [Highcharts Grid Pro documentation](https://www.highcharts.com/docs/grid/getting-started/grid-pro).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/packages/grid-pro-react/LICENSE).
