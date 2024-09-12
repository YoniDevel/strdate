import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

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
