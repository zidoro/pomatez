import { useContext } from "react";
import { NavContext, ThemeContext, ViewportContext } from "../context";

export const useContextProvider = () => {
  const { isDarkMode, themeToggler } = useContext(ThemeContext);

  const { isMenuOpen, toggleMenu, closeMenu } = useContext(NavContext);

  const { width } = useContext(ViewportContext);

  const isOnMobile = width <= 1024;

  return {
    isDarkMode,
    themeToggler,
    isOnMobile,
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
