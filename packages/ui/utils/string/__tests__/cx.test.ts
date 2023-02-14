import { describe, it, expect } from "vitest";
import { cx } from "../cx";

describe("cx - class names utility", () => {
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
