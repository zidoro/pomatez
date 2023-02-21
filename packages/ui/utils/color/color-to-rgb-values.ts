import { getCssVar } from "./get-css-var";
import { hexToRGBA } from "./hex-to-rgba";
import { isCssVar } from "./is-css-var";

export const colorToRgbValues = (colorProp: string) => {
  const color = isCssVar(colorProp) ? getCssVar(colorProp) : colorProp;

  if (color.charAt(0) === "#") return hexToRGBA(color);

  const safeColor = color.replace(/ /g, "");
  const colorType = color.substr(0, 4);

  const regArray = safeColor.match(/\((.+)\)/);

  if (!colorType.startsWith("rgb") || !regArray) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        `Pomatez: Only supports ["RGB", "RGBA", "HEX"] color.`
      );
    }

    return [0, 0, 0];
  }

  return regArray[1].split(",").map((str) => Number.parseFloat(str));
};
