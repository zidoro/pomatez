import React, { useEffect, useRef } from "react";
import { isPreferredDark } from "utils";
import { GlobalStyles } from "styles";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import { setEnableDarkTheme } from "store";

type ThemeProps = {
  isDarkMode: boolean;
  toggleThemeAction?: () => void;
};

const ThemeContext = React.createContext<ThemeProps>({
  isDarkMode: isPreferredDark(),
});

const ThemeProvider: React.FC = ({ children }) => {
  const settings = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const useNativeTitlebar = useRef(settings.useNativeTitlebar);

  const toggleThemeAction = () => {
    dispatch(setEnableDarkTheme(!settings.enableDarkTheme));
  };

  useEffect(() => {
    if (!settings.followSystemTheme) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      dispatch(setEnableDarkTheme(e.matches));
    };
    // Ensure theme matches current system theme
    dispatch(setEnableDarkTheme(media.matches));
    media.addEventListener("change", listener);
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [dispatch, settings.followSystemTheme]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: settings.enableDarkTheme,
        toggleThemeAction,
      }}
    >
      <GlobalStyles
        isDarkMode={settings.enableDarkTheme}
        useNativeTitlebar={useNativeTitlebar.current}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
