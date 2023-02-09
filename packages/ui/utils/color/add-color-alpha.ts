import { colorToRgbValues } from "./color-to-rgb-values";
import { getCssVar } from "./get-css-var";
import { hexToRGBA } from "./hex-to-rgba";
import { isCssVar } from "./is-css-var";
import { isHex } from "./is-hex";

export const addColorAlpha = (
  colorProp?: string,
  alpha: number = 1
) => {
  if (!colorProp) return "";
  const color = isCssVar(colorProp) ? getCssVar(colorProp) : colorProp;

  if (isHex(color)) {
    return hexToRGBA(color, alpha);
  } else if (!/^#|rgb|RGB/.test(color)) {
    return color;
  }
  const [r, g, b] = colorToRgbValues(color);
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;

  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
};
