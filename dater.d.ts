export declare type Config = {
    strictDating: boolean
};

export declare type DaterIterable = { [key: string]: any } | any[];

/**
* Convert all fields and subfields of a given object which have potential to become a date, to a date.
* by default, only simple ISO strings will be converted. If you want to convert all fields which can be parsed to a date
* set strict to false.
* @param obj A dater iterable (meaning an ```object```, ```array``` or ```string```).
* @param config an object which holds the boolean value of ```strictDating```, which if set to false makes dater convert all
* valid strings to a date besides only ISODates. The default value is true.
* @returns The same object but with all relevant values converted to a date.
*/

export declare function dater(obj: any, config: Config): DaterIterable; 
