import { isObject } from "./is-object";

export const copyObject = (obj: any) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];

  return { ...obj };
};
