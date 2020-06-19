import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  RESTORE_DEFAULT_SETTINGS,
  ENABLE_DARK_THEME,
  TOGGLE_NOTIFICATION_SOUND,
  ENABLE_TIMER_ANIMATION,
  SET_NOTIFICATION_PROPERTY,
  ENABLE_FULLSCREEN_BREAK,
  USE_NATIVE_TITLE_BAR,
  ENABLE_STRICT_MODE,
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

export const setEnableDarkTheme = (
  enableDarkTheme: SettingTypes["enableDarkTheme"]
): SettingActionTypes => {
  return {
    type: ENABLE_DARK_THEME,
    payload: enableDarkTheme,
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

export const setEnableTimerAnimation = (
  enableTimerAnimation: SettingTypes["enableTimerAnimation"]
): SettingActionTypes => {
  return {
    type: ENABLE_TIMER_ANIMATION,
    payload: enableTimerAnimation,
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
