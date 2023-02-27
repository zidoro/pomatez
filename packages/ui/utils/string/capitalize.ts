export function capitalize(str: string, { splitter = " " } = {}) {
  const splittedValues = str.toLowerCase().split(splitter);

  const transformedValues = splittedValues.map(
    (item) => item.charAt(0).toUpperCase() + item.substring(1)
  );

  return transformedValues.join(" ");
}
