import traverse from "traverse";

import { DateitConfig } from "./index.d.js";
import utils from "./utils.js";
import regexes from "./regexes.js";

const isConvertable = (value: any, config: DateitConfig): boolean => {
  if (typeof value === 'string') {
    if (regexes.FullISOStringRegex.test(value)) return true;
    if (config.convertShortDates && regexes.shortDateRegex.test(value)) return true;
    if (config.convertLongDates && regexes.longDateRegex.test(value)) return true;
    if (config.convertNonFullIsoDates && regexes.nonFullISOStringRegex.test(value)) return true;
    if (config.convertFourFigitNumbers) {
      const number = Number(value);
      return !isNaN(number) && utils.isFourDigitInteger(number);
    }
  }
  return false;
};

const convertToDate = (value: string): Date | string => {
  const parsedDate: Date = new Date(value);
  return !isNaN(parsedDate.getTime()) ? parsedDate : value;
};

const convertIfConvertable = (value: any, config: DateitConfig): any => 
  isConvertable(value, config)
  ? convertToDate(value)
  : value;

const dateit = (obj: any, config: DateitConfig = {}): any => 
  traverse.map(obj, (value: any) => 
    convertIfConvertable(value, config)
  );
export default dateit;
