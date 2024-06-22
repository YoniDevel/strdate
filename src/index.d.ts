export declare type strdateConfig = {
  convertShortDates?: boolean;
  convertLongDates?: boolean;
  convertNonFullIsoDates?: boolean;
  convertFourFigitNumbers?: boolean;
};

/**
* Convert all fields and subfields of a given object which have potential to become a date, to a date.
* by default, only simple ISO strings will be converted. If you want to convert all fields which can be parsed to a date
* set strict to false.
* @param obj anything.
* @param config an object which holds the boolean values of ```convertShortDates```, which if set to true makes the date converter convert also
* js short dates, ```convertLongDates``` which if set to true makes the date converter convert also
* js long dates and ```convertFourFigitNumbers```, which if set to true makes the date converter 
* convert 4 digit numbers to dates as well. All default values of these fields are set to ```false```
* @returns The same object but with all relevant values converted to a date.
* @example
* import convert from 'ts-date-converter';
* 
* const a = convert('Hello world!'); // will stay the same
* const b = convert(true); // will stay the same
* const c = convert(new Date('2050-10-29T18:45:06.820Z')); // will stay the same
* const d = convert('03/25/2015'); // will stay a string
* const d = convert('2001-04-20T10:20:30Z'); // will be converted to a date
* const e = convert('1999-06-14'); // will be converted to a date
* const obj = {
*   firstName: 'John',
    lastName: 'Doe',
    age: 34,
    dateOfBirth: '2001-04-20T10:20:30Z',
    likesTea: true,
    proffesions: ['lawyer', 'teacher', 'doctor'],
* };
  const convertedObject = convert(obj);
  // convertedObject will be {
  //  firstName: 'John',
  //  lastName: 'Doe',
  //  age: 34,
  //  dateOfBirth: new Date('2001-04-20T10:20:30Z'),
  //  likesTea: true,
  //  proffesions: ['lawyer', 'teacher', 'doctor'],
  //}
*/

export declare function convert(obj: any, config: strdateConfig): any;
