import React, { useCallback, useContext, useEffect } from "react";
import { ConnnectorContext } from "../ConnnectorContext";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "../../store";
import { CounterContext } from "../CounterContext";
import {
  SET_ALWAYS_ON_TOP,
  SET_CLOSE,
  SET_COMPACT_MODE,
  SET_FULLSCREEN_BREAK,
  SET_MINIMIZE,
  SET_NATIVE_TITLEBAR,
  SET_OPEN_AT_LOGIN,
  SET_SHOW,
  SET_UI_THEME,
  TRAY_ICON_UPDATE,
} from "@pomatez/shareables";
import { encodeSvg } from "../../utils";
import { TraySVG } from "../../components";
import { enable, disable } from "tauri-plugin-autostart-api";

export const TauriConnectorProvider: React.FC = ({ children }) => {
  const { invoke } = window.__TAURI__;

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  /**
   * Rust uses lowercase snake_case for function names so we need to convert to lower case for the calls.
   * @param event
   * @param payload
   */
  const send = useCallback(
    (event: string, ...payload: any) => {
      invoke(event.toLowerCase(), ...payload);
    },
    [invoke]
  );

  useEffect(() => {
    if (settings.openAtLogin) {
      enable().catch((err) => console.error(err));
    } else {
      disable().catch((err) => console.error(err));
    }
  }, [settings.openAtLogin]);

  // TODO do logic to switch out the connectors based on the platform

  const timer = useSelector((state: AppStateTypes) => state.timer);

  const { count, duration, timerType, shouldFullscreen } =
    useContext(CounterContext);
  const dashOffset = (duration - count) * (24 / duration);

  const onMinimizeCallback = useCallback(() => {
    send(SET_MINIMIZE, {
      minimizeToTray: settings.minimizeToTray,
    });
    console.log("Minimize callback");
  }, [send, settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    send(SET_CLOSE, {
      closeToTray: settings.closeToTray,
    });
  }, [send, settings.closeToTray]);

  /**
   * Not needed as tauri already opens these externally.
   */
  const openExternalCallback = useCallback(() => {}, []);

  useEffect(() => {
    if (!settings.enableFullscreenBreak) {
      send(SET_SHOW);
    }
  }, [send, timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    send(SET_ALWAYS_ON_TOP, {
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [send, settings.alwaysOnTop]);

  useEffect(() => {
    send(SET_FULLSCREEN_BREAK, {
      shouldFullscreen,
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [send, settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    send(SET_COMPACT_MODE, {
      compactMode: settings.compactMode,
    });
  }, [send, settings.compactMode]);

  useEffect(() => {
    send(SET_UI_THEME, {
      isDarkMode: settings.enableDarkTheme,
    });
  }, [send, settings.enableDarkTheme]);

  useEffect(() => {
    send(SET_NATIVE_TITLEBAR, {
      useNativeTitlebar: settings.useNativeTitlebar,
    });
  }, [send, settings.useNativeTitlebar]);

  useEffect(() => {
    if (timer.playing) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 16;
      canvas.height = 16;

      let svgXML = encodeSvg(
        <TraySVG timerType={timerType} dashOffset={dashOffset} />
      );

      const img = new Image();
      img.src = svgXML;

      img.onload = function () {
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");

        send(TRAY_ICON_UPDATE, { dataUrl });
      };
    }
  }, [send, timer.playing, timerType, dashOffset]);

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
