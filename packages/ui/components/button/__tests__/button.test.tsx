import { render, screen, testA11y } from "@/test-utils";
import Button from "../button";

describe("<Button />", () => {
  test("should pass the a11y test", async () => {
    await testA11y(<Button>Button</Button>);
  });

  test("as - prop should work correctly", () => {
    render(<Button>Button</Button>);

    const buttonElement = screen.getByText("Button");

    expect(buttonElement.nodeName).toBe("BUTTON");
    expect(buttonElement.classList).toContainEqual("pomatez-button");
    expect(buttonElement).toMatchInlineSnapshot(`
      <button
        class="pz-c-fxPYyP pz-c-fxPYyP-iPJLV-css pomatez-button"
      >
        Button
      </button>
    `);
  });
});
