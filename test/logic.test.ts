import { describe, expect, test } from 'vitest';

import convert from '../index.js';

describe("ts-date-converter on non strict mode", () => {
    test('Should keep a non numeric string as is', () => {
        const someString = "Hello world!";
        expect(convert(someString)).eq(someString);
    })

    test('Should keep a string number a string as it is non strict by default', () => {
        const numberString = '2024';
        expect(convert(numberString)).to.deep.eq(numberString);
    });

    test('Should convert an ISO date appropriately to the precise date', () => {
        const randomDateString1: string = '2024-06-01T15:25:55.567Z';
        const randomDateString2: string = '2027-03-24T05:11:30.444Z';

        expect(convert(randomDateString1)).to.deep.eq(new Date(randomDateString1));
        expect(convert(randomDateString2).toISOString()).to.eq(randomDateString2);
        
		// Datify('2011-09-13T17:09:30.909Z').constructor.toString().should.contain('function Date');
    });
});