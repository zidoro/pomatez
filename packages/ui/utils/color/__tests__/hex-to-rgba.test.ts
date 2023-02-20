import { hexToRGBA } from "../hex-to-rgba";

describe("hexToRGBA - color helper", () => {
  it("should return a hex color with alpha", () => {
    expect(hexToRGBA("#000", 0.5)).toBe("rgba(0,0,0,0.5)");
  });
});
