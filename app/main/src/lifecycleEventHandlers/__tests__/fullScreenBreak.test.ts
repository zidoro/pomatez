import { setFullscreenBreakHandler } from "../fullScreenBreak";
import { BrowserWindow, Menu, globalShortcut, Tray, app } from "electron";
import path from "path";

describe("Fullscreen break", () => {
	const getWindowSpies = (window: BrowserWindow) => {
		return {
			show: jest.spyOn(window, "show"),
			focus: jest.spyOn(window, "focus"),
			setAlwaysOnTop: jest.spyOn(window, "setAlwaysOnTop"),
			setSkipTaskbar: jest.spyOn(window, "setSkipTaskbar"),
			setFullScreen: jest.spyOn(window, "setFullScreen"),
			setResizable: jest.spyOn(window, "setResizable"),
			setVisibleOnAllWorkspaces: jest.spyOn(
				window,
				"setVisibleOnAllWorkspaces",
			),
		};
	};

	it("should enter full screen on break", () => {
		const window = new BrowserWindow();
		const tray = new Tray(path.join(__dirname, "../../assets/tray-dark.png"));
		const trayTooltip = "Mock tray tool tip";
		const fullscreenState = { isFullscreen: false };

		// Set spies
		const windowSpies = getWindowSpies(window);
		const traySpies = {
			setToolTip: jest.spyOn(tray, "setToolTip"),
			setContextMenu: jest.spyOn(tray, "setContextMenu"),
		};
		expect(globalShortcut.isRegistered("Esc")).toBe(false);
		expect(globalShortcut.isRegistered("CommandOrControl+W")).toBe(false);

		setFullscreenBreakHandler(
			{ shouldFullscreen: true, alwaysOnTop: true },
			{
				win: window,
				contextMenu: Menu.buildFromTemplate([{ label: "Mock Label" }]),
				isFullscreen: fullscreenState.isFullscreen,
				trayTooltip,
				tray,
			},
		);

		// Verify that window has been setup to fullscreen
		expect(windowSpies.show).toHaveBeenCalledTimes(1);
		expect(windowSpies.focus).toHaveBeenCalledTimes(1);
		expect(windowSpies.setAlwaysOnTop).toHaveBeenCalledWith(
			true,
			"screen-saver",
		);
		expect(windowSpies.setSkipTaskbar).toHaveBeenCalledWith(true);
		expect(windowSpies.setFullScreen).toHaveBeenCalledWith(true);
		expect(windowSpies.setResizable).toHaveBeenCalledWith(true);
		expect(windowSpies.setVisibleOnAllWorkspaces).toHaveBeenCalledWith(true);
		expect(fullscreenState.isFullscreen).toEqual(true);

		// Verify that shortcuts have been set
		expect(globalShortcut.isRegistered("Esc")).toBe(true);
		expect(globalShortcut.isRegistered("CommandOrControl+W")).toBe(true);

		// Verify that tray has been updated
		expect(traySpies.setToolTip).toHaveBeenCalledTimes(1);
		expect(traySpies.setContextMenu).toHaveBeenCalledTimes(1);
	});

	it("should exit full screen on break", () => {
		const window = new BrowserWindow();
		const tray = new Tray(path.join(__dirname, "../../assets/tray-dark.png"));
		const trayTooltip = "Mock tray tool tip";
		const fullscreenState = { isFullscreen: true };

		// Set spies
		const windowSpies = getWindowSpies(window);
		const traySpies = {
			setToolTip: jest.spyOn(tray, "setToolTip"),
			setContextMenu: jest.spyOn(tray, "setContextMenu"),
		};
		globalShortcut.registerAll(["Esc", "CommandOrControl+W"], () => {});
		expect(globalShortcut.isRegistered("Esc")).toBe(true);
		expect(globalShortcut.isRegistered("CommandOrControl+W")).toBe(true);

		setFullscreenBreakHandler(
			{ shouldFullscreen: false, alwaysOnTop: true },
			{
				win: window,
				contextMenu: Menu.buildFromTemplate([{ label: "Mock Label" }]),
				isFullscreen: fullscreenState.isFullscreen,
				trayTooltip,
				tray,
			},
		);

		// Verify that window has been setup to fullscreen
		expect(windowSpies.show).toHaveBeenCalledTimes(1);
		expect(windowSpies.focus).toHaveBeenCalledTimes(1);
		expect(windowSpies.setAlwaysOnTop).toHaveBeenCalledWith(
			true,
			"screen-saver",
		);
		expect(windowSpies.setSkipTaskbar).toHaveBeenCalledWith(false);
		expect(windowSpies.setFullScreen).toHaveBeenCalledWith(false);
		expect(windowSpies.setResizable).toHaveBeenCalledWith(false);
		expect(windowSpies.setVisibleOnAllWorkspaces).toHaveBeenCalledWith(false);
		expect(fullscreenState.isFullscreen).toEqual(false);

		// Verify that shortcuts have been set
		expect(globalShortcut.isRegistered("Esc")).toBe(false);
		expect(globalShortcut.isRegistered("CommandOrControl+W")).toBe(false);

		// Verify that tray has been updated
		expect(traySpies.setToolTip).toHaveBeenCalledTimes(1);
		expect(traySpies.setContextMenu).toHaveBeenCalledTimes(1);
	});

	afterEach(() => {
		globalShortcut.unregisterAll();
		app.quit();
	});
});
