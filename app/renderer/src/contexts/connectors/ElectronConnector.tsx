import React, { useCallback, useContext, useEffect } from "react";
import { ConnnectorContext } from "../ConnnectorContext";
import { useAppSelector } from "hooks/storeHooks";
import { CounterContext } from "../CounterContext";
import {
  SET_ALWAYS_ON_TOP,
  CLOSE_WINDOW,
  SET_COMPACT_MODE,
  SET_FULLSCREEN_BREAK,
  MINIMIZE_WINDOW,
  SET_NATIVE_TITLEBAR,
  SHOW_WINDOW,
  SET_UI_THEME,
  TRAY_ICON_UPDATE,
  TRAY_TITLE_UPDATE,
  SET_OPEN_AT_LOGIN,
} from "@pomatez/shareables";
import { InvokeConnector } from "../InvokeConnector";
import { useTrayIconUpdates } from "hooks/useTrayIconUpdates";
import { detectOS } from "utils";

export const ElectronInvokeConnector: InvokeConnector = {
  send: (event: string, ...payload: any) => {
    const { electron } = window;

    electron.send(event, ...payload);
  },
};

export const ElectronConnectorProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const timer = useAppSelector((state) => state.timer);

  const settings = useAppSelector((state) => state.settings);

  const { shouldFullscreen } = useContext(CounterContext);

  const onMinimizeCallback = useCallback(() => {
    electron.send(MINIMIZE_WINDOW, {
      minimizeToTray: settings.minimizeToTray,
    });
  }, [electron, settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    electron.send(CLOSE_WINDOW, {
      closeToTray: settings.closeToTray,
    });
  }, [electron, settings.closeToTray]);

  const openExternalCallback = useCallback(() => {
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
  }, [electron]);

  useEffect(() => {
    if (!settings.enableFullscreenBreak) {
      electron.send(SHOW_WINDOW);
    }
  }, [electron, timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    electron.send(SET_ALWAYS_ON_TOP, {
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [electron, settings.alwaysOnTop]);

  useEffect(() => {
    electron.send(SET_FULLSCREEN_BREAK, {
      shouldFullscreen,
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [electron, settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    electron.send(SET_COMPACT_MODE, {
      compactMode: settings.compactMode,
    });
  }, [electron, settings.compactMode]);

  useEffect(() => {
    electron.send(SET_UI_THEME, {
      isDarkMode: settings.enableDarkTheme,
    });
  }, [electron, settings.enableDarkTheme]);

  useEffect(() => {
    electron.send(SET_NATIVE_TITLEBAR, {
      useNativeTitlebar: settings.useNativeTitlebar,
    });
  }, [electron, settings.useNativeTitlebar]);

  useEffect(() => {
    electron.send(SET_OPEN_AT_LOGIN, {
      openAtLogin: settings.openAtLogin,
    });
  }, [electron, settings.openAtLogin]);

  useEffect(() => {
    const isMacOS = detectOS() === "MacOS";
    if (isMacOS) {
      if (!settings.showTimerInTray) {
        electron.send(TRAY_TITLE_UPDATE, "");
      }
    }
  }, [electron, settings.showTimerInTray, timer.playing]);

  useTrayIconUpdates(
    (dataUrl) => {
      const isMacOS = detectOS() === "MacOS";
      const showTimerInTray = settings.showTimerInTray && isMacOS;

      if (!showTimerInTray || !timer.playing) {
        electron.send(TRAY_ICON_UPDATE, dataUrl);
      }
    },
    (title) => {
      const isMacOS = detectOS() === "MacOS";

      if (isMacOS) {
        if (settings.showTimerInTray) {
          electron.send(TRAY_TITLE_UPDATE, title);
        } else {
          electron.send(TRAY_TITLE_UPDATE, "");
        }
      }
    }
  );

  return (
    <ConnnectorContext.Provider
      value={{
        onMinimizeCallback,
        onExitCallback,
        openExternalCallback,
      }}
    >
      {children}
    </ConnnectorContext.Provider>
  );
};
