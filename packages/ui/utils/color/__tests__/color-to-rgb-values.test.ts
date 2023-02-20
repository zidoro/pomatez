import { colorToRgbValues } from "../color-to-rgb-values";

describe("colorToRgbValues - color helper", () => {
  it("should return a rgb values", () => {
    expect(colorToRgbValues("000")).toEqual([0, 0, 0]);
  });

  it("should return a rgba values", () => {
    expect(colorToRgbValues("rgba(0,0,0,0.5)")).toEqual([0, 0, 0, 0.5]);
  });

  it("should return a hex values", () => {
    expect(colorToRgbValues("#000")).toBe("rgba(0,0,0,1)");
  });
});
