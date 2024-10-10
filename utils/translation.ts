export function isStringInObject<T extends object>(
  key: string,
  obj: T
): key is keyof T & string {
  return key in obj;
}
