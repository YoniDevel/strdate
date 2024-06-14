const isArrayOrObject = (input: any) =>
    typeof input === 'object' || Array.isArray(input);

export default isArrayOrObject;
