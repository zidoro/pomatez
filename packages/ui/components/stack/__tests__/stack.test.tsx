import { describe, expect, test } from "vitest";
import { render, screen, testA11y } from "@/test-utils";
import Stack from "../stack";

describe("Stack component", () => {
  test("passes a11y test", async () => {
    await testA11y(<Stack>This is a stack component.</Stack>);
  });

  test("as - prop works correctly", () => {
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

  test("render all the allowed shorthand style props", () => {
    render(
      <Stack
        data-testid="stack-row"
        direction="row"
        align="center"
        justify="center"
        wrap="wrap"
        gap="$5"
      >
        Stack with shorthand style props
      </Stack>
    );

    const stackElement = screen.getByTestId("stack-row");
    expect(stackElement).toMatchInlineSnapshot(`
      <div
        class="pz-c-dhzjXW pz-c-dhzjXW-ejCoEP-direction-row pz-c-dhzjXW-ieRUUph-css pomatez-stack"
        data-testid="stack-row"
      >
        Stack with shorthand style props
      </div>
    `);
  });
});
