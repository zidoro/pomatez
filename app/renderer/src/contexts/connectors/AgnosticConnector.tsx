import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "../../store";
import { CounterContext } from "../CounterContext";
import {
  SET_ALWAYS_ON_TOP,
  SET_COMPACT_MODE,
  SET_FULLSCREEN_BREAK,
  SET_NATIVE_TITLEBAR,
  SHOW_WINDOW,
  SET_UI_THEME,
  TRAY_ICON_UPDATE,
  SET_OPEN_AT_LOGIN,
} from "@pomatez/shareables";
import { useTrayIconUpdates } from "hooks/useTrayIconUpdates";
import type { InvokeConnector } from "contexts/InvokeConnectors";

type AgnosticConnectorProps = {
  invoker: InvokeConnector;
};

export const AgnosticConnector: React.FC<AgnosticConnectorProps> = ({
  children,
  invoker,
}) => {
  const timer = useSelector((state: AppStateTypes) => state.timer);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { shouldFullscreen } = useContext(CounterContext);

  useEffect(() => {
    if (!settings.enableFullscreenBreak) {
      invoker.send(SHOW_WINDOW);
    }
  }, [invoker, timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    invoker.send(SET_ALWAYS_ON_TOP, {
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [invoker, settings.alwaysOnTop]);

  useEffect(() => {
    invoker.send(SET_FULLSCREEN_BREAK, {
      shouldFullscreen,
      alwaysOnTop: settings.alwaysOnTop,
    });
  }, [invoker, settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    invoker.send(SET_COMPACT_MODE, {
      compactMode: settings.compactMode,
    });
  }, [invoker, settings.compactMode]);

  useEffect(() => {
    invoker.send(SET_UI_THEME, {
      isDarkMode: settings.enableDarkTheme,
    });
  }, [invoker, settings.enableDarkTheme]);

  useEffect(() => {
    invoker.send(SET_NATIVE_TITLEBAR, {
      useNativeTitlebar: settings.useNativeTitlebar,
    });
  }, [invoker, settings.useNativeTitlebar]);

  useEffect(() => {
    invoker.send(SET_OPEN_AT_LOGIN, {
      openAtLogin: settings.openAtLogin,
    });
  }, [invoker, settings.openAtLogin]);

  useTrayIconUpdates((dataUrl) => {
    invoker.send(TRAY_ICON_UPDATE, { dataUrl });
  });

  return <>{children}</>;
};
