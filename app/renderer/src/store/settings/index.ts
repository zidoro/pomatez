import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import { SettingTypes } from "./types";
import { defaultSettings } from "./defaultSettings";

export type { SettingTypes };

const settings =
  (getFromStorage("state") && getFromStorage("state").settings) ||
  defaultSettings;

const initialState: SettingTypes = settings;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIgnoreUpdate(
      state,
      action: PayloadAction<SettingTypes["ignoreUpdate"]>
    ) {
      state.ignoreUpdate = action.payload;
    },

    setAlwaysOnTop(
      state,
      action: PayloadAction<SettingTypes["alwaysOnTop"]>
    ) {
      state.alwaysOnTop = action.payload;
    },

    toggleNotificationSound(state) {
      state.notificationSoundOn = !state.notificationSoundOn;
    },

    setEnableDarkTheme(
      state,
      action: PayloadAction<SettingTypes["enableDarkTheme"]>
    ) {
      state.enableDarkTheme = action.payload;
    },

    setEnableCompactMode(
      state,
      action: PayloadAction<SettingTypes["compactMode"]>
    ) {
      state.compactMode = action.payload;
    },

    setEnableFullscreenBreak(
      state,
      action: PayloadAction<SettingTypes["enableFullscreenBreak"]>
    ) {
      state.enableFullscreenBreak = action.payload;
    },

    setEnableStrictMode(
      state,
      action: PayloadAction<SettingTypes["enableStrictMode"]>
    ) {
      state.enableStrictMode = action.payload;
    },

    setEnableProgressAnimation(
      state,
      action: PayloadAction<SettingTypes["enableProgressAnimation"]>
    ) {
      state.enableProgressAnimation = action.payload;
    },

    setEnableVoiceAssistance(
      state,
      action: PayloadAction<SettingTypes["enableVoiceAssistance"]>
    ) {
      state.enableVoiceAssistance = action.payload;
    },

    setUseNativeTitlebar(
      state,
      action: PayloadAction<SettingTypes["useNativeTitlebar"]>
    ) {
      state.useNativeTitlebar = action.payload;
    },

    setNotificationType(
      state,
      action: PayloadAction<SettingTypes["notificationType"]>
    ) {
      state.notificationType = action.payload;
    },

    setCloseToTray(
      state,
      action: PayloadAction<SettingTypes["closeToTray"]>
    ) {
      state.closeToTray = action.payload;
    },

    setMinimizeToTray(
      state,
      action: PayloadAction<SettingTypes["minimizeToTray"]>
    ) {
      state.minimizeToTray = action.payload;
    },

    setAutoStartWorkTime(
      state,
      action: PayloadAction<SettingTypes["autoStartWorkTime"]>
    ) {
      state.autoStartWorkTime = action.payload;
    },

    setOpenAtLogin(
      state,
      action: PayloadAction<SettingTypes["openAtLogin"]>
    ) {
      state.openAtLogin = action.payload;
    },

    restoreDefaultSettings() {
      return defaultSettings;
    },
  },
});

export const {
  restoreDefaultSettings,
  setAlwaysOnTop,
  setAutoStartWorkTime,
  setCloseToTray,
  setEnableCompactMode,
  setEnableDarkTheme,
  setEnableFullscreenBreak,
  setEnableProgressAnimation,
  setEnableStrictMode,
  setEnableVoiceAssistance,
  setIgnoreUpdate,
  setMinimizeToTray,
  setNotificationType,
  setOpenAtLogin,
  setUseNativeTitlebar,
  toggleNotificationSound,
} = settingsSlice.actions;

export default settingsSlice.reducer;
