import { StitchesTheme, createTheme } from "./stitches.config";

/** Configuration Interface */
declare namespace ConfigType {
  /** Theme interface. */
  export type Theme<T = {}> = {
    fonts?: { [token in number | string]: boolean | number | string };
    fontSizes?: {
      [token in number | string]: boolean | number | string;
    };
    fontWeights?: {
      [token in number | string]: boolean | number | string;
    };
    lineHeights?: {
      [token in number | string]: boolean | number | string;
    };
    letterSpacings?: {
      [token in number | string]: boolean | number | string;
    };
    space?: { [token in number | string]: boolean | number | string };
    radii?: { [token in number | string]: boolean | number | string };
    zIndices?: {
      [token in number | string]: boolean | number | string;
    };
    borderWeights?: {
      [token in number | string]: boolean | number | string;
    };
    colors?: { [token in number | string]: boolean | number | string };
    shadows?: { [token in number | string]: boolean | number | string };
    dropShadows?: {
      [token in number | string]: boolean | number | string;
    };
    transitions?: {
      [token in number | string]: boolean | number | string;
    };
    breakpoints?: {
      [token in number | string]: boolean | number | string;
    };
  } & {
    [Scale in keyof T]: {
      [Token in keyof T[Scale]]: T[Scale][Token] extends
        | boolean
        | number
        | string
        ? T[Scale][Token]
        : boolean | number | string;
    };
  };
}

export type BaseTheme = ConfigType.Theme;
export type PomatezTheme = StitchesTheme;
export type ThemeType = "dark" | "light";
export type CreateTheme = ReturnType<typeof createTheme>;

export type Theme = {
  type?: ThemeType | string;
  className?: string;
  theme?: BaseTheme;
};

export type PomatezThemeContext = {
  type: ThemeType | string;
  theme?: PomatezTheme;
  isDark?: boolean;
};
