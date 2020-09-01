import React, { useRef } from "react";
import { isPreferredDark } from "utils";
import { GlobalStyles } from "styles";
import { useSelector, useDispatch } from "react-redux";
import { AppStateTypes, setEnableDarkTheme, SettingTypes } from "store";

type ThemeProps = {
	isDarkMode: boolean;
	toggleThemeAction?: () => void;
};

const ThemeContext = React.createContext<ThemeProps>({
	isDarkMode: isPreferredDark(),
});

const ThemeProvider: React.FC = ({ children }) => {
	const settings: SettingTypes = useSelector(
		(state: AppStateTypes) => state.settings
	);

	const dispatch = useDispatch();

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
