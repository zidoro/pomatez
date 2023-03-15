import { padNumber } from "../pad-number";

describe("padNumber", () => {
  it("should pad a number with a leading zero if it is less than 10", () => {
    expect(padNumber(1)).toBe("01");
  });
  it("should return the number as a string if it is greater than or equal to 10", () => {
    expect(padNumber(10)).toBe("10");
    expect(padNumber(11)).toBe("11");
  });
});
