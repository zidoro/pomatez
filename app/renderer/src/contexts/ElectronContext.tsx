import React, { useCallback, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import isElectron from "is-electron";
import {
	SET_MINIMIZE,
	SET_CLOSE,
	SET_SHOW,
	SET_ALWAYS_ON_TOP,
	SET_FULLSCREEN_BREAK,
	SET_UI_THEME,
	SET_NATIVE_TITLEBAR,
	TRAY_ICON_UPDATE,
} from "@pomatez/shareables";

import { AppStateTypes, SettingTypes } from "store";
import { CounterContext } from "./CounterContext";
import { TraySVG } from "components";
import { encodeSvg } from "utils";

type ElectronProps = {
	onMinimizeCallback?: () => void;
	onExitCallback?: () => void;
	openExternalCallback?: () => void;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider: React.FC = ({ children }) => {
	const { electron } = window;

	const timer = useSelector((state: AppStateTypes) => state.timer);

	const settings: SettingTypes = useSelector(
		(state: AppStateTypes) => state.settings
	);

	const { count, duration, timerType, shouldFullscreen } = useContext(
		CounterContext
	);
	const dashOffset = (duration - count) * (24 / duration);

	const onMinimizeCallback = useCallback(() => {
		if (isElectron()) {
			electron.send(SET_MINIMIZE, {
				minimizeToTray: settings.minimizeToTray,
			});
		}
	}, [electron, settings.minimizeToTray]);

	const onExitCallback = useCallback(() => {
		if (isElectron()) {
			electron.send(SET_CLOSE, {
				closeToTray: settings.closeToTray,
			});
		}
	}, [electron, settings.closeToTray]);

	const openExternalCallback = useCallback(() => {
		if (isElectron()) {
			const links = document.querySelectorAll("a");

			Array.prototype.forEach.call(links, (link: HTMLAnchorElement) => {
				const url = link.getAttribute("href");
				if (url?.indexOf("http") === 0) {
					link.addEventListener("click", (e) => {
						e.preventDefault();
						electron.openExternal(url);
					});
				}
			});
		}
	}, [electron]);

	useEffect(() => {
		if (isElectron() && !settings.enableFullscreenBreak) {
			electron.send(SET_SHOW);
		}
	}, [electron, timer.timerType, settings.enableFullscreenBreak]);

	useEffect(() => {
		if (isElectron()) {
			electron.send(SET_ALWAYS_ON_TOP, {
				alwaysOnTop: settings.alwaysOnTop,
			});
		}
	}, [electron, settings.alwaysOnTop]);

	useEffect(() => {
		if (isElectron()) {
			electron.send(SET_FULLSCREEN_BREAK, {
				shouldFullscreen,
				alwaysOnTop: settings.alwaysOnTop,
			});
		}
	}, [electron, settings.alwaysOnTop, shouldFullscreen]);

	useEffect(() => {
		if (isElectron()) {
			electron.send(SET_UI_THEME, {
				isDarkMode: settings.enableDarkTheme,
			});
		}
	}, [electron, settings.enableDarkTheme]);

	useEffect(() => {
		if (isElectron()) {
			electron.send(SET_NATIVE_TITLEBAR, {
				useNativeTitlebar: settings.useNativeTitlebar,
			});
		}
	}, [electron, settings.useNativeTitlebar]);

	useEffect(() => {
		if (isElectron() && timer.playing) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = 16;
			canvas.height = 16;

			let svgXML = encodeSvg(
				<TraySVG timerType={timerType} dashOffset={dashOffset} />
			);

			const img = new Image();
			img.src = svgXML;

			img.onload = function () {
				ctx?.drawImage(img, 0, 0);
				const dataUrl = canvas.toDataURL("image/png");

				electron.send(TRAY_ICON_UPDATE, dataUrl);
			};
		}
	}, [electron, timer.playing, timerType, dashOffset]);

	return (
		<ElectronContext.Provider
			value={{
				onMinimizeCallback,
				onExitCallback,
				openExternalCallback,
			}}
		>
			{children}
		</ElectronContext.Provider>
	);
};

export { ElectronContext, ElectronProvider };
