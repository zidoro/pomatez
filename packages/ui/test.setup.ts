import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import jestDomMatchers from "@testing-library/jest-dom/matchers";
import { afterEach, beforeEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend(axeMatchers);
expect.extend(jestDomMatchers);

afterEach(() => cleanup());

beforeEach(() => {
  const createElement = document.createElement.bind(document);
  document.createElement = (tagName: any) => {
    if (tagName === "canvas") {
      return {
        getContext: () => ({}),
      };
    }
    return createElement(tagName);
  };
});
