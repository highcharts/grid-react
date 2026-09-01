import { describe, expect, it } from 'vitest';
import FS from 'node:fs';
import Path from 'node:path';
import {
    extractFromDts,
    extractGridReactTree,
    mergeComponents
} from './extractGridReact.ts';

const repoRoot = Path.resolve(import.meta.dirname, '../..');
const liteDts = Path.join(
    repoRoot,
    'packages/grid-lite-react/dist/index.d.ts'
);
const proDts = Path.join(
    repoRoot,
    'packages/grid-pro-react/dist/index.d.ts'
);

function requireDts(): void {
    if (!FS.existsSync(liteDts) || !FS.existsSync(proDts)) {
        throw new Error('Missing dist/*.d.ts. Run `pnpm build` first.');
    }
}

describe('extractGridReact', () => {
    it('maps Caption.children to caption.text', () => {
        requireDts();
        const caption = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        ).find((component) => component.name === 'Caption');

        expect(caption).toBeDefined();
        const children = caption?.props.find((prop) => prop.name === 'children');
        expect(children?.hrefPath).toBe('caption.text');
        expect(children?.description).toMatch(/children/i);
    });

    it('maps Column.headerFormat to columnDefaults.header.format', () => {
        requireDts();
        const column = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        ).find((component) => component.name === 'Column');

        expect(column).toBeDefined();
        const headerFormat = column?.props.find(
            (prop) => prop.name === 'headerFormat'
        );
        expect(headerFormat?.hrefPath).toBe('columnDefaults.header.format');
    });

    it('keeps React-only Grid.className without a crossref', () => {
        requireDts();
        const grid = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        ).find((component) => component.name === 'Grid');

        expect(grid).toBeDefined();
        const className = grid?.props.find((prop) => prop.name === 'className');
        expect(className?.hrefPath).toBeUndefined();
    });

    it('merges Pro event props onto Column', () => {
        requireDts();
        const lite = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        );
        const pro = extractFromDts(
            proDts,
            '@highcharts/grid-pro-react',
            'grid-pro-react/index.d.ts'
        );
        const column = mergeComponents(lite, pro).find(
            (component) => component.name === 'Column'
        );
        const click = column?.props.find(
            (prop) => prop.name === 'onCellClick'
        );

        expect(click?.hrefPath).toBe('columns.cells.events.click');
    });

    it('writes tree-react contract for Caption.children', () => {
        requireDts();
        const tree = extractGridReactTree({
            liteDts,
            proDts,
            litePackageRoot: Path.join(
                repoRoot,
                'packages/grid-lite-react'
            )
        });
        const caption = (
            tree.Components as {
                children: Record<string, {
                    children: Record<string, {
                        doclet: {
                            crossref?: string[];
                            description?: string;
                        };
                    }>;
                }>;
            }
        ).children.Caption.children.children;

        expect(caption.doclet.crossref).toEqual([
            'grid',
            'options/caption/text'
        ]);
        expect(tree._meta).toEqual(expect.objectContaining({
            version: expect.any(String),
            branch: expect.any(String),
            commit: expect.any(String)
        }));
    });
});
