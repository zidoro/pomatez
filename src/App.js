import React, { useEffect, useContext, useCallback } from "react";
import { StoreContext, SET_UPDATING, SET_DOWNLOAD_COMPLETED } from "./models";

import { Titlebar } from "./containers";
import { Main, Update, Restart } from "./containers";

const { remote, ipcRenderer } = window.require("electron");

function App() {
  const win = remote.getCurrentWindow();

  const [{ showConfig }] = useContext(StoreContext).nav;
  const [{ darkMode }] = useContext(StoreContext).setting;
  const [{ updating, downloadCompleted }, dispatchUpdate] = useContext(
    StoreContext
  ).update;

  const fetchIcons = useCallback(
    () =>
      fetch("sprite.svg")
        .then(response => response.text())
        .then(text => {
          let root = document.getElementById("root");
          let svgContainer = document.createElement("svgContainer");

          svgContainer.innerHTML = text;
          return root.appendChild(svgContainer);
        })
        .catch(err => console.log(err)),
    []
  );

  const setDataTheme = useCallback(() => {
    let theme = darkMode ? "dark" : "light";
    let mainElement = document.documentElement;
    mainElement.setAttribute("data-theme", theme);

    win.setBackgroundColor(darkMode ? "#222c33" : "#fff");
  }, [darkMode, win]);

  useEffect(() => {
    fetchIcons();
    setDataTheme();
  }, [fetchIcons, setDataTheme]);

  useEffect(() => {
    ipcRenderer.on("update-available", () => {
      ipcRenderer.removeAllListeners("update-available");
      dispatchUpdate({
        type: SET_UPDATING,
        payload: true
      });
    });

    ipcRenderer.on("update-downloaded", () => {
      ipcRenderer.removeAllListeners("update-downloaded");
      dispatchUpdate({
        type: SET_UPDATING,
        payload: false
      });
      dispatchUpdate({
        type: SET_DOWNLOAD_COMPLETED,
        payload: true
      });
    });
  }, [dispatchUpdate]);

  return (
    <div className="app">
      <Titlebar />
      <Main showConfig={showConfig} />
      <Update
        updating={updating}
        onExit={useCallback(
          () =>
            dispatchUpdate({
              type: SET_UPDATING,
              payload: false
            }),
          [dispatchUpdate]
        )}
      />
      <Restart
        downloadCompleted={downloadCompleted}
        onExit={useCallback(
          () =>
            dispatchUpdate({
              type: SET_DOWNLOAD_COMPLETED,
              payload: false
            }),
          [dispatchUpdate]
        )}
      />
    </div>
  );
}

export default App;
