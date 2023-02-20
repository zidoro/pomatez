import { isCssVar } from "../is-css-var";

describe("isCssVar - color helper", () => {
  it("should return true", () => {
    expect(isCssVar("var(--color)")).toBe(true);
  });

  it("should return false", () => {
    expect(isCssVar("#000")).toBe(false);
  });
});
