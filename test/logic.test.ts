import { describe, expect, test } from 'vitest';

import datify from '../src/index.js';

describe("ts-datify", () => {
    describe("Single values (not objects or arrays)", () => {
        describe("Non convertable values", () => {
            test('Should keep a non numeric string as is', () => {
                const someString = "some string";
                expect(datify(someString)).eq(someString);
            });
    
            test('Should keep a number as is', () => {
                expect(datify(549)).eq(549);
                expect(datify(123.23463456)).eq(123.23463456);
            });
    
            test('Should keep a boolean as is', () => {
                expect(datify(true)).toBeTruthy();
                expect(datify(false)).toBeFalsy();
            });

            test('Should keep a four digit number string as is by default', () => {
                const numberString = '2024';
                expect(datify(numberString)).deep.eq(numberString);
            });

            test('Should keep a typescript date as is', () => {
                const randomDate = new Date('2050-10-29T18:45:06.820Z');
        
                expect(datify(randomDate)).deep.eq(randomDate);
                expect(datify(randomDate).toISOString()).eq(randomDate.toISOString());
            });
        });

        describe("ISO dates", () => {
            test('Should convert an ISO date string appropriately to the precise date', () => {
                const randomIsoDateString1 = '2024-12-01T15:25:55.567Z';
                const randomIsoDateString2 = '2027-03-24T05:11:30.444Z';
        
                expect(datify(randomIsoDateString1)).deep.eq(new Date(randomIsoDateString1));
                expect(datify(randomIsoDateString2).toISOString()).eq(randomIsoDateString2);
                expect(datify(randomIsoDateString2).constructor.toString()).contain('function Date');        
            });

            test('Should convert an ISO date string without miliseconds to the right date', () => {
                const randomIsoDateStringWithoutMS = '2024-06-01T15:25:55Z';
                const randomIsoDateStringWithMS = '2024-06-01T15:25:55.000Z';        
        
                expect(datify(randomIsoDateStringWithoutMS)).deep.eq(new Date(randomIsoDateStringWithoutMS));
                expect(datify(randomIsoDateStringWithoutMS).toISOString()).eq(randomIsoDateStringWithMS);
                expect(datify(randomIsoDateStringWithoutMS).constructor.toString()).contain('function Date');
            });
    
            test('Should convert a non full ISO date string that has no hour specified to a date', () => () => {
                const randomIsoDateStringNotFull = '1945-04-23';
    
                expect(datify(randomIsoDateStringNotFull)).deep.eq(new Date(randomIsoDateStringNotFull));
                expect(datify(randomIsoDateStringNotFull).toISOString()).eq(randomIsoDateStringNotFull);
                expect(datify(randomIsoDateStringNotFull).constructor.toString()).contain('function Date');        
    
            });
    
            test('Should convert a non full ISO date string that has only month and year specified to a date', () => () => {
                const randomIsoDateStringNotFull = '2008-2';
    
                expect(datify(randomIsoDateStringNotFull)).deep.eq(new Date(randomIsoDateStringNotFull));
                expect(datify(randomIsoDateStringNotFull).toISOString()).eq(randomIsoDateStringNotFull);
                expect(datify(randomIsoDateStringNotFull).constructor.toString()).contain('function Date');        
    
            });
    
            test('Should keep an ISO date string with an invalid month as is because it will fail the regex test', () => {
                const invalidMonthIsoDateString = '2024-30-01T15:25:55.567Z';
    
                expect(datify(invalidMonthIsoDateString)).eq(invalidMonthIsoDateString);
            });
    
            test('Should keep an ISO date string with an invalid day as is because it will fail the regex test', () => {
                const invalidDayIsoDateString = '2024-06-55T15:25:55.567Z';
    
                expect(datify(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
            });
    
            test('Should keep an ISO date string with an invalid hour as is because it will fail the regex test', () => {
                const invalidHourIsoDateString = '2024-06-55T30:25:55.567Z';
    
                expect(datify(invalidHourIsoDateString)).eq(invalidHourIsoDateString);
            });
    
            test('Should keep an ISO date string with invalid minutes as is because it will fail the regex test', () => {
                const invalidDayIsoDateString = '2024-06-55T15:78:55.567Z';
    
                expect(datify(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
            });
    
            test('Should keep an ISO date string with invalid seconds as is because it will fail the regex test', () => {
                const invalidDayIsoDateString = '2024-06-55T15:25:990.567Z';
    
                expect(datify(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
            });
    
            test('Should keep an ISO date string with invalid miliseconds as is because it will fail the regex test', () => {
                const invalidDayIsoDateString = '2024-06-55T15:78:55.1234Z';
    
                expect(datify(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
            });
        });

        describe('JS short dates', () => {
            test('Should keep a js short date string as is by default', () => {
                const randomShortDateString = '03/25/2015';

                expect(datify(randomShortDateString)).eq(randomShortDateString);
            })

            test('Should convert a js short date string to the precise date if option is set to true', () => {
                const randomShortDateString1 = '03/25/2015';
                const randomShortDateString2 = '10/04/1987';
    
                expect(datify(randomShortDateString1, { allowOtherFormats: true })).deep.eq(new Date(randomShortDateString1));
                expect(datify(randomShortDateString2, { allowOtherFormats: true })).deep.eq(new Date(randomShortDateString2));
                expect(datify(randomShortDateString2, { allowOtherFormats: true }).constructor.toString()).contain('function Date');   
            });
        });

        describe("JS long dates", () => {
            test('Should keep a js long date string as is by default', () => {
                const randomLongDateString = 'May 3 1869';

                expect(datify(randomLongDateString)).eq(randomLongDateString);
            })

            test('Should convert a js long date string to a date if the option is set to true', () => {
                const randomLongDateString1 = 'May 3 1869';
                const randomLongDateString2 = '25 Aug 2000';

                expect(datify(randomLongDateString1, { allowOtherFormats: true })).deep.eq(new Date(randomLongDateString1));
                expect(datify(randomLongDateString2, { allowOtherFormats: true })).deep.eq(new Date(randomLongDateString2));
                expect(datify(randomLongDateString2, { allowOtherFormats: true }).constructor.toString()).contain('function Date');
            });
        });
    });

    describe("Objects", () => {
        test('Should convert a field which is an ISO date string in an object to date', () => {
            const someObject = {
                startOfParisOlympics: '2024-07-26T19:30:00Z',
            };

            expect(datify(someObject)).deep.eq({
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

            expect(datify(anotherObject)).deep.eq({
                ...anotherObject,
                dateOfBirth: new Date(anotherObject.dateOfBirth),            
            });
        });

        test('Should convert only the relevant fields to date even if they are nested in another object', () => {
            const complexObject = {
                firstName: "John",
                lastName: 'Doe',
                age: 34,
                dateOfBirth: '2001-04-20T10:20:30Z',
                mealTimes: {
                    breakfast: '2024-06-15',
                    lunch: '2024-06-01T15:25:55.567Z',
                    dinner: {
                        mainCourse: { name: "chicken", time: '2024-06-24T11:33:02.789Z' },
                    },
                },
                childrenBirthdays: {
                    son: {
                        grandson: {
                            greatGrandson: {
                                birth: ['2027-03-24T05:11:30.444Z'],
                            },
                        },
                    },
                },
            };

            expect(datify(complexObject)).deep.eq({
                ...complexObject,
                dateOfBirth: new Date(complexObject.dateOfBirth),
                mealTimes: {
                    breakfast: new Date(complexObject.mealTimes.breakfast),
                    lunch: new Date(complexObject.mealTimes.lunch),
                    dinner: {
                        mainCourse: {
                            ...complexObject.mealTimes.dinner.mainCourse,
                            time: new Date(complexObject.mealTimes.dinner.mainCourse.time),
                        },
                    },
                },
                childrenBirthdays: {
                    son: {
                        grandson: {
                            greatGrandson: {
                                birth: [new Date(complexObject.childrenBirthdays.son.grandson.greatGrandson.birth[0])],
                            },
                        },
                    },
                },
            });
        });

        test('Should keep an empty object as is', () => {
            expect(datify({})).deep.eq({});
        });
    });

    describe('Arrays', () => {
        test('Should convert all elements in an array which are date strings to date', () => {
            const arr = [
                'Feb 2 1977', 
                '2024-06-24T11:33:02.789Z', 
                '2001-04-20T10:20:30Z',
                '10/10/2010',
            ];

            expect(datify(arr, { allowOtherFormats: true })).deep.eq(arr.map((element) => new Date(element)));
        });

        test.only('Should convert only the elements in an array which are date strings to date', () => {
            const arr = ['2024-06-15', 34, 'Feb 2 1977', false, 'Hello world', '2008-02'];
            expect(datify(arr)).deep.eq([
                new Date('2024-06-15'),
                34,
                new Date('Feb 2 1977'),
                false,
                'Hello world',
                new Date('2008-02'),
            ]);
        });

        test('Should convert only the elements in an array which are ISO date strings to date even if they are nested', () => {
            const arr = [['2024-06-15'], { a: "hello", b: 4 }, true, { c: ['2024-06-24T11:33:02.789Z'] }];
        });
    });
});