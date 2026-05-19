import { BrowserWindow } from "electron";

const isUserHaveSession = async (
  win: BrowserWindow
): Promise<boolean> => {
  try {
    const data = await win.webContents.executeJavaScript(
      `window.isUserHaveSession()`
    );

    if (data === null || typeof data !== "string") {
      return false;
    }
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
};

export { isUserHaveSession };
