import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

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
  theme: {
    colors: {
      primary: "#007bc7",
      primaryRgb: "0, 123, 199",

      yellow: "#a66703",
      yellowRgb: "166, 103, 3",

      green: "#00855f",
      greenRgb: "0, 133, 95",

      pink: "#db3352",
      pinkRgb: "219, 51, 82",

      headingText: "#212121",
      bodyText: "#666666",
      disabledText: "#9e9e9e",

      bgPrimary: "#fff",
      bgPrimaryRgb: "255, 255, 255",
      bgSecondary: "#fafafa",
      bgTertiary: "#f3f3f3",

      bgPopper: "$bgPrimary",
      bgCode: "$bgTertiary",

      bgRipplePrimary: "rgba($primaryRgb, 0.24)",
      bgRippleGreen: "rgba($greenRgb, 0.24)",
      bgRippleYellow: "rgba($yellowRgb, 0.24)",

      bgInput: "$bgPrimary",
      bgInputFocus: "$bgPrimary",

      primaryButton: "$bgPrimary",
      bgButtonNormal: "$bgPrimary",

      bgTaskList: "$bgTertiary",
      bgTaskCard: "$bgPrimary",
      bgTaskCardHover: "$bgSecondary",
      bgTaskCardFocus: "$bgPrimary",

      titlebarHover: "rgba(0, 0, 0, 0.04)",

      bgSliderThumb: "$bgPrimary",

      borderPrimary: "#e6e6e6",
      borderSecondary: "#f2f2f2",
      borderProgress: "$borderPrimary",
      borderWindow: "$bgPrimary",

      borderInputPrimary: "$borderSecondary",
      borderInputSecondary: "$borderPrimary",

      shadowPrimary: "rgba(0, 0, 0, 0.16)",
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
