import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

describe("ts-convert", () => {
  describe("Single values (not objects or arrays)", () => {
    describe("Non convertable values", () => {
      test("Should keep a non numeric string as is", () => {
        const someString = "some string";
        expect(strdate(someString)).eq(someString);
      });

      test("Should keep a number as is", () => {
        expect(strdate(549)).eq(549);
        expect(strdate(123.23463456)).eq(123.23463456);
      });

      test("Should keep a boolean as is", () => {
        expect(strdate(true)).toBeTruthy();
        expect(strdate(false)).toBeFalsy();
      });

      test("Should keep a four digit number string as is by default", () => {
        const numberString = "2024";
        expect(strdate(numberString)).deep.eq(numberString);
      });

      test("Should keep a typescript date as is", () => {
        const randomDate = new Date("2050-10-29T18:45:06.820Z");

        expect(strdate(randomDate)).deep.eq(randomDate);
        expect(strdate(randomDate).toISOString()).eq(randomDate.toISOString());
      });
    });

    describe("ISO dates", () => {
      describe("Full ISO dates", () => {
        test("Should convert an ISO date string appropriately to the precise date", () => {
          const randomIsoDateString1 = "2024-12-01T15:25:55.567Z";
          const randomIsoDateString2 = "2027-03-24T05:11:30.444Z";

          expect(strdate(randomIsoDateString1)).deep.eq(
            new Date(randomIsoDateString1)
          );
          expect(strdate(randomIsoDateString2).toISOString()).eq(
            randomIsoDateString2
          );
          expect(strdate(randomIsoDateString2).constructor.toString()).contain(
            "function Date"
          );
        });

        test("Should convert an ISO date string without miliseconds to the right date", () => {
          const randomIsoDateStringWithoutMS = "2024-06-01T15:25:55Z";
          const randomIsoDateStringWithMS = "2024-06-01T15:25:55.000Z";

          expect(strdate(randomIsoDateStringWithoutMS)).deep.eq(
            new Date(randomIsoDateStringWithoutMS)
          );
          expect(strdate(randomIsoDateStringWithoutMS).toISOString()).eq(
            randomIsoDateStringWithMS
          );
          expect(
            strdate(randomIsoDateStringWithoutMS).constructor.toString()
          ).contain("function Date");
        });

        test("Should keep an ISO date string with an invalid month as is because it will fail the regex test", () => {
          const invalidMonthIsoDateString = "2024-30-01T15:25:55.567Z";

          expect(strdate(invalidMonthIsoDateString)).eq(
            invalidMonthIsoDateString
          );
        });

        test("Should keep an ISO date string with an invalid day as is because it will fail the regex test", () => {
          const invalidDayIsoDateString = "2024-06-55T15:25:55.567Z";

          expect(strdate(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
        });

        test("Should keep an ISO date string with an invalid hour as is because it will fail the regex test", () => {
          const invalidHourIsoDateString = "2024-06-55T30:25:55.567Z";

          expect(strdate(invalidHourIsoDateString)).eq(
            invalidHourIsoDateString
          );
        });

        test("Should keep an ISO date string with invalid minutes as is because it will fail the regex test", () => {
          const invalidDayIsoDateString = "2024-06-55T15:78:55.567Z";

          expect(strdate(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
        });

        test("Should keep an ISO date string with invalid seconds as is because it will fail the regex test", () => {
          const invalidDayIsoDateString = "2024-06-55T15:25:990.567Z";

          expect(strdate(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
        });

        test("Should keep an ISO date string with invalid miliseconds as is because it will fail the regex test", () => {
          const invalidDayIsoDateString = "2024-06-55T15:78:55.1234Z";

          expect(strdate(invalidDayIsoDateString)).eq(invalidDayIsoDateString);
        });
      });

      describe("Non full ISO dates", () => {
        test("Should not convert a non full ISO date string by default", () => {
          const randomIsoDateStringNotFull = "1945-04-23";

          expect(strdate(randomIsoDateStringNotFull)).eq(
            randomIsoDateStringNotFull
          );
        });

        test("Should not convert a non full ISO date string that has only month and year specified to a date by default", () => {
          const randomIsoDateStringNotFull = "2008-02";

          expect(strdate(randomIsoDateStringNotFull)).eq(
            randomIsoDateStringNotFull
          );
        });

        test("Should convert a non full ISO date string if option is true", () => {
          const randomIsoDateStringNotFull = "1945-04-23";

          expect(
            strdate(randomIsoDateStringNotFull, {
              convertNonFullIsoDates: true,
            })
          ).deep.eq(new Date(randomIsoDateStringNotFull));
          expect(
            strdate(randomIsoDateStringNotFull, {
              convertNonFullIsoDates: true,
            }).constructor.toString()
          ).contain("function Date");
        });

        test("Should convert a non full ISO date string that has only month and year specified to a date if option is on", () => {
          const randomIsoDateStringNotFull = "2008-02";

          expect(
            strdate(randomIsoDateStringNotFull, {
              convertNonFullIsoDates: true,
            })
          ).deep.eq(new Date(randomIsoDateStringNotFull));
          expect(
            strdate(randomIsoDateStringNotFull, {
              convertNonFullIsoDates: true,
            }).constructor.toString()
          ).contain("function Date");
        });
      });
    });

    describe("JS short dates", () => {
      test("Should keep a js short date string as is by default", () => {
        const randomShortDateString = "03/25/2015";

        expect(strdate(randomShortDateString)).eq(randomShortDateString);
      });

      test("Should convert a js short date string to the precise date if option is set to true", () => {
        const randomShortDateString1 = "03/25/2015";
        const randomShortDateString2 = "10/04/1987";

        expect(
          strdate(randomShortDateString1, { convertShortDates: true })
        ).deep.eq(new Date(randomShortDateString1));
        expect(
          strdate(randomShortDateString2, { convertShortDates: true })
        ).deep.eq(new Date(randomShortDateString2));
        expect(
          strdate(randomShortDateString2, {
            convertShortDates: true,
          }).constructor.toString()
        ).contain("function Date");
      });
    });

    describe("JS long dates", () => {
      test("Should keep a js long date string as is by default", () => {
        const randomLongDateString = "May 3 1869";

        expect(strdate(randomLongDateString)).eq(randomLongDateString);
      });

      test("Should convert a js long date string to a date if the option is set to true", () => {
        const randomLongDateString1 = "May 3 1869";
        const randomLongDateString2 = "25 Aug 2000";

        expect(
          strdate(randomLongDateString1, { convertLongDates: true })
        ).deep.eq(new Date(randomLongDateString1));
        expect(
          strdate(randomLongDateString2, { convertLongDates: true })
        ).deep.eq(new Date(randomLongDateString2));
        expect(
          strdate(randomLongDateString2, {
            convertLongDates: true,
          }).constructor.toString()
        ).contain("function Date");
      });
    });
  });

  describe("Objects", () => {
    test("Should convert a field which is an ISO date string in an object to date", () => {
      const someObject = {
        startOfParisOlympics: "2024-07-26T19:30:00Z",
      };

      expect(strdate(someObject)).deep.eq({
        startOfParisOlympics: new Date("2024-07-26T19:30:00Z"),
      });
    });

    test("Should convert only the relevant fields to date", () => {
      const anotherObject = {
        firstName: "John",
        lastName: "Doe",
        age: 34,
        dateOfBirth: "2001-04-20T10:20:30Z",
        likesTea: true,
        proffesions: ["lawyer", "teacher", "doctor"],
      };

      expect(strdate(anotherObject)).deep.eq({
        ...anotherObject,
        dateOfBirth: new Date(anotherObject.dateOfBirth),
      });
    });

    test("Should convert only the relevant fields to date even if they are nested in another object", () => {
      const complexObject = {
        firstName: "John",
        lastName: "Doe",
        age: 34,
        dateOfBirth: "2001-04-20T10:20:30Z",
        mealTimes: {
          breakfast: "2024-06-15",
          lunch: "2024-06-01T15:25:55.567Z",
          dinner: {
            mainCourse: { name: "chicken", time: "2024-06-24T11:33:02.789Z" },
          },
        },
        childrenBirthdays: {
          son: {
            grandson: {
              greatGrandson: {
                birth: ["2027-03-24T05:11:30.444Z"],
              },
            },
          },
        },
      };

      expect(strdate(complexObject, { convertNonFullIsoDates: true })).deep.eq({
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
                birth: [
                  new Date(
                    complexObject.childrenBirthdays.son.grandson.greatGrandson.birth[0]
                  ),
                ],
              },
            },
          },
        },
      });
    });

    test("Should keep an empty object as is", () => {
      expect(strdate({})).deep.eq({});
    });
  });

  describe("Arrays", () => {
    test("Should convert all elements in an array which are date strings to date", () => {
      const arr = [
        "Feb 2 1977",
        "2024-06-24T11:33:02.789Z",
        "2001-04-20T10:20:30Z",
        "10/10/2010",
      ];

      expect(
        strdate(arr, { convertShortDates: true, convertLongDates: true })
      ).deep.eq(arr.map((element) => new Date(element)));
    });

    test("Should convert only the elements in an array which are date strings to date", () => {
      const arr = [
        "2024-06-15",
        34,
        "Feb 2 1977",
        false,
        "Hello world",
        "2008-02",
      ];
      expect(
        strdate(arr, { convertLongDates: true, convertNonFullIsoDates: true })
      ).deep.eq([
        new Date("2024-06-15"),
        34,
        new Date("Feb 2 1977"),
        false,
        "Hello world",
        new Date("2008-02"),
      ]);
    });

    test("Should convert only the elements in an array which are ISO date strings to date even if they are nested", () => {
      const arr = [
        ["2024-06-15"],
        { a: "10/10/2010", b: 4 },
        true,
        [[[{ myName: "is", today: "May 3 1869" }]]],
        { c: ["2024-06-24T11:33:02.789Z"] },
      ];
      expect(
        strdate(arr, { convertShortDates: true, convertLongDates: true })
      ).deep.eq([
        [new Date("2024-06-15")],
        { a: new Date("10/10/2010"), b: 4 },
        true,
        [[[{ myName: "is", today: new Date("May 3 1869") }]]],
        { c: [new Date("2024-06-24T11:33:02.789Z")] },
      ]);
    });

    test("Should keep an empty array as is", () => {
      expect(strdate([])).deep.eq([]);
    });
  });
});
