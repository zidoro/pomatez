import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import jestDomMatchers from "@testing-library/jest-dom/matchers";
import { beforeEach, expect } from "vitest";

expect.extend(axeMatchers);
expect.extend(jestDomMatchers);

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
