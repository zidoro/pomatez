import { capitalize } from "../capitalize";

describe("capitalize - string helper", () => {
  it("should work as expected", () => {
    expect(capitalize("foo")).toBe("Foo");
    expect(capitalize("foo bar")).toBe("Foo Bar");
    expect(capitalize("foo-bar-baz")).toBe("Foo-bar-baz");
    expect(capitalize("foo-bar-baz", { splitter: "-" })).toBe(
      "Foo Bar Baz"
    );
  });
});
