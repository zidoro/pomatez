import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import { SettingTypes, SettingsPayload } from "./types";
import { defaultSettings } from "./defaultSettings";

export type { SettingTypes };

function mergeSettings(
  base: SettingTypes,
  override: Partial<SettingTypes>
): SettingTypes {
  const merged: any = { ...base };

  for (const key in base) {
    if (
      //@ts-expect-error
      typeof base[key] === "object" &&
      //@ts-expect-error
      base[key] !== null &&
      //@ts-expect-error
      !Array.isArray(base[key])
    ) {
      merged[key] = mergeSettings(
        //@ts-expect-error
        base[key],
        //@ts-expect-error
        (override?.[key] as any) || {}
      );
    } else {
      //@ts-expect-error
      merged[key] = override?.[key] ?? base[key];
    }
  }
  return merged as SettingTypes;
}

const settings = mergeSettings(
  defaultSettings,
  getFromStorage("state") && getFromStorage("state").settings
);

console.log("settings", settings);

const initialState: SettingTypes = settings;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIgnoreUpdate(state, action: SettingsPayload<"ignoreUpdate">) {
      state.ignoreUpdate = action.payload;
    },

    setAlwaysOnTop(state, action: SettingsPayload<"alwaysOnTop">) {
      state.alwaysOnTop = action.payload;
    },

    toggleNotificationSound(state) {
      state.notificationSoundOn = !state.notificationSoundOn;
    },

    setEnableDarkTheme(
      state,
      action: SettingsPayload<"enableDarkTheme">
    ) {
      state.enableDarkTheme = action.payload;
    },

    setFollowSystemTheme(
      state,
      action: SettingsPayload<"followSystemTheme">
    ) {
      state.followSystemTheme = action.payload;
    },

    setEnableCompactMode(
      state,
      action: SettingsPayload<"compactMode">
    ) {
      state.compactMode = action.payload;
    },

    setEnableFullscreenBreak(
      state,
      action: SettingsPayload<"enableFullscreenBreak">
    ) {
      state.enableFullscreenBreak = action.payload;
    },

    setEnableStrictMode(
      state,
      action: SettingsPayload<"enableStrictMode">
    ) {
      state.enableStrictMode = action.payload;
    },

    setEnableProgressAnimation(
      state,
      action: SettingsPayload<"enableProgressAnimation">
    ) {
      state.enableProgressAnimation = action.payload;
    },

    setEnableVoiceAssistance(
      state,
      action: SettingsPayload<"enableVoiceAssistance">
    ) {
      state.enableVoiceAssistance = action.payload;
    },

    setUseNativeTitlebar(
      state,
      action: SettingsPayload<"useNativeTitlebar">
    ) {
      state.useNativeTitlebar = action.payload;
    },

    setNotificationType(
      state,
      action: SettingsPayload<"notificationType">
    ) {
      state.notificationType = action.payload;
    },

    setCloseToTray(state, action: SettingsPayload<"closeToTray">) {
      state.closeToTray = action.payload;
    },

    setMinimizeToTray(
      state,
      action: SettingsPayload<"minimizeToTray">
    ) {
      state.minimizeToTray = action.payload;
    },

    setAutoStartWorkTime(
      state,
      action: SettingsPayload<"autoStartWorkTime">
    ) {
      state.autoStartWorkTime = action.payload;
    },

    setOpenAtLogin(state, action: SettingsPayload<"openAtLogin">) {
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
  setFollowSystemTheme,
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
