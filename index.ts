import traverse from 'traverse';
import ISOStringRegEx from './consts.js';
import { DaterConfig, DaterIterable } from './dater.js';

const isDaterAppropriate = (value: any, strictDating: boolean): boolean => 
    typeof value === 'string' && strictDating ? ISOStringRegEx.test(value) : true;

const daterString = (value: any): Date | typeof value => {
    const parsedDate: Date = new Date(value);
    if (!isNaN(parsedDate.getTime())) return parsedDate;
    return value;
};

const dater = (obj: DaterIterable, config: DaterConfig = { strictDating: true }): DaterIterable | Date  => {
    obj = traverse.map(obj, (value: any) => {
        if (isDaterAppropriate(value, config.strictDating)) return daterString(value);
    })
    return obj;
};

export default dater;
