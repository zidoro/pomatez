import { BrowserWindow, Menu, MenuItem } from "electron";

export const createContextMenu = (win: BrowserWindow) => {
	win.webContents.on("context-menu", (event, props) => {
		const menu = Menu.buildFromTemplate([
			{ role: "undo", accelerator: "CommandOrControl+Z" },
			{ role: "redo", accelerator: "CommandOrControl+Shift+Z" },
			{ type: "separator" },
			{ role: "cut", accelerator: "CommandOrControl+X" },
			{ role: "copy", accelerator: "CommandOrControl+C" },
			{ role: "paste", accelerator: "CommandOrControl+V" },
			{ role: "selectAll", accelerator: "CommandOrControl+A" },
		]);

		if (props.misspelledWord) {
			menu.append(new MenuItem({ type: "separator" }));
			menu.append(new MenuItem({ label: "Suggestions" }));
			menu.append(new MenuItem({ type: "separator" }));
		}

		for (const suggestion of props.dictionarySuggestions) {
			menu.append(
				new MenuItem({
					label: suggestion,
					click: () => {
						win?.webContents.replaceMisspelling(suggestion);
					},
				})
			);
		}

		if (props.misspelledWord) {
			menu.append(
				new MenuItem({
					label: "Add to dictionary",
					click: () => {
						win?.webContents.session.addWordToSpellCheckerDictionary(
							props.misspelledWord
						);
					},
				})
			);
		}

		if (props.isEditable) {
			menu.popup();
		}
	});
};
