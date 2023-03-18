/**
 * Capitalizes the first letter of each word in a string.
 * @example capitalize("hello world") // "Hello World"
 * @param str - The string to be capitalized.
 * @param format - The format of the string.
 * @returns The capitalized string.
 */

export function capitalize(
  str: string,
  format?: "camelCase" | "kebabCase" | "snakeCase" | "pascalCase"
) {
  let value = str;

  switch (format) {
    case "camelCase":
    case "pascalCase":
      value = value.split(/(?=[A-Z])/).join(" ");
      break;
    case "kebabCase":
      value = value.split("-").join(" ");
      break;
    case "snakeCase":
      value = value.split("_").join(" ");
  }

  const splittedValues = value.toLowerCase().split(" ");

  const transformedValues = splittedValues.map(
    (item) => item.charAt(0).toUpperCase() + item.substring(1)
  );

  return transformedValues.join(" ");
}
