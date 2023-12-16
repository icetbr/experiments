import { equal } from '../src/equal.js'
import { string } from '../src/assert.js'

describe.only('deepEqual', () => {
    const isEqual = (a, b) => {
        expect(equal(a, b)).to.equal(true);
        expect(b).to.deep.equal(a);
    };

    const isNotEqual = (a, b, bError) => {
        expect(equal(a, b)).to.equal(false);
        expect(b).to.deep.equal(bError);
    };

    it('string matcher', () => {
        isEqual({ a: 1, b: 'b' },
                { a: 1, b: string() });

        isNotEqual({ a: 1, b: 2 },
                   { a: 1, b: string() },
                   { a: 1, b: 'expected String' });
    });

    it('string matcher', () => {
        const
            a = { a: 1, b: 'b' };
            b = { a: 1, b: string() };
        expect(equal(a, b)).to.equal(true);
        expect(b).to.deep.equal(a);

        const
            c = { a: 1, b: 2 };
            d = { a: 1, b: string() };
            dError = { a: 1, b: 'expected String' };
        expect(equal(c, d)).to.equal(false);
        expect(d).to.deep.equal(dError);
    });

    it('string matcher', () => {
        expect(equal({ a: 1, b: 'b' },
                     { a: 1, b: string() }
        )).to.equal(true);
        expect(b).to.deep.equal(a);

        const
            c = { a: 1, b: 2 };
            d = { a: 1, b: string() };
            dError = { a: 1, b: 'expected String' };
        expect(equal(c, d)).to.equal(false);
        expect(d).to.deep.equal(dError);
    });

    it('string matcher', () => {
        const a = { a: 1, b: 'b' };
        const b = { a: 1, b: string() };
        expect(equal(a, b)).to.equal(true);
        expect(b).to.deep.equal(a);

        const c = { a: 1, b: 2 };
        const d = { a: 1, b: string() };
        const dError = { a: 1, b: 'expected String' };
        expect(equal(c, d)).to.equal(false);
        expect(d).to.deep.equal(dError);
    });


});