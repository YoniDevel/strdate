import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

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