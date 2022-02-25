import { useContext } from "react";
import { ThemeContext, ViewportContext, NavContext } from "../contexts";

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
