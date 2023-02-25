import { render, screen, testA11y } from "@/test-utils";
import Stack from "../stack";

describe("Stack component", () => {
  test("should pass the a11y test", async () => {
    await testA11y(<Stack>Stack</Stack>);
  });

  test("as - prop should work correctly", () => {
    render(<Stack as="main">Stack</Stack>);

    const stackElement = screen.getByText("Stack");

    expect(stackElement.nodeName).toBe("MAIN");
    expect(stackElement.classList).toContainEqual("pomatez-stack");
    expect(stackElement).toMatchInlineSnapshot(`
      <main
        class="pz-c-dhzjXW pz-c-dhzjXW-iTKOFX-direction-column pz-c-dhzjXW-igxkVMV-css pomatez-stack"
      >
        Stack
      </main>
    `);
  });

  test("direction - prop should work correctly", () => {
    const { rerender } = render(<Stack direction="row">Stack</Stack>);

    const stackElement = screen.getByText("Stack");

    expect(stackElement.getAttribute("class")).toMatch(
      /direction-row/i
    );

    rerender(<Stack direction="column">Stack</Stack>);

    expect(stackElement.getAttribute("class")).toMatch(
      /direction-column/i
    );
  });
});
