import { rgbToRgba } from "../rbg-to-rgba";

describe("rgbToRgba - color helper", () => {
  it("should return rgba color", () => {
    expect(rgbToRgba("rgb(0,0,0)")).toBe("rgba(0, 0, 0, 1)");
  });
  it("should return rgba color with alpha", () => {
    expect(rgbToRgba("rgb(0,0,0)", 0.5)).toBe("rgba(0, 0, 0, 0.5)");
  });
});
