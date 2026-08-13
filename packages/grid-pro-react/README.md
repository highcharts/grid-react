# Highcharts Grid Pro React

<div align='center'>

<i>Official Highcharts Grid Pro for React</i>

<img src="https://assets.highcharts.com/images/highcharts-logo.svg" />

<p>Highcharts Grid Pro for React makes integrating editable, interactive data tables into your React projects intuitive and aligned with your React workflow, built with an API refined for React patterns.</p>

<img src="https://img.shields.io/npm/v/%40highcharts%2Fgrid-pro-react?style=flat&logoColor=white&label=npm&labelColor=2a2a2a&color=e53e3e" alt="NPM Version" />
<img src="https://img.shields.io/npm/dm/%40highcharts%2Fgrid-pro-react?style=flat&logoColor=white&label=downloads&labelColor=2a2a2a&color=10b981" alt="NPM Downloads" />
<img src="https://img.shields.io/discord/1318933807059042305?style=flat&logoColor=white&label=discord&labelColor=2a2a2a&color=5865F2" alt="Discord" />

</div>

## Why Highcharts Grid Pro React?

- **JSX-Native API** - Compose grids with React components such as `Data`, `Column`, `Caption`, and `Pagination`
- **Everything in Grid Lite** - Sorting, filtering, pagination, virtualization, theming, and accessibility
- **Interactive Data Editing** - Built-in editors for text, numbers, dates, and more
- **Validation** - Keep data clean with configurable rules and custom business logic
- **Sparklines** - Show trends in-cell, including Highcharts-powered visualizations
- **React Event Props** - Hook into load, update, sort, click, and pagination events with `on*` props
- **TypeScript Ready** - First-class types for options, refs, events, and component props

## License

Grid Pro is a commercial product. Getting licensed for commercial use makes you production-ready: license, updates and support for business-critical grids. To learn more, please contact our sales team at sales@highcharts.com. You can also review our Standard License Terms and our Annual License at the links below:

- [Standard License Terms](https://www.highcharts.com/license)
- [Terms & Conditions for Annual Subscription](https://shop.highcharts.com/license-annual-3.0)
- [Product page](https://www.highcharts.com/products/grid)

Looking for the free edition? See [@highcharts/grid-lite-react](https://www.npmjs.com/package/@highcharts/grid-lite-react).

## Installation

Install Highcharts Grid Pro React from npm:

```bash
npm install @highcharts/grid-pro-react
```

Or using yarn:

```bash
yarn add @highcharts/grid-pro-react
```

> **Note:** `@highcharts/grid-pro` is included as a dependency. `react` and `react-dom` are peer dependencies and are installed automatically with npm v7+. Requires React 18 or higher.

## Quick Start

Pass your Grid Pro license key with `gridKey`.

```jsx
import {
  Grid,
  Caption,
  Data,
  Column,
  Pagination
} from '@highcharts/grid-pro-react';

export function App() {
  return (
    <Grid gridKey="YOUR-GRID-KEY">
      <Caption>Team directory</Caption>
      <Data
        columns={{
          name: ['Alice', 'Bob', 'Charlie'],
          age: [23, 34, 45],
          city: ['New York', 'Oslo', 'Paris']
        }}
      />
      <Column columnId="name" headerFormat="Name" sortingEnabled />
      <Column columnId="age" dataType="number" headerFormat="Age" />
      <Column columnId="city" headerFormat="City" />
      <Pagination pageSize={5} />
    </Grid>
  );
}
```

## Grid props

The grid is rendered inside a container. You can pass layout, theme, and Pro event props directly to `Grid`:

```jsx
<Grid
  gridKey="YOUR-GRID-KEY"
  className="grid-shell"
  tableClassName="w-full"
  theme="hcg-theme-default"
  onAfterLoad={function () {
    console.log('Grid loaded');
  }}
>
  <Caption>Full-width grid</Caption>
  <Data columns={{ name: ['Alice', 'Bob'], age: [23, 34] }} />
</Grid>
```

- `gridKey` is required and sets your Grid Pro license key
- `className` applies to the React mount container
- `tableClassName` applies to the rendered table
- `theme` sets the Grid theme (`rendering.theme`)
- `onAfterLoad` and other `on*` props map to Grid Pro events

You can also pass a Grid options object via the `options` prop when you prefer a configuration object over JSX children.

## TypeScript

Use `GridOptions` for the `Grid` component `options` prop.

```tsx
import { useState } from 'react';
import { Grid, type GridOptions } from '@highcharts/grid-pro-react';

export function App() {
  const [options] = useState<GridOptions>({
    data: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <Grid gridKey="YOUR-GRID-KEY" options={options} />;
}
```

Use `GridRefHandle` and `GridInstance` when you need access to the underlying Grid instance.

```tsx
import { useRef } from 'react';
import {
  Grid,
  type GridOptions,
  type GridRefHandle,
  type GridInstance
} from '@highcharts/grid-pro-react';

export function App() {
  const gridRef = useRef<GridRefHandle<GridOptions> | null>(null);

  const onGridReady = (grid: GridInstance<GridOptions>) => {
    console.log('Grid instance:', grid);
  };

  return (
    <Grid
      gridKey="YOUR-GRID-KEY"
      gridRef={gridRef}
      callback={onGridReady}
      options={{
        data: {
          columns: {
            name: ['Alice', 'Bob'],
            age: [23, 34]
          }
        }
      }}
    />
  );
}
```

## Next.js

Grid uses browser APIs, so it must render on the client. Use a dynamic import with SSR disabled:

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { type GridOptions } from '@highcharts/grid-pro-react';

const Grid = dynamic(
  () => import('@highcharts/grid-pro-react').then((mod) => mod.Grid),
  { ssr: false }
);

export default function Page() {
  const [options] = useState<GridOptions>({
    data: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <Grid gridKey="YOUR-GRID-KEY" options={options} />;
}
```

The React package loads Grid CSS automatically. See the [Next.js guide](https://www.highcharts.com/docs/grid/frameworks/nextjs) for more detail.

## Documentation

For comprehensive guides and API documentation, visit the [Highcharts Grid React documentation](https://www.highcharts.com/docs/grid/frameworks/react).

- [Grid Pro getting started](https://www.highcharts.com/docs/grid/getting-started/grid-pro)
- [Highcharts Grid overview](https://www.highcharts.com/docs/grid/general)

## Support and feedback

We love to learn how you are using Highcharts, and what you would like to see from us in the future.

Join our vibrant community on [GitHub](https://github.com/highcharts/grid-react), [Stack Overflow](https://stackoverflow.com/tags/highcharts/), [Discord](https://discord.com/invite/xHxxcyyy6K), and the [Highcharts Forums](https://www.highcharts.com/forum/).

Commercial support packages are available, see [Highcharts Advantage](https://www.highcharts.com/highcharts-advantage/).
