import { describe, expect, it } from 'vitest';
import FS from 'node:fs';
import OS from 'node:os';
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
    it('omits Caption.children from the public API tree', () => {
        requireDts();
        const caption = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        ).find((component) => component.name === 'Caption');

        expect(caption).toBeDefined();
        expect(
            caption?.props.some((prop) => prop.name === 'children')
        ).toBe(false);
        const className = caption?.props.find(
            (prop) => prop.name === 'className'
        );
        expect(className?.hrefPath).toBe('caption.className');
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
        expect(click?.proOnly).toBe(true);
        expect(
            column?.props.find((prop) => prop.name === 'headerFormat')?.proOnly
        ).toBeFalsy();
    });

    it('writes tree-react contract for Caption.className', () => {
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
                            product?: string;
                        };
                    }>;
                }>;
            }
        ).children.Caption.children;

        expect(caption.children).toBeUndefined();
        expect(caption.className.doclet.crossref).toEqual([
            'grid',
            'options/caption/className'
        ]);
        expect(caption.className.doclet.product).toBeUndefined();
        expect(caption.className.doclet.default).toBeUndefined();
        expect(tree._meta).toEqual(expect.objectContaining({
            version: expect.any(String),
            branch: expect.any(String),
            commit: expect.any(String)
        }));

        const grid = tree.Grid as {
            doclet: { description?: string };
            meta: { fullname: string };
            children: Record<string, { meta: { fullname: string } }>;
        };
        expect(grid.meta.fullname).toBe('Grid');
        expect(grid.children.Grid).toBeUndefined();
        expect(grid.doclet.description).toContain(
            "from '@highcharts/grid-lite-react'; // or '@highcharts/grid-pro-react'"
        );
        expect(grid.doclet.description)
            .not.toMatch(/Grid Lite React component/);

        const captionPage = (
            tree.Components as {
                children: Record<string, { doclet: { description?: string } }>;
            }
        ).children.Caption;
        expect(captionPage.doclet.description).toContain(
            "from '@highcharts/grid-lite-react'; // or '@highcharts/grid-pro-react'"
        );

        const column = (
            tree.Components as {
                children: Record<string, {
                    children: Record<string, {
                        doclet: { product?: string };
                    }>;
                }>;
            }
        ).children.Column.children;
        expect(column.onCellClick.doclet.product).toBe('gridpro');
        expect(column.headerFormat.doclet.product).toBeUndefined();
    });

    it('extracts @default into the tree doclet and strips it from the description', () => {
        const dir = FS.mkdtempSync(Path.join(OS.tmpdir(), 'grid-react-api-docs-'));
        const dtsPath = Path.join(dir, 'index.d.ts');

        FS.writeFileSync(dtsPath, `
export interface PaginationProps {
    /**
     * Defaults to true when Pagination is used.
     *
     * @default true
     *
     * Links to Grid.Options.pagination.enabled
     */
    enabled?: boolean;
}
declare function Pagination(props: PaginationProps): null;
export { Pagination };
`);

        try {
            const pagination = extractFromDts(
                dtsPath,
                '@highcharts/grid-lite-react',
                'grid-lite-react/index.d.ts'
            ).find((component) => component.name === 'Pagination');
            const enabled = pagination?.props.find(
                (prop) => prop.name === 'enabled'
            );

            expect(enabled?.defaultValue).toBe('true');
            expect(enabled?.hrefPath).toBe('pagination.enabled');
            expect(enabled?.description).toContain(
                'Defaults to true when Pagination is used.'
            );
            expect(enabled?.description).not.toMatch(/@default/);
            expect(enabled?.description).not.toMatch(/Links to Grid/);
        } finally {
            FS.rmSync(dir, { recursive: true, force: true });
        }
    });

    it('reads props from declare const X: (props: T) => null', () => {
        const dir = FS.mkdtempSync(Path.join(OS.tmpdir(), 'grid-react-api-docs-'));
        const dtsPath = Path.join(dir, 'index.d.ts');

        FS.writeFileSync(dtsPath, `
export interface CaptionProps {
    /**
     * Links to Grid.Options.caption.className
     */
    className?: string;
    /**
     * Links to Grid.Options.caption
     */
    options?: unknown;
    children?: string;
}
declare const Caption: (props: CaptionProps) => null;
export { Caption };
`);

        try {
            const caption = extractFromDts(
                dtsPath,
                '@highcharts/grid-lite-react',
                'grid-lite-react/index.d.ts'
            ).find((component) => component.name === 'Caption');
            const names = caption?.props.map((prop) => prop.name);

            expect(names).toEqual(['className', 'options']);
            expect(
                caption?.props.find((prop) => prop.name === 'className')?.hrefPath
            ).toBe('caption.className');
            expect(
                caption?.props.find((prop) => prop.name === 'options')?.hrefPath
            ).toBe('caption');
        } finally {
            FS.rmSync(dir, { recursive: true, force: true });
        }
    });

    it('maps Column.id, Header.options, and the options bag from dist', () => {
        requireDts();
        const lite = extractFromDts(
            liteDts,
            '@highcharts/grid-lite-react',
            'grid-lite-react/index.d.ts'
        );
        const column = lite.find((component) => component.name === 'Column');
        const header = lite.find((component) => component.name === 'Header');
        const caption = lite.find((component) => component.name === 'Caption');
        const data = lite.find((component) => component.name === 'Data');

        expect(column?.props.find((prop) => prop.name === 'id')?.hrefPath)
            .toBe('columns.id');
        expect(column?.props.some((prop) => prop.name === 'columnId'))
            .toBe(false);
        expect(column?.props.find((prop) => prop.name === 'dataId')?.hrefPath)
            .toBe('columns.dataId');
        expect(column?.props.find((prop) => prop.name === 'options')?.hrefPath)
            .toBe('columns');

        expect(header?.props.find((prop) => prop.name === 'options')?.hrefPath)
            .toBe('header');
        expect(header?.props.some((prop) => prop.name === 'header'))
            .toBe(false);

        expect(caption?.props.find((prop) => prop.name === 'options')?.hrefPath)
            .toBe('caption');
        expect(data?.props.find((prop) => prop.name === 'options')?.hrefPath)
            .toBe('data');
    });
});
