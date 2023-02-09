export const isCssVar = (property: string) => {
  return property && property?.indexOf("var(") === 0 ? true : false;
};
