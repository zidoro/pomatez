import { capitalize } from "../capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of each word in a string", () => {
    expect(capitalize("")).toBe("");
    expect(capitalize("hello world")).toBe("Hello World");
    expect(capitalize("helloWorld", "camelCase")).toBe("Hello World");
    expect(capitalize("hello-world", "kebabCase")).toBe("Hello World");
    expect(capitalize("HelloWorld", "pascalCase")).toBe("Hello World");
    expect(capitalize("hello_world", "snakeCase")).toBe("Hello World");
  });
});
