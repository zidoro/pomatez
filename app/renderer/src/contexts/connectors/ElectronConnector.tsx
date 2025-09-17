import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
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
  SET_RPC_ACTIVITY,
  TRAY_ICON_UPDATE,
  SET_OPEN_AT_LOGIN,
  SET_ENABLE_RPC,
} from "@pomatez/shareables";
import { InvokeConnector } from "../InvokeConnector";
import { useTrayIconUpdates } from "hooks/useTrayIconUpdates";
import { TimerStatus } from "store/timer/types";

export const ElectronInvokeConnector: InvokeConnector = {
  send: (event: string, ...payload: any) => {
    const { electron } = window;

    electron.send(event, ...payload);
  },
};

export const ElectronConnectorProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const { timer, config } = useAppSelector((state) => ({
    timer: state.timer,
    config: state.config,
  }));

  const { count, duration, shouldFullscreen } =
    useContext(CounterContext);

  const settings = useAppSelector((state) => state.settings);

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

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    let activity = "Idle";
    let timerstart;
    let timerend;

    if (timer.playing) {
      switch (timer.timerType) {
        case TimerStatus.STAY_FOCUS:
          activity = "Focus";
          break;
        case TimerStatus.SHORT_BREAK:
          activity = "Break";
          break;
        case TimerStatus.LONG_BREAK:
          activity = "Break";
          break;
        case TimerStatus.SPECIAL_BREAK:
          activity = "Break";
          break;
      }
      const startime = new Date(Date.now());
      startime.setSeconds(
        startime.getSeconds() - (duration - countRef.current)
      );
      timerstart = startime;

      const endtime = new Date(Date.now());
      endtime.setSeconds(endtime.getSeconds() + duration);
      timerend = endtime;
    }

    electron.send(SET_RPC_ACTIVITY, {
      type: activity,
      start: timerstart,
      end: timerend,
      round: timer.round,
      sessionRounds: config.sessionRounds,
    });
  }, [
    electron,
    duration,
    timer.playing,
    timer.round,
    timer.timerType,
    config.sessionRounds,
  ]);

  useEffect(() => {
    electron.send(SET_ENABLE_RPC, {
      enableRPC: settings.enableRPC,
    });
  }, [electron, settings.enableRPC]);

  useTrayIconUpdates((dataUrl) => {
    electron.send(TRAY_ICON_UPDATE, dataUrl);
  });

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
