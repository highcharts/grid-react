import { describe, it, expect } from 'vitest';
import { Header } from '../../src/components/options/header/Header';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Header', () => {
    it('maps header prop to options.header', () => {
        const header = ['product', { columnId: 'price', format: '{value} USD' }];

        expect(getChildProps(<Header header={header} />)).toEqual({
            header
        });
    });
});
