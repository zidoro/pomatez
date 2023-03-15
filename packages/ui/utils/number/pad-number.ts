/**
 * Pads a number with a leading zero if it is less than 10
 * @example padNumber(1) // "01"
 * @param num number to pad
 * @returns padded number
 */

export function padNumber(num: number) {
  if (num < 10) return "0" + num;

  return num.toString();
}
