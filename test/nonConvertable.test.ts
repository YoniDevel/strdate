import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

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
