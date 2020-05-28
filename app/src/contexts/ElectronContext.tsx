import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "store";

import isElectron from "is-electron";

export enum CHANNELS {
  TO_MAIN = "TO_MAIN",
  FROM_MAIN = "FROM_MAIN",
}

export enum ACTIONS {
  ALWAYS_ON_TOP = "ALWAYS_ON_TOP",
  FULL_SCREEN = "FULL_SCREEN",
  MINIMIZE = "MINIMIZE",
  HIDE = "HIDE",
  SET_THEME = "SET_THEME",
  QUIT_INSTALL_UPDATES = "QUIT_INSTALL_UPDATES",
}

export enum UPDATES {
  AVAILABLE = "AVAILABLE",
  DOWNLOADING = "DOWNLOADING",
  DOWNLOADED = "DOWNLOADED",
}

type ElectronProps = {
  shouldFullscreenCallback?: (isFullscreen: boolean) => void;
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
  openExternalCallback?: () => void;
  onQuitAndInstallUpdates?: () => void;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const shouldFullscreenCallback = useCallback(
    (isFullscreen: boolean) => {
      if (isElectron()) {
        electron.send(CHANNELS.TO_MAIN, {
          type: ACTIONS.FULL_SCREEN,
          payload: isFullscreen,
        });
      }
    },
    [electron]
  );

  const onMinimizeCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(CHANNELS.TO_MAIN, {
        type: ACTIONS.MINIMIZE,
      });
    }
  }, [electron]);

  const onExitCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(CHANNELS.TO_MAIN, {
        type: ACTIONS.HIDE,
      });
    }
  }, [electron]);

  const onQuitAndInstallUpdates = useCallback(() => {
    if (isElectron()) {
      electron.send(CHANNELS.TO_MAIN, {
        type: ACTIONS.QUIT_INSTALL_UPDATES,
      });
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
    if (isElectron()) {
      electron.send(CHANNELS.TO_MAIN, {
        type: ACTIONS.ALWAYS_ON_TOP,
        payload: settings.alwaysOnTop,
      });
    }
  }, [electron, settings.alwaysOnTop]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(CHANNELS.TO_MAIN, {
        type: ACTIONS.SET_THEME,
        payload: {
          darkTheme: settings.enableDarkTheme,
        },
      });
    }
  }, [electron, settings.enableDarkTheme]);

  return (
    <ElectronContext.Provider
      value={{
        shouldFullscreenCallback,
        onMinimizeCallback,
        onExitCallback,
        openExternalCallback,
        onQuitAndInstallUpdates,
      }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronContext, ElectronProvider };
