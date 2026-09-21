import { describe, it, expect, vi } from 'vitest';
import { mapEventsProps } from '../../src/utils/mapEventsProps';

describe('mapEventsProps', () => {
    it('maps flat event props onto nested option paths', () => {
        const onCellClick = vi.fn();
        const column: Record<string, unknown> = {
            id: 'name',
            onCellClick
        };

        mapEventsProps(column, {
            onCellClick: ['cells', 'events', 'click']
        });

        expect(column).toEqual({
            id: 'name',
            cells: {
                events: {
                    click: onCellClick
                }
            }
        });
    });

    it('copies handlers from a source object onto nested target paths', () => {
        const onBeforePageChange = vi.fn();
        const pagination: Record<string, unknown> = { enabled: true };

        mapEventsProps(
            pagination,
            {
                onBeforePageChange: ['events', 'beforePageChange']
            },
            { page: 1, onBeforePageChange }
        );

        expect(pagination).toEqual({
            enabled: true,
            events: {
                beforePageChange: onBeforePageChange
            }
        });
    });
});
