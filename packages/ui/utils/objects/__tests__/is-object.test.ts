import { isObject } from "../is-object";

describe("isObject - object helper", () => {
  it("should return true if it's an object", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new RegExp("test"))).toBe(true);
  });

  it("should return false if it's not an object", () => {
    expect(isObject(1)).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
