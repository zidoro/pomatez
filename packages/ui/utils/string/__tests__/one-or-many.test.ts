import { oneOrMany } from "../one-or-many";

describe("oneOrMany - string unit helper", () => {
  it("should return a string with the unit", () => {
    expect(oneOrMany(1, "day")).toBe("1 day");
    expect(oneOrMany(2, "day")).toBe("2 days");
  });
});
