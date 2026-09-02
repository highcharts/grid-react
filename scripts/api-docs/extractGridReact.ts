/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { execSync } from 'node:child_process';
import FS from 'node:fs';
import Path from 'node:path';
import ts from 'typescript';

const PRODUCT = 'grid';
const LITE_PKG = '@highcharts/grid-lite-react';
const PRO_PKG = '@highcharts/grid-pro-react';
const COMPONENTS = new Set([
    'Grid', 'Caption', 'Description', 'Data', 'Header',
    'Pagination', 'Column', 'ColumnDefaults'
]);
const SKIP = new Set(['GridLite', 'GridPro']);
const LINKS_RE = /Links to Grid\.Options(?:\.([\w.]+))?/;
const CATEGORY_COPY = {
    Grid: 'Top-level Grid React component.',
    Components: 'Declarative option components passed as Grid children.'
} as const;

export interface PropEntry {
    name: string;
    type: string;
    description: string;
    hrefPath?: string;
    defaultValue?: string;
    proOnly?: boolean;
}

export interface ComponentDoc {
    name: string;
    category: keyof typeof CATEGORY_COPY;
    importPath: string;
    description: string;
    props: PropEntry[];
    sourceFile: string;
    hrefPath?: string;
}

interface SourceIndex {
    interfaces: Map<string, ts.InterfaceDeclaration>;
    aliases: Map<string, ts.TypeAliasDeclaration>;
    exports: Map<string, string>;
    fns: Map<string, ts.FunctionDeclaration>;
    vars: Map<string, ts.VariableDeclaration>;
}

function jsDoc(node: ts.Node, src: ts.SourceFile): string {
    const text = src.getFullText();
    const blocks = (ts.getLeadingCommentRanges(
        text,
        node.getFullStart()
    ) ?? [])
        .map((range) => text.slice(range.pos, range.end))
        .filter((raw) => (
            raw.trimStart().startsWith('/**') &&
            !/A valid license is required/.test(raw)
        ));
    const raw = blocks.at(-1);
    if (!raw) {
        return '';
    }
    return raw
        .replace(/^\/\*\*?/, '')
        .replace(/\*\/$/, '')
        .split('\n')
        .map((line) => line.replace(/^\s*\*\s?/, ''))
        .join('\n')
        .trim();
}

const DEFAULT_RE = /@default\s+(\S.*)$/m;

function parseDoc(raw: string): {
    description: string;
    hrefPath?: string;
    defaultValue?: string;
} {
    const match = raw.match(LINKS_RE);
    const defaultMatch = raw.match(DEFAULT_RE);
    const description = raw
        .replace(LINKS_RE, '')
        .replace(DEFAULT_RE, '')
        .replace(/\n{2,}/g, '\n')
        .trim();
    return {
        description,
        ...(match ? { hrefPath: match[1] ?? '' } : {}),
        ...(defaultMatch ? { defaultValue: defaultMatch[1].trim() } : {})
    };
}

function refName(type: ts.TypeNode): string | undefined {
    if (ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName)) {
        return type.typeName.text;
    }
    if (
        ts.isExpressionWithTypeArguments(type) &&
        ts.isIdentifier(type.expression)
    ) {
        return type.expression.text;
    }
    return undefined;
}

function propsTypeName(typeText: string): string | undefined {
    return typeText.match(
        /(?:ComponentType|FC|FunctionComponent)\s*<\s*([A-Z]\w*)/
    )?.[1] ?? typeText.match(/^([A-Z]\w*)/)?.[1];
}

function collectProps(
    typeName: string,
    src: ts.SourceFile,
    index: SourceIndex
): PropEntry[] {
    const out = new Map<string, PropEntry>();
    const seen = new Set<string>();

    const addProp = (member: ts.TypeElement): void => {
        if (!ts.isPropertySignature(member) || !member.name) {
            return;
        }
        const name = member.name.getText(src);
        if (name === 'children') {
            return;
        }
        const parsed = parseDoc(jsDoc(member, src));
        out.set(name, {
            name,
            type: member.type ?
                member.type.getText(src).replace(/\s+/g, ' ').trim() :
                'any',
            description: parsed.description,
            hrefPath: parsed.hrefPath,
            defaultValue: parsed.defaultValue
        });
    };

    const walkType = (type: ts.TypeNode): void => {
        if (ts.isParenthesizedTypeNode(type)) {
            walkType(type.type);
            return;
        }
        if (ts.isIntersectionTypeNode(type)) {
            type.types.forEach(walkType);
            return;
        }
        if (ts.isTypeLiteralNode(type)) {
            type.members.forEach(addProp);
            return;
        }
        const name = refName(type);
        if (name && !seen.has(name)) {
            seen.add(name);
            walkNamed(name);
        }
    };

    const walkNamed = (name: string): void => {
        const iface = index.interfaces.get(name);
        if (iface) {
            for (const clause of iface.heritageClauses ?? []) {
                clause.types.forEach(walkType);
            }
            iface.members.forEach(addProp);
            return;
        }
        const alias = index.aliases.get(name);
        if (alias) {
            walkType(alias.type);
        }
    };

    walkNamed(typeName);
    return [...out.values()];
}

function indexSource(src: ts.SourceFile): SourceIndex {
    const index: SourceIndex = {
        interfaces: new Map(),
        aliases: new Map(),
        exports: new Map(),
        fns: new Map(),
        vars: new Map()
    };

    for (const stmt of src.statements) {
        if (ts.isInterfaceDeclaration(stmt)) {
            index.interfaces.set(stmt.name.text, stmt);
        } else if (ts.isTypeAliasDeclaration(stmt)) {
            index.aliases.set(stmt.name.text, stmt);
        } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
            index.fns.set(stmt.name.text, stmt);
        } else if (ts.isVariableStatement(stmt)) {
            for (const decl of stmt.declarationList.declarations) {
                if (ts.isIdentifier(decl.name)) {
                    index.vars.set(decl.name.text, decl);
                }
            }
        } else if (
            ts.isExportDeclaration(stmt) &&
            stmt.exportClause &&
            ts.isNamedExports(stmt.exportClause)
        ) {
            for (const el of stmt.exportClause.elements) {
                index.exports.set(
                    el.name.text,
                    el.propertyName?.text ?? el.name.text
                );
            }
        }
    }

    return index;
}

function declJsDoc(
    fn: ts.FunctionDeclaration | undefined,
    variable: ts.VariableDeclaration | undefined,
    src: ts.SourceFile
): string {
    if (fn) {
        return jsDoc(fn, src);
    }
    const statement = variable?.parent?.parent;
    return statement ? jsDoc(statement, src) : '';
}

export function extractFromDts(
    dtsPath: string,
    importPath: string,
    sourceFile: string
): ComponentDoc[] {
    const resolved = Path.resolve(dtsPath);
    if (!FS.existsSync(resolved)) {
        throw new Error(`Declaration file not found: ${resolved}`);
    }

    const program = ts.createProgram([resolved], {
        noEmit: true,
        skipLibCheck: true,
        jsx: ts.JsxEmit.ReactJSX
    });
    const src = program.getSourceFile(resolved);
    if (!src) {
        throw new Error(`Could not parse ${resolved}`);
    }

    const index = indexSource(src);
    const docs: ComponentDoc[] = [];

    for (const [exportName, localName] of index.exports) {
        if (SKIP.has(exportName) || !COMPONENTS.has(exportName)) {
            continue;
        }
        const fn = index.fns.get(localName);
        const variable = index.vars.get(localName);
        if (!fn && !variable) {
            continue;
        }

        const typeText = fn?.parameters[0]?.type?.getText(src) ??
            variable?.type?.getText(src);
        const typeName = typeText && propsTypeName(typeText);
        const parsed = parseDoc(declJsDoc(fn, variable, src));

        docs.push({
            name: exportName,
            category: exportName === 'Grid' ? 'Grid' : 'Components',
            importPath,
            description: parsed.description,
            props: typeName ? collectProps(typeName, src, index) : [],
            sourceFile,
            hrefPath: parsed.hrefPath
        });
    }

    return docs;
}

export function mergeComponents(
    lite: ComponentDoc[],
    pro: ComponentDoc[]
): ComponentDoc[] {
    const byName = new Map<string, ComponentDoc>();

    for (const component of lite) {
        byName.set(component.name, {
            ...component,
            props: component.props.map((prop) => ({ ...prop }))
        });
    }

    for (const component of pro) {
        const current = byName.get(component.name);
        if (!current) {
            byName.set(component.name, {
                ...component,
                props: component.props.map((prop) => ({
                    ...prop,
                    proOnly: true
                }))
            });
            continue;
        }
        const props = new Map(current.props.map((p) => [p.name, p]));
        for (const prop of component.props) {
            if (!props.has(prop.name)) {
                props.set(prop.name, { ...prop, proOnly: true });
            }
        }
        current.props = [...props.values()];
        current.description ||= component.description;
        current.hrefPath ??= component.hrefPath;
    }

    return [...byName.values()].sort((a, b) => (
        a.category.localeCompare(b.category) ||
        a.name.localeCompare(b.name)
    ));
}

function crossref(hrefPath?: string): string[] | undefined {
    if (hrefPath === undefined) {
        return undefined;
    }
    return [
        PRODUCT,
        hrefPath ? `options/${hrefPath.replaceAll('.', '/')}` : 'options'
    ];
}

function treeNode(
    fullname: string,
    name: string,
    file: string | undefined,
    doclet: Record<string, unknown>,
    hrefPath?: string,
    children?: Record<string, unknown>
): Record<string, unknown> {
    const xref = crossref(hrefPath);
    return {
        doclet: xref ? { ...doclet, crossref: xref } : doclet,
        meta: { fullname, name, ...(file ? { file } : {}) },
        ...(children ? { children } : {})
    };
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function importLine(name: string, pkg: string): string {
    return `import { ${name} } from '${pkg}';`;
}

function componentBody(component: ComponentDoc): string {
    const snippet =
        `<pre><code>${escapeHtml(
            `${importLine(component.name, LITE_PKG)} // or '${PRO_PKG}'`
        )}</code></pre>`;
    const description = component.name === 'Grid' ?
        CATEGORY_COPY.Grid :
        component.description;
    return description ?
        `${snippet}<p>${escapeHtml(description)}</p>` :
        snippet;
}

export function buildTree(
    components: ComponentDoc[],
    meta: { branch: string; commit: string; version: string }
): Record<string, unknown> {
    const tree: Record<string, unknown> = { _meta: meta };

    for (const category of ['Grid', 'Components'] as const) {
        const listed = components.filter((c) => c.category === category);
        if (!listed.length) {
            continue;
        }
        const children: Record<string, unknown> = {};
        for (const c of listed) {
            const props: Record<string, unknown> = {};
            for (const p of c.props) {
                props[p.name] = treeNode(
                    `${category}.${c.name}.${p.name}`,
                    p.name,
                    c.sourceFile,
                    {
                        description: p.description,
                        type: { names: [p.type] },
                        ...(p.defaultValue ? { default: p.defaultValue } : {}),
                        ...(p.proOnly ? { product: 'gridpro' } : {})
                    },
                    p.hrefPath
                );
            }
            children[c.name] = treeNode(
                `${category}.${c.name}`,
                c.name,
                c.sourceFile,
                { description: componentBody(c) },
                c.hrefPath,
                props
            );
        }
        tree[category] = treeNode(
            category,
            category,
            undefined,
            { description: CATEGORY_COPY[category] },
            undefined,
            children
        );
    }

    return tree;
}

function git(cwd: string, args: string): string {
    return execSync(`git ${args}`, { cwd, encoding: 'utf8' }).trim();
}

export function extractGridReactTree(options: {
    liteDts: string;
    proDts: string;
    litePackageRoot: string;
}): Record<string, unknown> {
    const pkg = JSON.parse(
        FS.readFileSync(
            Path.join(options.litePackageRoot, 'package.json'),
            'utf8'
        )
    ) as { version?: string };
    if (!pkg.version) {
        throw new Error('Missing package version.');
    }

    const cwd = options.litePackageRoot;
    return buildTree(
        mergeComponents(
            extractFromDts(
                options.liteDts,
                LITE_PKG,
                'grid-lite-react/index.d.ts'
            ),
            extractFromDts(
                options.proDts,
                PRO_PKG,
                'grid-pro-react/index.d.ts'
            )
        ),
        {
            branch: git(cwd, 'rev-parse --abbrev-ref HEAD'),
            commit: git(cwd, 'rev-parse --short HEAD'),
            version: pkg.version
        }
    );
}
