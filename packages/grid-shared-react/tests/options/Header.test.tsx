import { describe, it, expect } from 'vitest';
import { Header } from '../../src/components/options/header/Header';
import { getChildProps } from '../../src/utils/getChildProps';

describe('Header', () => {
    it('maps options prop to options.header', () => {
        const header = ['product', { columnId: 'price', format: '{value} USD' }];

        expect(getChildProps(<Header options={header} />)).toEqual({
            header
        });
    });
});
