import React, { useEffect, useContext } from "react";
import { StoreContext, SET_UPDATING, SET_DOWNLOAD_COMPLETED } from "./models";
import { getSvg } from "./sprite";

import { Titlebar } from "./components";
import { Main, Update, Restart } from "./containers";

const { remote, ipcRenderer } = window.require("electron");

function App() {
  const [{ darkMode }, dispatchSetting] = useContext(StoreContext).setting;

  useEffect(() => getSvg(), []);

  useEffect(() => {
    let theme = darkMode ? "dark" : "light";
    let mainElement = document.documentElement;
    mainElement.setAttribute("data-theme", theme);

    remote.getCurrentWindow().setBackgroundColor(darkMode ? "#222c33" : "#fff");
  }, [darkMode]);

  useEffect(() => {
    ipcRenderer.on("update-available", () => {
      ipcRenderer.removeAllListeners("update-available");
      dispatchSetting({
        type: SET_UPDATING,
        payload: true
      });
    });

    ipcRenderer.on("update-downloaded", () => {
      ipcRenderer.removeAllListeners("update-downloaded");
      dispatchSetting({
        type: SET_UPDATING,
        payload: false
      });
      dispatchSetting({
        type: SET_DOWNLOAD_COMPLETED,
        payload: true
      });
    });
  }, [dispatchSetting]);

  return (
    <div className="app">
      <Titlebar />
      <Main />
      <Update />
      <Restart />
    </div>
  );
}

export default App;
