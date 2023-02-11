import React from "react";
import { ThemeProvider } from "../theme";
import { VStack } from "../components";

export const parameters = {
  backgrounds: {
    default: "light",
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <VStack>
        <Story />
      </VStack>
    </ThemeProvider>
  ),
];
