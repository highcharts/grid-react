import { describe, it, expect } from 'vitest';
import { Caption } from '../../src/components/options/caption/Caption';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Caption', () => {
    it('maps caption props and children into options.caption', () => {
        expect(
            getChildProps(
                <Caption className="grid-caption" htmlTag="h2">
                    Sales table
                </Caption>
            )
        ).toEqual({
            caption: {
                className: 'grid-caption',
                htmlTag: 'h2',
                text: 'Sales table'
            }
        });
    });
});
