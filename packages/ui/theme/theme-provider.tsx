import { createContext, ReactNode } from "react";
import { globalStyles as applyGlobalStyles } from "./global.styles";

const ThemeContext = createContext(null);

type ThemeProps = { children?: ReactNode };

const ThemeProvider = ({ children }: ThemeProps) => {
  applyGlobalStyles();
  return (
    <ThemeContext.Provider value={null}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
