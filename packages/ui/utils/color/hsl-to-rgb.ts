export const hslToRgb = (hslColor: string) => {
  let [h, s, l] = hslColor
    .replace("hsl(", "")
    .replace(")", "")
    .replaceAll(" ", "")
    .replaceAll("%", "")
    .split(",")
    .map((v) => Number(v));

  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return `rgb(${255 * f(0)},${255 * f(8)},${255 * f(4)})`;
};
