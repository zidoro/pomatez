import React, { useRef } from "react";
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
