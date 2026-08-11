import { describe, it, expect } from 'vitest';
import { Data } from '../../src/components/options/data/Data';
import { Pagination } from '../../src/components/options/pagination/Pagination';
import { getChildProps } from '../../src/utils/getChildProps';
import { normalizeChildOptions } from '../../src/utils/normalizeChildOptions';

describe('Pagination parser', () => {
    it('collects raw pagination props with position', () => {
        expect(
            getChildProps(
                <Pagination
                    enabled={false}
                    page={2}
                    pageSize={25}
                    align="center"
                    pageInfo
                    pageSizeOptions={[10, 25, 50]}
                    pageButtonsCount={5}
                    firstLast
                    previousNext={false}
                />
            )
        ).toEqual({
            pagination: {
                enabled: false,
                page: 2,
                pageSize: 25,
                align: 'center',
                pageInfo: true,
                pageSizeOptions: [10, 25, 50],
                pageButtonsCount: 5,
                firstLast: true,
                previousNext: false,
                position: 'top'
            }
        });
    });

    it('sets position to top for the first pagination and bottom after other options', () => {
        const top = getChildProps(
            <>
                <Pagination pageSize={10} />
                <Data columns={{ id: [1] }} />
            </>
        );
        const bottom = getChildProps(
            <>
                <Data columns={{ id: [1] }} />
                <Pagination pageSize={10} />
            </>
        );

        expect(top.pagination).toMatchObject({ position: 'top' });
        expect(bottom.pagination).toMatchObject({ position: 'bottom' });
    });
});

describe('Pagination normalization', () => {
    it('normalizes pagination props into options.pagination', () => {
        expect(
            normalizeChildOptions(
                getChildProps(
                    <Pagination
                        enabled={false}
                        page={2}
                        pageSize={25}
                        align="center"
                        pageInfo
                        pageSizeOptions={[10, 25, 50]}
                        pageButtonsCount={5}
                        firstLast
                        previousNext={false}
                    />
                )
            )
        ).toEqual({
            pagination: {
                enabled: false,
                page: 2,
                pageSize: 25,
                align: 'center',
                position: 'top',
                controls: {
                    pageInfo: true,
                    pageSizeSelector: {
                        enabled: true,
                        options: [10, 25, 50]
                    },
                    pageButtons: {
                        enabled: true,
                        count: 5
                    },
                    firstLastButtons: true,
                    previousNextButtons: false
                }
            }
        });
    });

    it('maps className props onto pagination and controls', () => {
        expect(
            normalizeChildOptions(
                getChildProps(
                    <Pagination
                        className="mt-4"
                        infoClassName="text-sm text-slate-500"
                        controlsClassName="gap-2"
                        sizeClassName="text-sm"
                        pageSizeOptions={[3, 5, 10]}
                    />
                )
            )
        ).toEqual({
            pagination: {
                enabled: true,
                className: 'mt-4',
                position: 'top',
                controls: {
                    className: 'gap-2',
                    pageInfo: {
                        enabled: true,
                        className: 'text-sm text-slate-500'
                    },
                    pageSizeSelector: {
                        enabled: true,
                        options: [3, 5, 10],
                        className: 'text-sm'
                    }
                }
            }
        });
    });
});
