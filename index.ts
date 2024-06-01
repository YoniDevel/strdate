import traverse from 'traverse';

import ISOStringRegEx from './consts.js';
import isArrayOrObject from './utils.js'
import { DaterConfig, DaterIterable } from './dater.js';

function isDaterAppropriate (value: any, strictDating: boolean): boolean {
    return typeof value === 'string' && strictDating ? ISOStringRegEx.test(value) : true;
} ;

function daterString (value: string): Date | string {
    const parsedDate: Date = new Date(value);
    return !isNaN(parsedDate.getTime()) ? parsedDate : value;
};

const dater =  (obj: any, config: DaterConfig = { strictDating: true }): any => {
    if (!isArrayOrObject(obj)) return isDaterAppropriate(obj, config.strictDating) ? daterString(obj) as string | Date : obj as any;
    return traverse.map(obj, (value: any) => {
        return isDaterAppropriate(value, config.strictDating) ? daterString(value) : value;
    }) as DaterIterable;
};

export default dater;
