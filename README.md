# Highcharts Grid React

Monorepo containing React wrappers for [Highcharts Grid Lite](https://www.highcharts.com/docs/grid/getting-started/grid-lite) and [Highcharts Grid Pro](https://www.highcharts.com/docs/grid/getting-started/grid-pro).

## Packages

This monorepo contains the following packages:

### Published Packages

- **[@highcharts/grid-lite-react](./packages/grid-lite-react/)** - React wrapper for Highcharts Grid Lite
- **[@highcharts/grid-pro-react](./packages/grid-pro-react/)** - React wrapper for Highcharts Grid Pro

### Internal Packages

- **[@highcharts/grid-shared-react](./packages/grid-shared-react/)** - Shared core functionality used by both Grid Lite and Grid Pro React wrappers

## Quick Start

### Installation

```bash
# For Grid Lite
npm install @highcharts/grid-lite-react @highcharts/grid-lite

# For Grid Pro
npm install @highcharts/grid-pro-react @highcharts/grid-pro
```

### Usage

#### Grid Lite

```tsx
import React, { useState } from 'react';
import { GridLite, type Options } from '@highcharts/grid-lite-react';

function App() {
  const [options] = useState<Options>({
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

#### Grid Pro

```tsx
import React, { useState } from 'react';
import { GridPro, type Options } from '@highcharts/grid-pro-react';

function App() {
  const [options] = useState<Options>({
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

## Repository Structure

```
highcharts-grid-react/
├── packages/                    # Source packages
│   ├── grid-lite-react/        # Grid Lite React wrapper
│   ├── grid-pro-react/          # Grid Pro React wrapper
│   └── grid-shared-react/         # Shared core functionality
├── examples/                    # Example applications
│   ├── grid-lite-example/       # Example using Grid Lite
│   └── grid-pro-example/        # Example using Grid Pro
└── README.md                    # This file
```

### Packages

- **`packages/grid-lite-react/`** - React component wrapper for Highcharts Grid Lite. See [README](./packages/grid-lite-react/README.md) for details.
- **`packages/grid-pro-react/`** - React component wrapper for Highcharts Grid Pro. See [README](./packages/grid-pro-react/README.md) for details.
- **`packages/grid-shared-react/`** - Internal package containing shared React components and hooks used by both wrappers.

### Examples

- **`examples/grid-lite-example/`** - Example React application demonstrating how to use `@highcharts/grid-lite-react`
- **`examples/grid-pro-example/`** - Example React application demonstrating how to use `@highcharts/grid-pro-react`

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
# Run Grid Lite example
cd examples/grid-lite-example
pnpm install
pnpm dev

# Run Grid Pro example
cd examples/grid-pro-example
pnpm install
pnpm dev
```

## Documentation

- [Grid Lite React Documentation](./packages/grid-lite-react/README.md)
- [Grid Pro React Documentation](./packages/grid-pro-react/README.md)
- [Highcharts Grid Lite Documentation](https://www.highcharts.com/docs/grid/getting-started/grid-lite)
- [Highcharts Grid Pro Documentation](https://www.highcharts.com/docs/grid/getting-started/grid-pro)

## License

SEE LICENSE IN [LICENSE.md](https://github.com/highcharts/highcharts-dist/blob/master/LICENSE.md).

