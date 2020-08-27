import { BrowserWindow } from "electron";

const getFromStorage = async (
  win: BrowserWindow,
  key: string
): Promise<any> => {
  try {
    const data = await win.webContents.executeJavaScript(
      `localStorage.getItem("${key}")`
    );
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

export { getFromStorage };
