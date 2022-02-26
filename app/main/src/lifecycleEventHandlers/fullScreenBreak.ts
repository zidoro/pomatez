import {
	activateFullScreenShortcuts,
	deactivateFullScreenSchortcuts,
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
	fullscreenState: FullscreenState;
};

const setFullScreen = (
	flag: boolean,
	alwaysOnTop: boolean,
	win: BrowserWindow | null,
	fullscreenState: FullscreenState
) => {
	win?.show();
	win?.focus();
	win?.setAlwaysOnTop(alwaysOnTop, "screen-saver");
	win?.setSkipTaskbar(flag);
	win?.setFullScreen(flag);
	win?.setResizable(flag);
	win?.setVisibleOnAllWorkspaces(flag);

	fullscreenState.isFullscreen = flag;
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
	const { tray, trayTooltip, win, contextMenu, fullscreenState } = appArgs;

	if (shouldFullscreen) {
		setFullScreen(true, alwaysOnTop, win, fullscreenState);

		activateFullScreenShortcuts(() => {
			setFullScreen(false, alwaysOnTop, win, fullscreenState);
		});

		tray?.setToolTip("");
		tray?.setContextMenu(
			Menu.buildFromTemplate([
				{
					label: "Please wait for your break to end.",
				},
			])
		);
	} else {
		setFullScreen(false, alwaysOnTop, win, fullscreenState);

		deactivateFullScreenSchortcuts();
		tray?.setToolTip(trayTooltip);
		tray?.setContextMenu(contextMenu);
	}
};
