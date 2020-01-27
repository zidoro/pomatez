import React, { useEffect, useContext, useCallback, useMemo } from "react";
import { ipcRenderer, webFrame } from "window-electron";

import {
  NavContext,
  UpdateContext,
  SET_UPDATING,
  SET_DOWNLOAD_COMPLETED
} from "./models";

import { Main, Update, Restart, Titlebar } from "./components/containers";
import { fetchSvg } from "./helpers";

import Sprite from "./assets/icons/sprite.svg";

function App() {
  const [{ showConfig }] = useContext(NavContext);
  const [{ updating, downloadCompleted }, dispatchUpdate] = useContext(
    UpdateContext
  );

  const updateCallback = useCallback(
    () =>
      dispatchUpdate({
        type: SET_UPDATING,
        payload: false
      }),
    [dispatchUpdate]
  );

  const restartCallback = useCallback(
    () =>
      dispatchUpdate({
        type: SET_DOWNLOAD_COMPLETED,
        payload: false
      }),
    [dispatchUpdate]
  );

  useEffect(() => fetchSvg(Sprite), []);

  useEffect(() => {
    webFrame.setZoomFactor(1);
    webFrame.setVisualZoomLevelLimits(1, 1);
    webFrame.setLayoutZoomLevelLimits(0, 0);

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

  return useMemo(() => {
    return (
      <div className="app">
        <Titlebar />
        <Main showConfig={showConfig} />
        <Update updating={updating} onExit={updateCallback} />
        <Restart
          downloadCompleted={downloadCompleted}
          onExit={restartCallback}
        />
      </div>
    );
  }, [
    downloadCompleted,
    restartCallback,
    showConfig,
    updateCallback,
    updating
  ]);
}

export default App;
