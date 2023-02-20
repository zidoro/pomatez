import { getCssVar } from "../get-css-var";

describe("getCssVar - color helper", () => {
  it("should return a css variable", () => {
    let element = document.createElement("div");
    element.style.setProperty("--color", "#000");

    expect(getCssVar("--color", element)).toBe("#000");
  });
});
