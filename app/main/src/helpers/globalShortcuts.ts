import { globalShortcut } from "electron";

type ShortCut = {
	key: string;
	callback: () => void;
};

export function activateGlobalShortcuts(shortcuts: ShortCut[]) {
	shortcuts.map(({ key, callback }) => {
		globalShortcut.register(key, callback);
	});
}
