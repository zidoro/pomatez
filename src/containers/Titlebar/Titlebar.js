import React, { useContext, useEffect, useCallback } from "react";
import {
  StoreContext,
  SHOW_CONFIG,
  SET_DARKMODE,
  SET_TITLE
} from "../../models";
import { Exit, Menu, Minimize, Mode } from "./elements";

const { remote } = window.require("electron");

function Titlebar() {
  const win = remote.getCurrentWindow();

  const [{ title, showConfig }, dispatchNav] = useContext(StoreContext).nav;
  const [{ darkMode }, dispatchSetting] = useContext(StoreContext).setting;
  const [{ fullScreen }] = useContext(StoreContext).control;

  const setWindowTitle = useCallback(
    appName =>
      dispatchNav({
        type: SET_TITLE,
        payload: showConfig ? "User Configuration" : appName
      }),
    [dispatchNav, showConfig]
  );

  useEffect(() => {
    let version = remote.app.getVersion();
    let appName = `Productivity Timer v${version}`;

    document.title = appName;

    setWindowTitle(appName);
  }, [setWindowTitle]);

  return (
    <div
      className="titlebar"
      style={{
        opacity: fullScreen ? "0" : "1",
        visibility: fullScreen ? "hidden" : "visible"
      }}
    >
      <div className="titlebar__option">
        <Menu
          showConfig={showConfig}
          onClick={useCallback(
            () =>
              dispatchNav({
                type: SHOW_CONFIG,
                payload: !showConfig
              }),
            [dispatchNav, showConfig]
          )}
        />
        <Mode
          darkMode={darkMode}
          onClick={useCallback(
            () =>
              dispatchSetting({
                type: SET_DARKMODE,
                payload: !darkMode
              }),
            [dispatchSetting, darkMode]
          )}
        />
      </div>

      <div className="titlebar__title">
        <p className="app-name">{title}</p>
      </div>

      <div className="titlebar__icon">
        <Minimize onClick={useCallback(() => win.minimize(), [win])} />
        <Exit onClick={useCallback(() => win.hide(), [win])} />
      </div>
    </div>
  );
}

export default Titlebar;
