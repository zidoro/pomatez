import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

import commonTheme from "./common";
import lightTheme from "./light-theme";

export const {
  css,
  theme,
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
} = createStitches({
  ...commonTheme,
  theme: {
    ...commonTheme.theme,
    shadows: {
      ...lightTheme.shadows,
    },
    colors: {
      ...commonTheme.theme.colors,
      ...lightTheme.colors,
    },
  },
});

// Re-usable types
export type StitchesConfig = typeof config;
export type VariantProps<
  T extends { [key: string]: any; [key: symbol]: any }
> = Stitches.VariantProps<T>;
export type SxProps = Stitches.CSS<StitchesConfig>;
export type StitchesTheme = typeof theme;
