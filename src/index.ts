import traverse from "traverse";

import { Config } from "./index.d.js";
import { isArrayOrObject, isFourDigitInteger } from "./utils.js";
import { ISOStringRegex, shortDateRegex, longDateRegex } from "./regexes.js";

const isConvertable = (value: any, config: Config): boolean => {
  if (typeof value === 'string') {
    if (ISOStringRegex.test(value)) return true;
    if (config.allowOtherFormats) return shortDateRegex.test(value) || longDateRegex.test(value);
    if (config.convertFourFigitNumbers) {
      const number = Number(value);
      return !isNaN(number) && isFourDigitInteger(number);
    }
  }
  return false;
};

const convertToDate = (value: string): Date | string => {
  const parsedDate: Date = new Date(value);
  return !isNaN(parsedDate.getTime()) ? parsedDate : value;
};

const convertIfConvertable = (value: any, config: Config): any => 
  isConvertable(value, config)
  ? convertToDate(value)
  : value;

const datify = (obj: any, config: Config = {}): any => {
  if (!isArrayOrObject(obj)) return convertIfConvertable(obj, config);
  return traverse.map(obj, (value: any) => 
    convertIfConvertable(value, config)
  );
};

export default datify;
