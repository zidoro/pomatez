import React, { useState, useLayoutEffect, ReactNode } from "react";
import {
  isPreferredDark,
  getFromStorage,
  saveToStorage,
  isSSR,
} from "../utils";
import { GlobalStyle } from "../styles";

type ThemeProps = {
  isDarkMode?: boolean;
  themeToggler?: () => void;
};

const ThemeContext = React.createContext<ThemeProps>({});

const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  const useDarkMode =
    !isSSR && getFromStorage("isDarkMode") && isPreferredDark();
  const [isDarkMode, setDarkMode] = useState(useDarkMode);

  useLayoutEffect(() => {
    if (isDarkMode === null) {
      setDarkMode(isPreferredDark());
    }
    saveToStorage("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const themeToggler = () => {
    setDarkMode((prevState: boolean) => !prevState);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        themeToggler,
      }}
    >
      <GlobalStyle isDarkMode={isDarkMode} />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
