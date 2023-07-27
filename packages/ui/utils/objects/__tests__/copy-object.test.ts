import { copyObject } from "../copy-object";

describe("copyObject - object helper", () => {
  it("should return a copy of an object", () => {
    const obj = { a: 1, b: 2 };
    const copy = copyObject(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
  });

  it("should return a copy of an array", () => {
    const arr = [1, 2, 3];
    const copy = copyObject(arr);

    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
  });

  it("should return the same value if it's not an object", () => {
    const value = 1;
    const copy = copyObject(value);

    expect(copy).toBe(value);
  });
});
