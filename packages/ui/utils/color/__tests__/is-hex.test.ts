import { isHex } from "../is-hex";

describe("isHex - color helper", () => {
  it("should return true", () => {
    expect(isHex("#000")).toBe(true);
  });

  it("should return false", () => {
    expect(isHex("rgb(0,0,0)")).toBe(false);
  });
});
