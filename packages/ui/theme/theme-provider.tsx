import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateTheme, PomatezThemeContext, ThemeType } from "./types";
import { defaultContext, ThemeContext } from "./theme-context";
import { useSSR } from "../hooks/use-ssr";
import {
  changeTheme,
  getDocumentCSSTokens,
  getDocumentTheme,
  getThemeName,
} from "./utils";
import { copyObject } from "../utils";
import deepMerge from "../utils/deep-merge";
import GlobalStyles from "./global-styles";

export type ThemeProviderProps = {
  theme?: CreateTheme;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
};

export const ThemeProvider = ({
  disableGlobalStyles = false,
  children,
  theme,
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState(defaultContext.type);

  const { isBrowser } = useSSR();

  const providerValue = useMemo<PomatezThemeContext>(() => {
    const themeTokens = isBrowser ? getDocumentCSSTokens() : {};
    const theme = deepMerge(
      copyObject(defaultContext.theme),
      themeTokens
    );
    const themeName = getThemeName(currentTheme);

    return {
      theme,
      type: themeName,
      isDark: themeName === "dark",
    };
  }, [currentTheme, isBrowser]);

  const changeCurrentTheme = (type: ThemeType | string) => {
    setCurrentTheme((prevTheme) =>
      prevTheme !== type ? type : prevTheme
    );
  };

  const changeTypeBaseEl = useCallback((el: HTMLElement) => {
    const themeValue = getDocumentTheme(el);

    themeValue && changeCurrentTheme(themeValue);
  }, []);

  useEffect(() => {
    // initial set
    changeTypeBaseEl(document?.documentElement);

    const observer = new MutationObserver((mutation) => {
      if (
        mutation &&
        mutation.length > 0 &&
        mutation[0]?.target.nodeName === "BODY"
      ) {
        const documentTheme = document?.body?.dataset?.theme;

        documentTheme && changeCurrentTheme(documentTheme);
      } else {
        changeTypeBaseEl(document?.documentElement);
      }
    });

    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    observer.observe(document?.body, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    return () => observer.disconnect();
  }, [changeTypeBaseEl]);

  useEffect(() => {
    if (!isBrowser || !theme) return;
    if (theme?.className) {
      changeTheme(theme.className);
      changeCurrentTheme(getThemeName(theme.className));
    }
  }, [isBrowser, theme]);

  return (
    <ThemeContext.Provider value={providerValue}>
      {!disableGlobalStyles && <GlobalStyles />}
      {children}
    </ThemeContext.Provider>
  );
};
