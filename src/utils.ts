const isArrayOrObject = (input: any) =>
    typeof input === 'object' || Array.isArray(input);

const isFourDigitInteger = (num: number) => 
    Number.isInteger(num) && num >= 1000 && num <= 9999;

export { isArrayOrObject, isFourDigitInteger };
