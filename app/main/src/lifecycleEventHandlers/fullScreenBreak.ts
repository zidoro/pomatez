import {
	activateFullScreenShortcuts,
	deactivateFullScreenShortcuts,
} from "../helpers";
import { BrowserWindow, Menu, Tray } from "electron";

export type FullscreenState = {
	isFullscreen: boolean;
};

type FullscreenArgs = {
	shouldFullscreen: boolean;
	alwaysOnTop: boolean;
};

type AppArgs = {
	tray: Tray | null;
	trayTooltip: string;
	win: BrowserWindow | null;
	contextMenu: Menu;
	isFullscreen: FullscreenState["isFullscreen"];
};

const setFullScreen = (
	flag: boolean,
	alwaysOnTop: boolean,
	win: BrowserWindow | null,
	isFullscreen: FullscreenState["isFullscreen"]
) => {
	if (flag) {
		win?.setResizable(true);
	}
	win?.setFullScreenable(true);
	win?.setAlwaysOnTop(alwaysOnTop, "screen-saver");
	win?.setFullScreen(flag);
	win?.setVisibleOnAllWorkspaces(flag);
	win?.show();
	win?.focus();

	isFullscreen = flag;
};

/**
 * Handles the event of the main app SET_FULLSCREEN_BREAK
 *
 * @param fullscreenArgs
 * @param appArgs
 */
export const setFullscreenBreakHandler = (
	fullscreenArgs: FullscreenArgs,
	appArgs: AppArgs
) => {
	const { shouldFullscreen, alwaysOnTop } = fullscreenArgs;
	const { tray, trayTooltip, win, contextMenu, isFullscreen } = appArgs;

	if (shouldFullscreen) {
		setFullScreen(true, alwaysOnTop, win, isFullscreen);

		activateFullScreenShortcuts(() => {});

		tray?.setToolTip("");
		tray?.setContextMenu(
			Menu.buildFromTemplate([
				{
					label: "Please wait for your break to end.",
				},
			])
		);
	} else {
		setFullScreen(false, alwaysOnTop, win, isFullscreen);

		deactivateFullScreenShortcuts();
		tray?.setToolTip(trayTooltip);
		tray?.setContextMenu(contextMenu);
	}
};
