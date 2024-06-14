export declare type Config = {
    strictDating: boolean
};

export declare type Iterable = object | any[];

/**
* Convert all fields and subfields of a given object which have potential to become a date, to a date.
* by default, only simple ISO strings will be converted. If you want to convert all fields which can be parsed to a date
* set strict to false.
* @param obj An iterable (meaning an ```object``` or ```array```).
* @param config an object which holds the boolean value of ```strictDating```, which if set to false makes dater convert all
* valid strings to a date besides only ISODates. The default value is true.
* @returns The same object but with all relevant values converted to a date.
* @example
* const obj = 
*/

export declare function convert(obj: any, config: Config): Iterable; 
