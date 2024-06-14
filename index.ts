import traverse from "traverse";

import isArrayOrObject from "./utils.js";
import { Config, Iterable } from "./index.d.js";

const ISOStringRegEx: RegExp = /^\d{4}-(0[1-9]|1[0-2])$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])([T](\d{2}):(\d{2})(?::(\d{2})(\.\d{1,9})?)?(Z)?)?$/;

const isConvertable = (value: any, strictDating: boolean): boolean => {
  if (typeof value === 'string') {
    if (ISOStringRegEx.test(value)) return true;
    if (!strictDating) {
      const number = Number(value);
      return !isNaN(number); 
    }
    return false
  }
  return false;
};

const convertToDate = (value: string): Date | string => {
  const parsedDate: Date = new Date(value);
  return !isNaN(parsedDate.getTime()) ? parsedDate : value;
};

const convert = (obj: any, config: Config = { strictDating: true }): any => {
  if (!isArrayOrObject(obj))
    return isConvertable(obj, config.strictDating)
      ? (convertToDate(obj) as string | Date)
      : (obj as any);
  return traverse.map(obj, (value: any) => {
    return isConvertable(value, config.strictDating)
      ? convertToDate(value)
      : value;
  }) as Iterable;
};

export default convert;
