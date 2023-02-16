import { describe, expect, test } from "vitest";
import { render, screen, testA11y } from "@/test-utils";
import Box from "../box";

describe("<Box />", () => {
  test("passes a11y test", async () => {
    await testA11y(<Box>Box</Box>);
  });

  test("as - prop works correctly", () => {
    render(<Box as="span">Box</Box>);

    const boxElement = screen.getByText("Box");

    expect(boxElement.nodeName).toBe("SPAN");
    expect(boxElement.classList).toContainEqual("pomatez-box");
    expect(boxElement).toMatchInlineSnapshot(`
      <span
        class="PJLV pomatez-box"
      >
        Box
      </span>
    `);
  });
});
