import { isValidElement, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { axe, AxeCore } from "vitest-axe";
import { expect } from "vitest";

export async function testA11y(
  ui: ReactElement,
  options?: RenderOptions & { axeOptions?: AxeCore.RunOptions }
) {
  const { axeOptions, ...renderOptions } = options || {};
  const container = isValidElement(ui)
    ? render(ui, renderOptions).container
    : ui;

  const results = await axe(container, axeOptions);
  expect(results).toHaveNoViolations();
}
