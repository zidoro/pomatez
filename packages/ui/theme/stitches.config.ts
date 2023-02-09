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

// Stitches types
export type StitchesConfig = typeof config;
export type VariantProps<
  T extends { [key: string]: any; [key: symbol]: any }
> = Stitches.VariantProps<T>;
export type PropertyValue<T extends keyof Stitches.CSSProperties> =
  Stitches.PropertyValue<T>;
export type ScaleValue<T> = Stitches.ScaleValue<T>;
export type CSSProperties = Stitches.CSSProperties;
export type SxProps = Stitches.CSS<StitchesConfig>;
export type StitchesTheme = typeof theme;

// Common theme types
export type Spaces = StitchesConfig["theme"]["space"];
export type FontSizes = StitchesConfig["theme"]["fontSizes"];
export type Fonts = StitchesConfig["theme"]["fonts"];
export type FontWeights = StitchesConfig["theme"]["fontWeights"];
export type LineHeights = StitchesConfig["theme"]["lineHeights"];
export type LetterSpacings = StitchesConfig["theme"]["letterSpacings"];
export type Colors = StitchesConfig["theme"]["colors"];
export type Radii = StitchesConfig["theme"]["radii"];
export type zIndices = StitchesConfig["theme"]["zIndices"];
export type BorderWeights = StitchesConfig["theme"]["borderWeights"];
export type Transitions = StitchesConfig["theme"]["transitions"];
export type Breakpoints = StitchesConfig["theme"]["breakpoints"];
