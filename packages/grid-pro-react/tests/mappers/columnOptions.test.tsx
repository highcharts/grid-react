import { describe, it, expect, vi } from 'vitest';
import { Column, Data } from '../../src/index';
import {
    mergeColumnEventProps,
    mapColumnEventProps
} from '../../src/utils/mappers/column';
import { getChildProps, normalizeChildOptions } from '@highcharts/grid-shared-react';

describe('mapColumnEventProps', () => {
    it('maps column event props onto nested option paths', () => {
        const onAfterSort = vi.fn();
        const onCellClick = vi.fn();

        expect(mapColumnEventProps({
            columnId: 'name',
            onAfterSort,
            onCellClick
        })).toEqual({
            columnId: 'name',
            events: {
                afterSort: onAfterSort
            },
            cells: {
                events: {
                    click: onCellClick
                }
            }
        });
    });

    it('maps header event props onto nested option paths', () => {
        const onHeaderClick = vi.fn();
        const onHeaderAfterRender = vi.fn();

        expect(mapColumnEventProps({
            columnId: 'name',
            onHeaderClick,
            onHeaderAfterRender
        })).toEqual({
            columnId: 'name',
            header: {
                events: {
                    click: onHeaderClick,
                    afterRender: onHeaderAfterRender
                }
            }
        });
    });
});

describe('mergeColumnEventProps', () => {
    it('maps event props on declarative column options', () => {
        const onAfterSort = vi.fn();
        const onCellClick = vi.fn();

        const options = mergeColumnEventProps(
            normalizeChildOptions(
                getChildProps(
                    <>
                        <Data
                            columns={{
                                name: ['Alice', 'Bob'],
                                age: [30, 25]
                            }}
                        />
                        <Column
                            columnId="name"
                            onAfterSort={onAfterSort}
                            onCellClick={onCellClick}
                        />
                    </>
                )
            )
        );

        expect(options.columns).toEqual([
            {
                id: 'name',
                events: {
                    afterSort: onAfterSort
                },
                cells: {
                    events: {
                        click: onCellClick
                    }
                }
            }
        ]);
    });
});
