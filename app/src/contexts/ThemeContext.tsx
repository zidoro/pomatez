import React from "react";
import { isPreferredDark } from "utils";
import { GlobalStyles } from "styles";
import { useSelector, useDispatch } from "react-redux";
import { AppStateTypes, setEnableDarkTheme } from "store";

type ThemeProps = {
  isDarkMode: boolean;
  toggleThemeAction?: () => void;
};

const ThemeContext = React.createContext<ThemeProps>({
  isDarkMode: isPreferredDark(),
});

const ThemeProvider: React.FC = ({ children }) => {
  const isDarkMode = useSelector(
    (state: AppStateTypes) => state.settings.enableDarkTheme
  );

  const dispatch = useDispatch();

  const toggleThemeAction = () => {
    dispatch(setEnableDarkTheme(!isDarkMode));
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleThemeAction,
      }}
    >
      <GlobalStyles isDarkMode={isDarkMode} />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
