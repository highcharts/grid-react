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

## Documentation

For detailed documentation on available options and features, see the [Highcharts Grid Lite documentation](https://www.highcharts.com/docs/grid/getting-started/grid-lite).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/packages/grid-lite-react/LICENSE).

