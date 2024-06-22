const isFourDigitInteger = (num: number) => 
    Number.isInteger(num) && num >= 1000 && num <= 9999;

export default { isFourDigitInteger };
