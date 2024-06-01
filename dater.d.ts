export declare type DaterConfig = {
    strictDating: boolean
};

export declare type DaterIterable = { [key: string]: any } | any[] | string;

/**
* Convert all fields and subfields of a given object which have potential to become a date, to a date.
* by default, only simple ISO strings will be converted. If you want to convert all fields which can be parsed to a date
* set strict to false.000
* @param obj some object.
* @param strictDating a boolean which applies dater on strict mode depending on the value. The default value is true.
* @returns The same object but with all relevant values converted to a date.
*/

export declare function dater(obj: DaterIterable, config: DaterConfig): DaterIterable | Date; 
