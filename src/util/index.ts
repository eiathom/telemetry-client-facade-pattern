export const ARRAY_SEPARATOR = ",";

export const getStringValueAsArray = (value: string): Array<string> => {
  return value
    .trim()
    .split(ARRAY_SEPARATOR)
    .filter(element => element.trim().length !== 0);
};

export const getParsedValueAsType = <F extends (...args: any[]) => any>(
  value: string,
  parseFunction: F,
): ReturnType<F> => {
  const cleanValue = value.trim();
  return parseFunction(cleanValue) as ReturnType<F>;
};

export const getValueFromEnvironment = (name: string): string | undefined => {
  return process.env[name];
};

export const parseBoolean = (value: string): boolean => {
  const parsedValue = value.trim();
  if (["true", "false"].includes(parsedValue)) {
    return parsedValue === "true";
  }
  throw new Error(`cannot extract boolean value given: '${value}'`);
};

export const getParsedArrayTypeValues = <F extends (...args: any) => any>(
  values: Array<string>,
  parseFunction: F,
): Array<ReturnType<F>> => {
  return values.map(value => {
    return getParsedValueAsType(value, parseFunction);
  }) as Array<ReturnType<F>>;
};
