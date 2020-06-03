import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  ENABLE_SPECIAL_BREAKS,
  ENABLE_STICKY_NOTES,
  ENABLE_STRICT_MODE,
  ENABLE_WEB_BLOCKER,
  RESTORE_DEFAULT_SETTINGS,
  ENABLE_DARK_THEME,
  TOGGLE_NOTIFICATION_SOUND,
  ENABLE_TIMER_ANIMATION,
  SET_NOTIFICATION_PROPERTY,
} from "./types";

export const setAlwaysOnTop = (
  alwaysOnTop: SettingTypes["alwaysOnTop"]
): SettingActionTypes => {
  return {
    type: ALWAYS_ON_TOP,
    payload: alwaysOnTop,
  };
};

export const togglenotificationSoundOn = () => {
  return {
    type: TOGGLE_NOTIFICATION_SOUND,
  };
};

export const setEnableSpecialBreaks = (
  enableSpecialBreaks: SettingTypes["enableSpecialBreaks"]
): SettingActionTypes => {
  return {
    type: ENABLE_SPECIAL_BREAKS,
    payload: enableSpecialBreaks,
  };
};

export const setEnableStickyNotes = (
  enableStickyNotes: SettingTypes["enableStickyNotes"]
): SettingActionTypes => {
  return {
    type: ENABLE_STICKY_NOTES,
    payload: enableStickyNotes,
  };
};

export const setEnableDarkTheme = (
  enableDarkTheme: SettingTypes["enableDarkTheme"]
): SettingActionTypes => {
  return {
    type: ENABLE_DARK_THEME,
    payload: enableDarkTheme,
  };
};

export const setEnableStrictMode = (
  enableStrictMode: SettingTypes["enableStrictMode"]
): SettingActionTypes => {
  return {
    type: ENABLE_STRICT_MODE,
    payload: enableStrictMode,
  };
};

export const setEnableWebBlocker = (
  enableWebBlocker: SettingTypes["enableWebBlocker"]
): SettingActionTypes => {
  return {
    type: ENABLE_WEB_BLOCKER,
    payload: enableWebBlocker,
  };
};

export const setEnableTimerAnimation = (
  enableTimerAnimation: SettingTypes["enableTimerAnimation"]
): SettingActionTypes => {
  return {
    type: ENABLE_TIMER_ANIMATION,
    payload: enableTimerAnimation,
  };
};

export const setNotificationProperty = (
  notificationProperty: string
): SettingActionTypes => {
  return {
    type: SET_NOTIFICATION_PROPERTY,
    payload: notificationProperty,
  };
};

export const restoreDefaultSettings = () => ({
  type: RESTORE_DEFAULT_SETTINGS,
});
