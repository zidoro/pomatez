import { Context, createContext } from "react";
import { PomatezThemeContext } from "./types";
import { theme } from "./stitches.config";

export const defaultContext: PomatezThemeContext = {
  isDark: false,
  theme,
  type: "light",
};

export const ThemeContext: Context<PomatezThemeContext> =
  createContext<PomatezThemeContext>(defaultContext);
