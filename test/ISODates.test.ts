
import { describe, expect, test } from "vitest";

import strdate from "../src/index.js";

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
