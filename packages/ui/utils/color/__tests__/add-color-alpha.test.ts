import { addColorAlpha } from "../add-color-alpha";

describe("addColorAlpha - color helper", () => {
  it("should return a hex color with alpha", () => {
    expect(addColorAlpha("#000", 0.5)).toBe("rgba(0,0,0,0.5)");
  });

  it("should return a rgb color with alpha", () => {
    expect(addColorAlpha("rgb(0, 0, 0)", 0.5)).toBe("rgba(0,0,0,0.5)");
  });

  it("should return a rgba color with alpha", () => {
    expect(addColorAlpha("rgba(0,0,0,0.5)", 0.5)).toBe(
      "rgba(0,0,0,0.5)"
    );
  });
});
