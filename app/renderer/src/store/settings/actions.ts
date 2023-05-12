import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  RESTORE_DEFAULT_SETTINGS,
  ENABLE_DARK_THEME,
  TOGGLE_NOTIFICATION_SOUND,
  ENABLE_PROGRESS_ANIMATION,
  SET_NOTIFICATION_PROPERTY,
  ENABLE_FULLSCREEN_BREAK,
  USE_NATIVE_TITLE_BAR,
  ENABLE_STRICT_MODE,
  CLOSE_TO_TRAY,
  MINIMIZE_TO_TRAY,
  AUTO_START_WORK_TIME,
  ENABLE_VOICE_ASSISTANCE,
  ENABLE_COMPACT_MODE,
  OPEN_AT_LOGIN,
} from "./types";

export const setAlwaysOnTop = (
  alwaysOnTop: SettingTypes["alwaysOnTop"]
): SettingActionTypes => {
  return {
    type: ALWAYS_ON_TOP,
    payload: alwaysOnTop,
  };
};

export const toggleNotificationSound = () => {
  return {
    type: TOGGLE_NOTIFICATION_SOUND,
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

export const setEnableCompactMode = (
  enableCompactMode: SettingTypes["compactMode"]
): SettingActionTypes => {
  return {
    type: ENABLE_COMPACT_MODE,
    payload: enableCompactMode,
  };
};

export const setEnableFullscreenBreak = (
  enableFullscreenBreak: SettingTypes["enableFullscreenBreak"]
): SettingActionTypes => {
  return {
    type: ENABLE_FULLSCREEN_BREAK,
    payload: enableFullscreenBreak,
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

export const setEnableProgressAnimation = (
  enableProgressAnimation: SettingTypes["enableProgressAnimation"]
): SettingActionTypes => {
  return {
    type: ENABLE_PROGRESS_ANIMATION,
    payload: enableProgressAnimation,
  };
};

export const setEnableVoiceAssistance = (
  enableVoiceAssistance: SettingTypes["enableVoiceAssistance"]
): SettingActionTypes => {
  return {
    type: ENABLE_VOICE_ASSISTANCE,
    payload: enableVoiceAssistance,
  };
};

export const setUseNativeTitlebar = (
  useNativeTitlebar: SettingTypes["useNativeTitlebar"]
): SettingActionTypes => {
  return {
    type: USE_NATIVE_TITLE_BAR,
    payload: useNativeTitlebar,
  };
};

export const setNotificationType = (
  notificationType: string
): SettingActionTypes => {
  return {
    type: SET_NOTIFICATION_PROPERTY,
    payload: notificationType,
  };
};

export const setCloseToTray = (
  closeToTray: SettingTypes["closeToTray"]
): SettingActionTypes => {
  return {
    type: CLOSE_TO_TRAY,
    payload: closeToTray,
  };
};

export const setMinimizeToTray = (
  minimizeToTray: SettingTypes["minimizeToTray"]
): SettingActionTypes => {
  return {
    type: MINIMIZE_TO_TRAY,
    payload: minimizeToTray,
  };
};

export const setAutoStartWorkTime = (
  autoStartWorkTime: SettingTypes["autoStartWorkTime"]
): SettingActionTypes => {
  return {
    type: AUTO_START_WORK_TIME,
    payload: autoStartWorkTime,
  };
};

export const setOpenAtLogin = (
  openAtLogin: SettingTypes["openAtLogin"]
): SettingActionTypes => {
  return {
    type: OPEN_AT_LOGIN,
    payload: openAtLogin,
  };
};

export const restoreDefaultSettings = () => ({
  type: RESTORE_DEFAULT_SETTINGS,
});
