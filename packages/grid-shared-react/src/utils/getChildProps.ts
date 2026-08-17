/**
 * Grid React integration.
 * Copyright (c) 2025, Highsoft
 *
 * A valid license is required for using this software.
 * See highcharts.com/license
 *
 */

import { Fragment, isValidElement, ReactElement, ReactNode } from 'react';
import type { BaseGridOptionsComponent, BaseGridOptions } from '../components/BaseGridOptions';
import { isObject } from './isObject';

function flattenChildren(childNodes: ReactNode): ReactNode[] {
    if (childNodes == null || childNodes === false) {
        return [];
    }

    if (Array.isArray(childNodes)) {
        return childNodes.flatMap((child) => flattenChildren(child));
    }

    if (isValidElement(childNodes) && childNodes.type === Fragment) {
        const fragmentProps = childNodes.props as { children?: ReactNode };
        return flattenChildren(fragmentProps.children);
    }

    return [childNodes];
}

function objInsert(
    obj: Record<string, unknown>,
    path: string,
    value: unknown
): Record<string, unknown> {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (key === void 0) {
            continue;
        }

        if (!isObject(current[key])) {
            current[key] = {};
        }
        current = current[key] as Record<string, unknown>;
    }

    const lastKey = keys.at(-1);

    if (lastKey !== void 0) {
        current[lastKey] = value;
    }
    return obj;
}

function isReactElement(value: unknown): value is ReactElement {
    return isValidElement(value);
}

function getOptionComponent(type: unknown): BaseGridOptionsComponent | null {
    if (typeof type !== 'function' && (typeof type !== 'object' || type === null)) {
        return null;
    }

    const component = type as Partial<BaseGridOptionsComponent>;

    return component._GridReact ? type as BaseGridOptionsComponent : null;
}

function getChildPropsFromElement(
    child: ReactElement
): Record<string, unknown> {
    return (child.props ?? {}) as Record<string, unknown>;
}

function renderChildren(children: ReactNode): string {
    if (typeof children === 'string' || typeof children === 'number') {
        return String(children);
    }

    if (Array.isArray(children)) {
        return children
            .map((child) => renderChildren(child))
            .join('');
    }

    return '';
}

function getEffectiveMeta(
    component: BaseGridOptionsComponent,
    parentMeta?: BaseGridOptions
): BaseGridOptions {
    const meta = component._GridReact;

    if (!parentMeta) {
        return meta;
    }

    return {
        ...meta,
        childOption: parentMeta.childOption
            ? `${parentMeta.childOption}.${meta.childOption ?? ''}`
            : meta.childOption,
        gridOption: parentMeta.gridOption
            ? `${parentMeta.gridOption}.${meta.gridOption}`
            : meta.gridOption
    };
}

function parseColumnElement(child: ReactElement): Record<string, unknown> {
    const {
        children,
        id,
        columnId,
        ...props
    } = getChildPropsFromElement(child);
    void children;
    void id;

    // columnId selects the column; Core expects the same value as `id`.
    if (columnId !== void 0) {
        props.id = columnId;
    }

    return props;
}

function pushColumn(
    optionsFromChildren: Record<string, unknown>,
    child: ReactElement
): void {
    const columns = (optionsFromChildren.columns ?? (
        optionsFromChildren.columns = []
    )) as Record<string, unknown>[];

    columns.push(parseColumnElement(child));
}

export function getChildProps(children: ReactNode): Record<string, unknown> {
    const optionsFromChildren: Record<string, unknown> = {};
    const resolvedChildren = flattenChildren(children)
        .map((child) => resolveOptionChild(child))
        .filter((child): child is ReactElement => child !== null);

    function handleChildren(
        childNodes: ReactNode,
        obj: Record<string, unknown>,
        meta: BaseGridOptions
    ): void {
        if (childNodes == null || childNodes === false) {
            return;
        }

        const nonOptionChildren: ReactNode[] = [];

        if (Array.isArray(childNodes)) {
            for (const child of childNodes) {
                if (isReactElement(child) && isOptionElement(child)) {
                    handleChild(child, meta);
                    continue;
                }

                nonOptionChildren.push(child);
            }
        } else if (isReactElement(childNodes) && isOptionElement(childNodes)) {
            handleChild(childNodes, meta);
        } else {
            nonOptionChildren.push(childNodes);
        }

        if (meta.childOption) {
            const childrenToRender = nonOptionChildren.length > 0 ?
                nonOptionChildren :
                [childNodes];

            objInsert(obj, meta.childOption, renderChildren(childrenToRender));
        }
    }

    function handleChild(
        child: ReactElement,
        parentMeta?: BaseGridOptions
    ): void {
        const component = getOptionComponent(child.type);

        if (!component) {
            return;
        }

        const meta = getEffectiveMeta(component, parentMeta);

        if (!meta.gridOption) {
            return;
        }

        const childProps = getChildPropsFromElement(child);
        const { children: childChildren, ...props } = childProps;

        if (meta.gridOption === 'columnDefaults') {
            optionsFromChildren.columnDefaults = props;
            return;
        }

        if (meta.gridOption === 'columns') {
            pushColumn(optionsFromChildren, child);
            return;
        }

        if (meta.gridOption === 'pagination') {
            optionsFromChildren.pagination = {
                ...props,
                position: isTopPaginationChild(
                    child,
                    resolvedChildren
                ) ? 'top' : 'bottom'
            };
            return;
        }

        if (meta.gridOption === 'header') {
            if (props.header !== void 0) {
                optionsFromChildren.header = props.header;
            }
            return;
        }

        const optionParent = optionsFromChildren[meta.gridOption] ?? (
            optionsFromChildren[meta.gridOption] = meta.isArrayType ? [] : {}
        );
        const parentIsArray = Array.isArray(optionParent);
        const insertInto = parentIsArray
            ? {}
            : optionParent as Record<string, unknown>;

        if (meta.defaultOptions) {
            Object.assign(insertInto, meta.defaultOptions);
        }

        Object.assign(insertInto, props);

        if (typeof childChildren === 'string' || typeof childChildren === 'number') {
            if (meta.childOption) {
                objInsert(insertInto, meta.childOption, String(childChildren));
            }
        } else if (childChildren != null) {
            handleChildren(childChildren as ReactNode, insertInto, meta);
        }

        if (parentIsArray) {
            const optionItems = optionsFromChildren[
                meta.gridOption
            ] as unknown[];
            optionItems.push(insertInto);
        }
    }

    for (const child of resolvedChildren) {
        handleChild(child);
    }

    applyDeclarativeColumnDefaults(optionsFromChildren);

    return optionsFromChildren;
}

/**
 * When declarative `<Column>` components are present, only those columns
 * should render unless `data.autogenerateColumns` is set
 * explicitly on `<Data>`.
 */
function applyDeclarativeColumnDefaults(
    optionsFromChildren: Record<string, unknown>
): void {
    const columns = optionsFromChildren.columns;

    if (!Array.isArray(columns) || columns.length === 0) {
        return;
    }

    const data = isObject(optionsFromChildren.data) ?
        { ...optionsFromChildren.data } :
        {};

    if (!('autogenerateColumns' in data)) {
        data.autogenerateColumns = false;
        optionsFromChildren.data = data;
    }
}

function isTopPaginationChild(
    child: ReactElement,
    children: ReactElement[]
): boolean {
    const childIndex = children.indexOf(child);

    if (childIndex === -1) {
        return false;
    }

    return children
        .slice(0, childIndex)
        .every((candidate) => {
            const gridOption = getOptionComponent(candidate.type)
                ?._GridReact.gridOption;
            return gridOption === 'pagination';
        });
}

function isOptionElement(child: ReactElement): boolean {
    return getOptionComponent(child.type) !== null;
}

function resolveOptionChild(child: ReactNode): ReactElement | null {
    if (!isReactElement(child)) {
        return null;
    }

    const component = getOptionComponent(child.type);

    if (component) {
        return child;
    }

    if (typeof child.type !== 'function') {
        return null;
    }

    const renderChild = child.type as (
        props: Record<string, unknown>
    ) => ReactNode;
    const rendered = renderChild(getChildPropsFromElement(child));

    if (isReactElement(rendered) && getOptionComponent(rendered.type)) {
        return rendered;
    }

    return null;
}
