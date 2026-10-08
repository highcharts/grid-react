import { describe, it, expect } from 'vitest';
import { buildGridOptions } from '../src/utils/buildGridOptions';

describe('buildGridOptions theme', () => {
    it('omits rendering.theme when theme prop is undefined', () => {
        const options = buildGridOptions({});

        expect(options.rendering?.theme).toBeUndefined();
    });

    it('passes empty theme to disable Core default', () => {
        const options = buildGridOptions({}, void 0, '');

        expect(options.rendering?.theme).toBe('');
    });

    it('passes custom theme as-is', () => {
        const options = buildGridOptions({}, void 0, 'myTheme');

        expect(options.rendering?.theme).toBe('myTheme');
    });

    it('does not put className into Core options', () => {
        // className is React-only on the mount container
        const options = buildGridOptions({}, void 0, 'hcg-theme-default');

        expect(options.rendering?.theme).toBe('hcg-theme-default');
        expect(
            (options.rendering as { className?: string } | undefined)?.className
        ).toBeUndefined();
    });

    it('maps tableClassName to rendering.table.className', () => {
        const options = buildGridOptions(
            {},
            void 0,
            '',
            'border border-slate-300 w-full'
        );

        expect(options.rendering?.theme).toBe('');
        expect(options.rendering?.table?.className).toBe(
            'border border-slate-300 w-full'
        );
    });
});
