import { describe, it, expect } from 'vitest';
import { Description } from '../../src/components/options/description/Description';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Description', () => {
    it('maps description props and children into options.description', () => {
        expect(
            getChildProps(
                <Description className="grid-description">
                    Monthly sales overview
                </Description>
            )
        ).toEqual({
            description: {
                className: 'grid-description',
                text: 'Monthly sales overview'
            }
        });
    });
});
