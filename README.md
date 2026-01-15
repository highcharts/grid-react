# Highcharts Grid React

Monorepo containing React packages for [Highcharts Grid Lite](https://www.highcharts.com/docs/grid/getting-started/grid-lite) and [Highcharts Grid Pro](https://www.highcharts.com/docs/grid/getting-started/grid-pro).

## Packages

This monorepo contains the following packages:

### Published Packages

- **[@highcharts/grid-lite-react](./packages/grid-lite-react/)** - React package for Highcharts Grid Lite
- **[@highcharts/grid-pro-react](./packages/grid-pro-react/)** - React package for Highcharts Grid Pro

### Internal Packages

- **[@highcharts/grid-shared-react](./packages/grid-shared-react/)** - Shared core functionality used by both Grid Lite and Grid Pro React packages

## Quick Start

### Installation

```bash
# For Grid Lite
npm install @highcharts/grid-lite-react

# For Grid Pro
npm install @highcharts/grid-pro-react
```

### Usage

#### Grid Lite

```tsx
import React, { useState } from 'react';
import { Grid, type GridOptions } from '@highcharts/grid-lite-react';

function App() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <Grid options={options} />;
}
```

#### Grid Pro

```tsx
import React, { useState } from 'react';
import { Grid, type GridOptions } from '@highcharts/grid-pro-react';

function App() {
  const [options] = useState<GridOptions>({
    dataTable: {
      columns: {
        name: ['Alice', 'Bob', 'Charlie'],
        age: [23, 34, 45]
      }
    }
  });

  return <Grid options={options} />;
}
```

## Repository Structure

```
highcharts-grid-react/
├── packages/                    # Source packages
│   ├── grid-lite-react/        # Grid Lite React package
│   ├── grid-pro-react/          # Grid Pro React package
│   └── grid-shared-react/         # Shared core functionality
├── examples/                    # Example applications
│   ├── grid-lite/               # Grid Lite examples
│   │   ├── minimal-react/      # Minimal React example (Vite)
│   │   └── minimal-nextjs/      # Minimal Next.js example
│   └── grid-pro/                # Grid Pro examples
│       ├── minimal-react/       # Minimal React example (Vite)
│       └── minimal-nextjs/     # Minimal Next.js example
└── README.md                    # This file
```

### Packages

- **`packages/grid-lite-react/`** - React component package for Highcharts Grid Lite. See [README](./packages/grid-lite-react/README.md) for details.
- **`packages/grid-pro-react/`** - React component package for Highcharts Grid Pro. See [README](./packages/grid-pro-react/README.md) for details.
- **`packages/grid-shared-react/`** - Internal package containing shared React components and hooks used by both packages.

### Examples

- **`examples/grid-lite/minimal-react/`** - Minimal React application (Vite) demonstrating how to use `@highcharts/grid-lite-react`
- **`examples/grid-lite/minimal-nextjs/`** - Minimal Next.js application demonstrating how to use `@highcharts/grid-lite-react`
- **`examples/grid-pro/minimal-react/`** - Minimal React application (Vite) demonstrating how to use `@highcharts/grid-pro-react`
- **`examples/grid-pro/minimal-nextjs/`** - Minimal Next.js application demonstrating how to use `@highcharts/grid-pro-react`

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

# Run Grid Lite Next.js example
cd examples/grid-lite/minimal-nextjs
pnpm dev

# Run Grid Pro React example (Vite)
cd examples/grid-pro/minimal-react
pnpm dev

# Run Grid Pro Next.js example
cd examples/grid-pro/minimal-nextjs
pnpm dev
```

Note: Since all examples are part of the pnpm workspace, dependencies are installed at the root level with `pnpm install` from the repository root.

## Next.js Integration

Highcharts Grid React components can be used in Next.js applications. Since the Grid components require browser APIs, they need to be rendered on the client side only (without Server-Side Rendering).

### Setup

1. Install the required packages:

```bash
npm install @highcharts/grid-lite-react @highcharts/grid-lite
# or
npm install @highcharts/grid-pro-react @highcharts/grid-pro
```

2. Import the Grid component dynamically with SSR disabled:

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { type GridOptions } from '@highcharts/grid-lite-react';
import '@highcharts/grid-lite/css/grid-lite.css';

// Disable SSR for the Grid component
const Grid = dynamic(
  () => import('@highcharts/grid-lite-react').then((mod) => mod.Grid),
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

  return <Grid options={options} />;
}
```

### Important Notes

- **SSR is disabled**: The Grid components require browser APIs and cannot be rendered on the server. They are dynamically imported with `ssr: false` to ensure client-side only rendering.
- **Client Component**: The page or component using the Grid must be marked with `'use client'` directive.
- **CSS Import**: Don't forget to import the required CSS file for the Grid component.

See the [Next.js examples](./examples/) for complete working implementations.

## Documentation

- [Grid Lite React Documentation](./packages/grid-lite-react/README.md)
- [Grid Pro React Documentation](./packages/grid-pro-react/README.md)
- [Highcharts Grid Lite Documentation](https://www.highcharts.com/docs/grid/getting-started/grid-lite)
- [Highcharts Grid Pro Documentation](https://www.highcharts.com/docs/grid/getting-started/grid-pro)
- [Changelog](./CHANGELOG.md)
- [Releasing](./RELEASING.md)

## License

SEE LICENSE IN [LICENSE](https://github.com/highcharts/grid-react/blob/main/LICENSE).
