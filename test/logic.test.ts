import { describe, expect, test } from 'vitest';

import dater from '../index.js';

describe("Dater on non strict mode", () => {
    test('Should keep a string number a string as it is non strict by default', () => {
        expect(dater('2024')).to.deep.eq('2024');
    });

    test('Should convert an ISO date appropriately to the precise date', () => {
        const randomDateString1: string = '2024-06-01T15:25:55.567Z';
        const randomDateString2: string = '2027-03-24T05:11:30.444Z';

        expect(dater(randomDateString1)).to.deep.eq(new Date(randomDateString1));
        expect((dater(randomDateString2) as Date).toISOString()).to.eq(randomDateString2);
        
		// Datify('2011-09-13T17:09:30.909Z').constructor.toString().should.contain('function Date');
    });
});