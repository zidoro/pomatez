import { render, screen, testA11y } from "@/test-utils";
import Text from "../text";

describe("Text component", () => {
  test("should pass a11y test", async () => {
    await testA11y(<Text>Text</Text>);
  });

  test("as - prop should work correctly", () => {
    render(<Text as="span">Text</Text>);

    const textElement = screen.getByText("Text");

    expect(textElement.nodeName).toBe("SPAN");
    expect(textElement.classList).toContainEqual("pomatez-text");
    expect(textElement).toMatchInlineSnapshot(`
      <span
        class="pz-c-PJLV pz-c-PJLV-ijfcJME-css pomatez-text"
      >
        Text
      </span>
    `);
  });
});
