export const rgbToRgba = (rgb: string, alpha: number = 1) => {
  const [r, g, b] = rgb.split(",").map((str) => Number.parseFloat(str));
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;

  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
};
