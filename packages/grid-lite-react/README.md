# Highcharts Grid Lite React

<div align='center'>

<i>Official Highcharts Grid Lite for React</i>

<img src="https://assets.highcharts.com/images/highcharts-logo.svg" />

<p>Highcharts Grid Lite for React makes integrating interactive data tables into your React projects intuitive and aligned with your React workflow, built with an API refined for React patterns.</p>

<img src="https://img.shields.io/npm/v/%40highcharts%2Fgrid-lite-react?style=flat&logoColor=white&label=npm&labelColor=2a2a2a&color=e53e3e" alt="NPM Version" />
<img src="https://img.shields.io/npm/dm/%40highcharts%2Fgrid-lite-react?style=flat&logoColor=white&label=downloads&labelColor=2a2a2a&color=10b981" alt="NPM Downloads" />
<img src="https://img.shields.io/discord/1318933807059042305?style=flat&logoColor=white&label=discord&labelColor=2a2a2a&color=5865F2" alt="Discord" />

</div>

## Why Highcharts Grid Lite React?

- **Options or JSX** - Pass a Grid `options` object, compose with React components such as `Data`, `Column`, `Caption`, and `Pagination`, or mix both
- **Self-Contained Package** - Grid setup, cleanup, and CSS are handled for you
- **Built for Large Tables** - Row virtualization keeps scrolling smooth with thousands of records
- **Interactive by Default** - Sorting, filtering, and pagination without extra libraries
- **Accessibility First** - Renders a semantic HTML table with keyboard navigation and screen reader support
- **CSS Theming** - Customize appearance with CSS variables and class names that fit your app
- **TypeScript Ready** - First-class types for options, refs, and component props

## License

Highcharts Grid Lite is free to use. Review the license terms at the links below:

- [Standard License Terms](https://www.highcharts.com/license)
- [Product page](https://www.highcharts.com/products/grid)

Need editing, validation, sparklines, or events? See [@highcharts/grid-pro-react](https://www.npmjs.com/package/@highcharts/grid-pro-react).

## Installation

Install Highcharts Grid Lite React from npm:

```bash
npm install @highcharts/grid-lite-react
```

Or using yarn:

```bash
yarn add @highcharts/grid-lite-react
```

> **Note:** `@highcharts/grid-lite` is included as a dependency. `react` and `react-dom` are peer dependencies and are installed automatically with npm v7+. Requires React 18 or higher.

## Quick Start

Components are optional. You can pass a Grid `options` object to `<Grid>` the same way as before, use JSX components, or mix both.

### Using options

```jsx
import { useState } from 'react';
import { Grid, type GridOptions } from '@highcharts/grid-lite-react';

export function App() {
  const [options] = useState<GridOptions>({
    caption: { text: 'Team directory' },
    data: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45],
        city: ['New York', 'Oslo', 'Paris']
      }
    }
  });

  return <Grid options={options} />;
}
```

### Using components

```jsx
import { Grid, Caption, Data, Column, Pagination } from '@highcharts/grid-lite-react';

export function App() {
  return (
    <Grid>
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

The grid is rendered inside a container. You can pass layout and theme props directly to `Grid`:

```jsx
<Grid
  className="grid-shell"
  tableClassName="w-full"
  theme="hcg-theme-default"
>
  <Caption>Full-width grid</Caption>
  <Data columns={{ name: ['Alice', 'Bob'], age: [23, 34] }} />
</Grid>
```

- `className` applies to the React mount container
- `tableClassName` applies to the rendered table
- `theme` sets the Grid theme (`rendering.theme`)

## TypeScript

Use `GridOptions` for the `Grid` component `options` prop.

```tsx
import { useState } from 'react';
import { Grid, type GridOptions } from '@highcharts/grid-lite-react';

export function App() {
  const [options] = useState<GridOptions>({
    data: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <Grid options={options} />;
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
} from '@highcharts/grid-lite-react';

export function App() {
  const gridRef = useRef<GridRefHandle<GridOptions> | null>(null);

  const onGridReady = (grid: GridInstance<GridOptions>) => {
    console.log('Grid instance:', grid);
  };

  return (
    <Grid
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
import { type GridOptions } from '@highcharts/grid-lite-react';

const Grid = dynamic(
  () => import('@highcharts/grid-lite-react').then((mod) => mod.Grid),
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

  return <Grid options={options} />;
}
```

The React package loads Grid CSS automatically. See the [Next.js guide](https://www.highcharts.com/docs/grid/frameworks/nextjs) for more detail.

## Documentation

For comprehensive guides and API documentation, visit the [Highcharts Grid React documentation](https://www.highcharts.com/docs/grid/frameworks/react).

- [Grid Lite getting started](https://www.highcharts.com/docs/grid/getting-started/grid-lite)
- [Highcharts Grid overview](https://www.highcharts.com/docs/grid/general)

## Support and feedback

We love to learn how you are using Highcharts, and what you would like to see from us in the future.

Join our vibrant community on [GitHub](https://github.com/highcharts/grid-react), [Stack Overflow](https://stackoverflow.com/tags/highcharts/), [Discord](https://discord.com/invite/xHxxcyyy6K), and the [Highcharts Forums](https://www.highcharts.com/forum/).

Commercial support packages are available, see [Highcharts Advantage](https://www.highcharts.com/highcharts-advantage/).
