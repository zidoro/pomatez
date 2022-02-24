import { globalShortcut } from "electron";

const EXIT_SHORTCUTS = { ESCAPE: "Esc", QUIT: "CommandOrControl+W" };

type ShortCut = {
	key: string;
	callback: () => void;
};

export function activateGlobalShortcuts(shortcuts: ShortCut[]) {
	shortcuts.map(({ key, callback }) => {
		globalShortcut.register(key, callback);
	});
}

export function activateFullScreenShortcuts(
	exitFullScreenCallback: () => void
) {
	globalShortcut.registerAll(
		[EXIT_SHORTCUTS.ESCAPE, EXIT_SHORTCUTS.QUIT],
		exitFullScreenCallback
	);
}

export function deactivateFullScreenSchortcuts() {
	globalShortcut.unregister(EXIT_SHORTCUTS.ESCAPE);
	globalShortcut.unregister(EXIT_SHORTCUTS.QUIT);
}
