import { describe, it, expect, vi } from 'vitest';
import { Column } from '../../src/index';
import { buildGridOptions } from '../../src/utils/buildGridOptions';
import {
    getGridEventPropDeps,
    GRID_EVENT_PROP_KEYS,
    normalizeGridEventProps
} from '../../src/utils/mappers/grid';
import { getChildProps } from '@highcharts/grid-shared-react';
import type { GridProOptions, GridProProps } from '../../src/utils/mappers/grid';

describe('normalizeGridEventProps', () => {
    it('maps grid-level and row pinning event props', () => {
        const onAfterLoad = vi.fn();
        const onAfterRowPin = vi.fn();

        expect(normalizeGridEventProps({
            gridKey: 'GRID-KEY',
            onAfterLoad,
            onAfterRowPin
        } as GridProProps)).toEqual({
            events: {
                afterLoad: onAfterLoad
            },
            rendering: {
                rows: {
                    pinning: {
                        events: {
                            afterRowPin: onAfterRowPin
                        }
                    }
                }
            }
        });
    });
});

describe('buildGridOptions', () => {
    it('merges gridKey and grid-level events into options', () => {
        const onAfterLoad = vi.fn();
        const options = buildGridOptions(
            'GRID-KEY',
            {
                data: {
                    columns: {
                        name: ['Alice']
                    }
                }
            },
            {
                gridKey: 'OLD-KEY',
                events: {
                    beforeLoad: vi.fn()
                }
            } as GridProOptions,
            {
                gridKey: 'GRID-KEY',
                onAfterLoad
            } as GridProProps
        );

        expect(options.gridKey).toBe('GRID-KEY');
        expect(options.events?.beforeLoad).toBeTypeOf('function');
        expect(options.events?.afterLoad).toBe(onAfterLoad);
    });

    it('maps declarative children and builds full grid options', () => {
        const options = buildGridOptions(
            'GRID-KEY',
            getChildProps(<Column columnId="name" />),
            void 0,
            { gridKey: 'GRID-KEY' } as GridProProps
        );

        expect(options.gridKey).toBe('GRID-KEY');
        expect(options.columns).toEqual([{ id: 'name' }]);
    });

    it('omits rendering.theme when theme prop is undefined', () => {
        const options = buildGridOptions(
            'GRID-KEY',
            {},
            void 0,
            {
                gridKey: 'GRID-KEY',
                className: 'rounded-md border'
            } as GridProProps
        );

        expect(options.rendering?.theme).toBeUndefined();
        expect(
            (options.rendering as { className?: string } | undefined)?.className
        ).toBeUndefined();
    });

    it('passes empty theme to disable Core default', () => {
        const options = buildGridOptions(
            'GRID-KEY',
            {},
            void 0,
            {
                gridKey: 'GRID-KEY',
                theme: '',
                className: 'rounded-md border'
            } as GridProProps
        );

        expect(options.rendering?.theme).toBe('');
        expect(
            (options.rendering as { className?: string } | undefined)?.className
        ).toBeUndefined();
    });

    it('passes custom theme without putting className into Core options', () => {
        const options = buildGridOptions(
            'GRID-KEY',
            {},
            void 0,
            {
                gridKey: 'GRID-KEY',
                theme: 'myTheme',
                className: 'rounded-md border'
            } as GridProProps
        );

        expect(options.rendering?.theme).toBe('myTheme');
        expect(
            (options.rendering as { className?: string } | undefined)?.className
        ).toBeUndefined();
    });

    it('maps tableClassName to rendering.table.className', () => {
        const options = buildGridOptions(
            'GRID-KEY',
            {},
            void 0,
            {
                gridKey: 'GRID-KEY',
                theme: '',
                className: 'p-8',
                tableClassName: 'border border-slate-300'
            } as GridProProps
        );

        expect(options.rendering?.theme).toBe('');
        expect(options.rendering?.table?.className).toBe(
            'border border-slate-300'
        );
    });
});

describe('getGridEventPropDeps', () => {
    it('exposes stable dep keys for every grid event prop', () => {
        const onAfterLoad = vi.fn();
        const props = {
            gridKey: 'KEY',
            onAfterLoad
        } as GridProProps;

        expect(GRID_EVENT_PROP_KEYS).toContain('onAfterLoad');
        expect(getGridEventPropDeps(props)).toEqual([
            'KEY',
            void 0,
            void 0,
            void 0,
            ...GRID_EVENT_PROP_KEYS.map(
                (key: keyof GridProProps) => props[key]
            )
        ]);
    });
});
