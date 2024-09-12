import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

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