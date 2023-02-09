import { isCssVar } from "./is-css-var";

export const getCssVar = (
  name: string,
  parent: HTMLElement | null | undefined = null
) => {
  if (typeof document === "undefined" || !name) {
    return "";
  }
  const target = parent || document.documentElement;
  const property = isCssVar(name)
    ? name.replace("var(", "").replace(")", "")
    : name.includes("--")
    ? name
    : `--${name}`;

  return getComputedStyle(target).getPropertyValue(property);
};
