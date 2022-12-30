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
  SET_SHOW,
  SET_UI_THEME,
  TRAY_ICON_UPDATE,
} from "@pomatez/shareables";
import { encodeSvg } from "../../utils";
import { TraySVG } from "../../components";

export const TauriConnectorProvider: React.FC = ({ children }) => {
  const { invoke } = window.__TAURI__;

  // TODO do logic to switch out the connectors based on the platform

  const timer = useSelector((state: AppStateTypes) => state.timer);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { count, duration, timerType, shouldFullscreen } =
    useContext(CounterContext);
  const dashOffset = (duration - count) * (24 / duration);

  const onMinimizeCallback = useCallback(() => {
    console.log("Minimize callback");
  }, [invoke, settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    console.log("onExitCallback callback");
  }, [invoke, settings.closeToTray]);

  const openExternalCallback = useCallback(() => {}, [invoke]);

  useEffect(() => {
    console.log("Fullscreen break", settings.enableFullscreenBreak);
  }, [timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    console.log("alwaysOnTop", settings.alwaysOnTop);
  }, [settings.alwaysOnTop]);

  useEffect(() => {
    console.log(
      "Fullscreen break",
      settings.alwaysOnTop,
      shouldFullscreen
    );
  }, [settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    console.log("Compact mode", settings.compactMode);
  }, [settings.compactMode]);

  useEffect(() => {
    console.log("Dark theme", settings.enableDarkTheme);
  }, [settings.enableDarkTheme]);

  useEffect(() => {
    console.log("Native titlebar", settings.useNativeTitlebar);
  }, [settings.useNativeTitlebar]);

  useEffect(() => {
    console.log("Tray icon update", timerType, count, duration);
    // if (isElectron() && timer.playing) {
    //   const canvas = document.createElement("canvas");
    //   const ctx = canvas.getContext("2d");
    //
    //   canvas.width = 16;
    //   canvas.height = 16;
    //
    //   let svgXML = encodeSvg(
    //     <TraySVG timerType={timerType} dashOffset={dashOffset} />
    //   );
    //
    //   const img = new Image();
    //   img.src = svgXML;
    //
    //   img.onload = function () {
    //     ctx?.drawImage(img, 0, 0);
    //     const dataUrl = canvas.toDataURL("image/png");
    //
    //     electron.send(TRAY_ICON_UPDATE, dataUrl);
    //   };
    // }
  }, [timer.playing, timerType, dashOffset]);

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
