import { cx } from "../cx";

describe("cx - classNames helper", () => {
  it("should return empty string", () => {
    expect(cx()).toBe("");
  });

  it("should return a string value", () => {
    expect(cx("foo")).toBe("foo");
  });

  it("should return a joined string values", () => {
    expect(cx("foo", "bar")).toBe("foo bar");
  });
});
