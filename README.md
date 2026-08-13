# Highcharts Grid React

<div align='center'>

<i>Official Highcharts Grid for React</i>

<img src="https://assets.highcharts.com/images/highcharts-logo.svg" />

<p>Official React packages for Highcharts Grid Lite and Highcharts Grid Pro. Built for React patterns, with a JSX-native API, TypeScript types, and the Grid CSS included.</p>

<img src="https://img.shields.io/npm/v/%40highcharts%2Fgrid-lite-react?style=flat&logoColor=white&label=grid-lite-react&labelColor=2a2a2a&color=e53e3e" alt="Grid Lite React NPM Version" />
<img src="https://img.shields.io/npm/v/%40highcharts%2Fgrid-pro-react?style=flat&logoColor=white&label=grid-pro-react&labelColor=2a2a2a&color=e53e3e" alt="Grid Pro React NPM Version" />
<img src="https://img.shields.io/discord/1318933807059042305?style=flat&logoColor=white&label=discord&labelColor=2a2a2a&color=5865F2" alt="Discord" />

</div>

This is the working repository for the Grid React packages. If you want to use Grid in a React app, install a distribution package from npm rather than this repo.

## Why Highcharts Grid React?

- **JSX-Native API** - Compose grids with React components such as `Data`, `Column`, `Caption`, and `Pagination`
- **Lite and Pro** - Start with free Grid Lite, or use Grid Pro for editing, validation, sparklines, and events
- **Self-Contained Packages** - Grid setup, cleanup, and CSS are handled for you
- **Built for Large Tables** - Row virtualization keeps scrolling smooth with thousands of records
- **Accessibility First** - Semantic HTML tables with keyboard navigation and screen reader support
- **TypeScript Ready** - First-class types for options, refs, events, and component props

## Packages

### Published Packages

- **[@highcharts/grid-lite-react](./packages/grid-lite-react/)** - React package for Highcharts Grid Lite
- **[@highcharts/grid-pro-react](./packages/grid-pro-react/)** - React package for Highcharts Grid Pro

### Internal Packages

- **[@highcharts/grid-shared-react](./packages/grid-shared-react/)** - Shared core functionality used by both Grid Lite and Grid Pro React packages

## Installation

```bash
# For Grid Lite
npm install @highcharts/grid-lite-react

# For Grid Pro
npm install @highcharts/grid-pro-react
```

> **Note:** The matching Grid Core package is included as a dependency. `react` and `react-dom` are peer dependencies and are installed automatically with npm v7+. Requires React 18 or higher.

## Quick Start

### Grid Lite

```jsx
import { Grid, Caption, Data, Column } from '@highcharts/grid-lite-react';

export function App() {
  return (
    <Grid>
      <Caption>Team directory</Caption>
      <Data
        columns={{
          name: ['Alice', 'Bob', 'Charlie'],
          age: [23, 34, 45]
        }}
      />
      <Column columnId="name" headerFormat="Name" />
      <Column columnId="age" dataType="number" headerFormat="Age" />
    </Grid>
  );
}
```

### Grid Pro

```jsx
import { Grid, Caption, Data, Column } from '@highcharts/grid-pro-react';

export function App() {
  return (
    <Grid gridKey="YOUR-GRID-KEY">
      <Caption>Team directory</Caption>
      <Data
        columns={{
          name: ['Alice', 'Bob', 'Charlie'],
          age: [23, 34, 45]
        }}
      />
      <Column columnId="name" headerFormat="Name" />
      <Column columnId="age" dataType="number" headerFormat="Age" />
    </Grid>
  );
}
```

See the package READMEs for TypeScript, refs, Next.js, and more:

- [Grid Lite React](./packages/grid-lite-react/README.md)
- [Grid Pro React](./packages/grid-pro-react/README.md)

## Repository Structure

```
highcharts-grid-react/
├── packages/                    # Source packages
│   ├── grid-lite-react/        # Grid Lite React package
│   ├── grid-pro-react/          # Grid Pro React package
│   └── grid-shared-react/       # Shared core functionality
├── examples/                    # Example applications
│   ├── grid-lite/               # Grid Lite examples
│   │   ├── minimal-react/      # Minimal React example (Vite)
│   │   ├── components-react/    # JSX component API example (Vite)
│   │   └── minimal-nextjs/      # Minimal Next.js example
│   └── grid-pro/                # Grid Pro examples
│       ├── minimal-react/       # Minimal React example (Vite)
│       ├── components-react/    # JSX component API example (Vite)
│       └── minimal-nextjs/      # Minimal Next.js example
└── README.md                    # This file
```

## Development

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

### Prerequisites

- Node.js (version specified in `.nvmrc` or package.json)
- pnpm 10.23.0 or higher

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Lint all packages
pnpm lint
```

### Working with Examples

To run the example applications:

```bash
# Run Grid Lite React example (Vite)
cd examples/grid-lite/minimal-react
pnpm dev

# Run Grid Lite JSX components example
cd examples/grid-lite/components-react
pnpm dev

# Run Grid Lite Next.js example
cd examples/grid-lite/minimal-nextjs
pnpm dev

# Run Grid Pro React example (Vite)
cd examples/grid-pro/minimal-react
pnpm dev

# Run Grid Pro JSX components example
cd examples/grid-pro/components-react
pnpm dev

# Run Grid Pro Next.js example
cd examples/grid-pro/minimal-nextjs
pnpm dev
```

Note: Since all examples are part of the pnpm workspace, dependencies are installed at the root level with `pnpm install` from the repository root.

## Next.js Integration

Highcharts Grid React components can be used in Next.js applications. Grid uses browser APIs, so it must render on the client. See the [Next.js guide](https://www.highcharts.com/docs/grid/frameworks/nextjs) and the package READMEs for a complete example.

## Documentation

- [Grid Lite React](./packages/grid-lite-react/README.md)
- [Grid Pro React](./packages/grid-pro-react/README.md)
- [Highcharts Grid with React](https://www.highcharts.com/docs/grid/frameworks/react)
- [Highcharts Grid Lite](https://www.highcharts.com/docs/grid/getting-started/grid-lite)
- [Highcharts Grid Pro](https://www.highcharts.com/docs/grid/getting-started/grid-pro)
- [Changelog](./CHANGELOG.md)
- [Releasing](./RELEASING.md)

## Support and feedback

We love to learn how you are using Highcharts, and what you would like to see from us in the future.

Join our vibrant community on [GitHub](https://github.com/highcharts/grid-react), [Stack Overflow](https://stackoverflow.com/tags/highcharts/), [Discord](https://discord.com/invite/xHxxcyyy6K), and the [Highcharts Forums](https://www.highcharts.com/forum/).

Commercial support packages are available, see [Highcharts Advantage](https://www.highcharts.com/highcharts-advantage/).

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/LICENSE).
