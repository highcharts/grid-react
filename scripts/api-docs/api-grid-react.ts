/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 * Usage:
 * node scripts/api-docs/api-grid-react.ts [--out <path>]
 *
 */

import FS from 'node:fs';
import Path from 'node:path';
import Process from 'node:process';
import { extractGridReactTree } from './extractGridReact.ts';

const repoRoot = Path.resolve(import.meta.dirname, '../..');

function readArg(flag: string): string | undefined {
    const index = Process.argv.indexOf(flag);
    if (index < 0) {
        return undefined;
    }
    return Process.argv[index + 1];
}

const outPath = Path.resolve(
    repoRoot,
    readArg('--out') || 'tmp/tree-grid-react.json'
);

const tree = extractGridReactTree({
    liteDts: Path.join(
        repoRoot,
        'packages/grid-lite-react/dist/index.d.ts'
    ),
    proDts: Path.join(
        repoRoot,
        'packages/grid-pro-react/dist/index.d.ts'
    ),
    litePackageRoot: Path.join(repoRoot, 'packages/grid-lite-react')
});

FS.mkdirSync(Path.dirname(outPath), { recursive: true });
FS.writeFileSync(outPath, JSON.stringify(tree, null, 4) + '\n');

const categories = Object.keys(tree).filter((key) => key !== '_meta');
Process.stdout.write(
    `Wrote ${outPath} (${categories.length} categories).\n`
);
