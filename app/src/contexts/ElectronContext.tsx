import React, { useCallback, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import isElectron from "is-electron";

import { AppStateTypes, SettingTypes } from "store";
import { CounterContext } from "./CounterContext";

const SET_ALWAYS_ON_TOP = "SET_ALWAYS_ON_TOP";
const SET_FULLSCREEN_BREAK = "SET_FULLSCREEN_BREAK";
const SET_NATIVE_TITLEBAR = "SET_NATIVE_TITLEBAR";
const SET_UI_THEME = "SET_UI_THEME";
const SET_MINIMIZE = "SET_MINIMIZE";
const SET_CLOSE = "SET_CLOSE";
const SET_SHOW = "SET_SHOW";

type ElectronProps = {
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
  openExternalCallback?: () => void;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const timer = useSelector((state: AppStateTypes) => state.timer);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { shouldFullscreen } = useContext(CounterContext);

  const onMinimizeCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(SET_MINIMIZE);
    }
  }, [electron]);

  const onExitCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(SET_CLOSE);
    }
  }, [electron]);

  const openExternalCallback = useCallback(() => {
    if (isElectron()) {
      const links = document.querySelectorAll("a");

      Array.prototype.forEach.call(links, (link: HTMLAnchorElement) => {
        const url = link.getAttribute("href");
        if (url?.indexOf("http") === 0) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            electron.openExternal(url);
          });
        }
      });
    }
  }, [electron]);

  useEffect(() => {
    if (isElectron() && !settings.enableFullscreenBreak) {
      electron.send(SET_SHOW);
    }
  }, [electron, timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_ALWAYS_ON_TOP, {
        alwaysOnTop: settings.alwaysOnTop,
      });
    }
  }, [electron, settings.alwaysOnTop]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_FULLSCREEN_BREAK, {
        shouldFullscreen,
        alwaysOnTop: settings.alwaysOnTop,
      });
    }
  }, [electron, settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_UI_THEME, {
        isDarkMode: settings.enableDarkTheme,
      });
    }
  }, [electron, settings.enableDarkTheme]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_NATIVE_TITLEBAR, {
        useNativeTitlebar: settings.useNativeTitlebar,
      });
    }
  }, [electron, settings.useNativeTitlebar]);

  return (
    <ElectronContext.Provider
      value={{
        onMinimizeCallback,
        onExitCallback,
        openExternalCallback,
      }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronContext, ElectronProvider };
