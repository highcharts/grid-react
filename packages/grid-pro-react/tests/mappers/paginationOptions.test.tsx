import { describe, it, expect, vi } from 'vitest';
import { Data, Pagination } from '../../src/index';
import {
    mapPaginationEventProps,
    mergePaginationEventProps
} from '../../src/utils/mappers/pagination';
import { getChildProps, normalizeChildOptions } from '@highcharts/grid-shared-react';

describe('mapPaginationEventProps', () => {
    it('maps pagination event props onto nested option paths', () => {
        const onBeforePageChange = vi.fn();

        expect(mapPaginationEventProps({
            page: 1,
            pageSize: 2,
            onBeforePageChange
        })).toEqual({
            page: 1,
            pageSize: 2,
            events: {
                beforePageChange: onBeforePageChange
            }
        });
    });
});

describe('mergePaginationEventProps', () => {
    it('maps pagination event props from declarative child options', () => {
        const onBeforePageChange = vi.fn();
        const children = (
            <>
                <Data columns={{ name: ['Alice'] }} />
                <Pagination
                    page={1}
                    pageSize={2}
                    onBeforePageChange={onBeforePageChange}
                />
            </>
        );

        const options = mergePaginationEventProps(
            normalizeChildOptions(getChildProps(children))
        );

        expect(options.pagination).toEqual({
            enabled: true,
            page: 1,
            pageSize: 2,
            position: 'bottom',
            events: {
                beforePageChange: onBeforePageChange
            }
        });
    });
});
