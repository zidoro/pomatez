/**
 * This function allows validate if a string is a
 * hexadecimal value
 * @param str [string] hexadecimal value
 * @returns result [boolean]
 */
export const isHex = (str: string): boolean => {
  const exp = /#[a-fA-F0-9]{3,6}/g;

  return exp.test(str);
};
