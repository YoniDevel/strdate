import { describe, expect, test } from 'vitest';

import convert from '../index.js';

describe("ts-date-converter on non strict mode", () => {
    
    describe("Single values (not objects or arrays)", () => {

        test('Should keep a non numeric string as is', () => {
            const someString = "some string";
            expect(convert(someString)).eq(someString);
        });

        test('Should keep a boolean as is', () => {
            expect(convert(true)).toBeTruthy();
            expect(convert(false)).toBeFalsy();
        });
    
        test('Should keep a number string as is in non strict mode (by default)', () => {
            const numberString = '2024';
            expect(convert(numberString)).deep.eq(numberString);
        });
    
        test('Should convert an ISO date string appropriately to the precise date', () => {
            const randomIsoDateString1 = '2024-06-01T15:25:55.567Z';
            const randomIsoDateString2 = '2027-03-24T05:11:30.444Z';
    
            expect(convert(randomIsoDateString1)).deep.eq(new Date(randomIsoDateString1));
            expect(convert(randomIsoDateString2).toISOString()).eq(randomIsoDateString2);
            expect(convert(randomIsoDateString2).constructor.toString()).contain('function Date');        
        });
    
        test('Should convert an ISO date string without miliseconds to the right date', () => {
            const randomIsoDateStringWithoutMS = '2024-06-01T15:25:55Z';
            const randomIsoDateStringWithMS = '2024-06-01T15:25:55.000Z';        
    
            expect(convert(randomIsoDateStringWithoutMS)).deep.eq(new Date(randomIsoDateStringWithoutMS));
            expect(convert(randomIsoDateStringWithoutMS).toISOString()).eq(randomIsoDateStringWithMS);
            expect(convert(randomIsoDateStringWithoutMS).constructor.toString()).contain('function Date');
        });

        test('Should convert a non full ISO date string that has no hour specified', () => () => {
            const randomIsoDateStringNotFull = '1945-04-23';

            expect(convert(randomIsoDateStringNotFull)).deep.eq(new Date(randomIsoDateStringNotFull));
            expect(convert(randomIsoDateStringNotFull).toISOString()).eq(randomIsoDateStringNotFull);
            expect(convert(randomIsoDateStringNotFull).constructor.toString()).contain('function Date');        

        });

        test('Should convert a non full ISO date string that has only month and year specified', () => () => {
            const randomIsoDateStringNotFull = '2008-2';

            expect(convert(randomIsoDateStringNotFull)).deep.eq(new Date(randomIsoDateStringNotFull));
            expect(convert(randomIsoDateStringNotFull).toISOString()).eq(randomIsoDateStringNotFull);
            expect(convert(randomIsoDateStringNotFull).constructor.toString()).contain('function Date');        

        });

        test('Should keep a js short date string as is due to local time behaviour of such dates', () => {
            const randomShortDateString = '03/25/2015';

            expect(convert(randomShortDateString)).eq(randomShortDateString);
        });

        test('Should keep a js long date as is due to local time behaviour of such dates', () => {
            const randomLongDateString1 = 'May 3 1869';
            const randomLongDateString2 = '25 Aug 2000';

            expect(convert(randomLongDateString1)).eq(randomLongDateString1);
            expect(convert(randomLongDateString2)).eq(randomLongDateString2);
        });
    
        test('Should keep a typescript date as is', () => {
            const randomDate = new Date('2050-10-29T18:45:06.820Z');
    
            expect(convert(randomDate)).deep.eq(randomDate);
            expect(convert(randomDate).toISOString()).eq(randomDate.toISOString());
        });
    });

    describe("Objects", () => {
        test('should convert a field which is an ISO date string in an object to date', () => {
            const someObject = {
                startOfParisOlympics: '2024-07-26T19:30:00Z',
            };

            expect(convert(someObject)).deep.eq({
                startOfParisOlympics: new Date('2024-07-26T19:30:00Z'),
            });
        });

        test('Should convert only the relevant fields to date', () => {
            const anotherObject = {
                firstName: "John",
                lastName: 'Doe',
                age: 34,
                dateOfBirth: '2001-04-20T10:20:30Z',
                likesTea: true,
                proffesions: ['lawyer', 'teacher', 'doctor'],
            };

            expect(convert(anotherObject)).deep.eq({
                ...anotherObject,
                dateOfBirth: new Date(anotherObject.dateOfBirth),            
            });
        });
    });
});