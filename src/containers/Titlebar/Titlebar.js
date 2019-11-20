import React, { useContext, useEffect, useCallback, useMemo } from "react";
import {
  SettingContext,
  NavContext,
  SHOW_CONFIG,
  SET_DARKMODE,
  SET_TITLE
} from "../../models";
import { Exit, Menu, Minimize, Mode } from "./elements";

function Titlebar() {
  const { remote } = window.require("electron");
  const win = remote.getCurrentWindow();

  const [{ darkMode, fullScreen, onTop }, dispatchSetting] = useContext(
    SettingContext
  );
  const [{ title, showConfig }, dispatchNav] = useContext(NavContext);

  const onMenuCallback = useCallback(
    () =>
      dispatchNav({
        type: SHOW_CONFIG,
        payload: !showConfig
      }),
    [dispatchNav, showConfig]
  );

  const onModeCallback = useCallback(
    () =>
      dispatchSetting({
        type: SET_DARKMODE,
        payload: !darkMode
      }),
    [dispatchSetting, darkMode]
  );

  const onMinimizeCallback = useCallback(() => {
    win.setAlwaysOnTop(false);
    win.minimize();
  }, [win]);

  const onExitCallback = useCallback(() => win.hide(), [win]);

  useEffect(() => {
    win.on("restore", () => {
      win.setAlwaysOnTop(true);
    });
  }, [win, onTop]);

  useEffect(() => {
    let appName = "Productivity Timer";
    document.title = appName;
    dispatchNav({
      type: SET_TITLE,
      payload: showConfig ? "User Configuration" : appName
    });
  }, [dispatchNav, showConfig]);

  useEffect(() => {
    let theme = darkMode ? "dark" : "light";
    let mainElement = document.documentElement;
    mainElement.setAttribute("data-theme", theme);

    win.setBackgroundColor(darkMode ? "#222c33" : "#fff");
  }, [darkMode, win]);

  return useMemo(() => {
    return (
      <div
        className="titlebar"
        style={{
          opacity: fullScreen ? "0" : "1",
          visibility: fullScreen ? "hidden" : "visible"
        }}
      >
        <div className="titlebar__option">
          <Menu showConfig={showConfig} onClick={onMenuCallback} />
          <Mode darkMode={darkMode} onClick={onModeCallback} />
        </div>

        <div className="titlebar__title">
          <p className="app-name">{title}</p>
        </div>

        <div className="titlebar__icon">
          <Minimize onClick={onMinimizeCallback} />
          <Exit onClick={onExitCallback} />
        </div>
      </div>
    );
  }, [
    darkMode,
    fullScreen,
    showConfig,
    title,
    onMenuCallback,
    onModeCallback,
    onMinimizeCallback,
    onExitCallback
  ]);
}

export default Titlebar;
