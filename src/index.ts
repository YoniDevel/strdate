import traverse from "traverse";

import { DateConverterConfig } from "./index.d.js";
import { isArrayOrObject, isFourDigitInteger } from "./utils.js";
import { ISOStringRegex, shortDateRegex, longDateRegex } from "./regexes.js";

const isConvertable = (value: any, config: DateConverterConfig): boolean => {
  if (typeof value === 'string') {
    if (ISOStringRegex.test(value)) return true;
    if (config.convertShortDates && shortDateRegex.test(value)) return true;
    if (config.convertLongDates && longDateRegex.test(value)) return true;
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

const convertIfConvertable = (value: any, config: DateConverterConfig): any => 
  isConvertable(value, config)
  ? convertToDate(value)
  : value;

const convert = (obj: any, config: DateConverterConfig = {}): any => {
  if (!isArrayOrObject(obj)) return convertIfConvertable(obj, config);
  return traverse.map(obj, (value: any) => 
    convertIfConvertable(value, config)
  );
};

export default convert;
