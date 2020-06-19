const settings = "[settings]";

export type SettingTypes = {
  alwaysOnTop: boolean;
  enableFullscreenBreak: boolean;
  enableDarkTheme: boolean;
  enableStrictMode: boolean;
  enableTimerAnimation: boolean;
  useNativeTitlebar: boolean;
  notificationSoundOn: boolean;
  notificationProperty: "none" | "normal" | "extra";
};

export const ALWAYS_ON_TOP = `${settings} ALWAYS_ON_TOP`;
export const ENABLE_DARK_THEME = `${settings} ENABLE_DARK_THEME`;

export const ENABLE_FULLSCREEN_BREAK = `${settings} ENABLE_FULLSCREEN_BREAK`;
export const ENABLE_STRICT_MODE = `${settings} ENABLE_STRICT_MODE`;

export const ENABLE_TIMER_ANIMATION = `${settings} ENABLE_TIMER_ANIMATION`;

export const USE_NATIVE_TITLE_BAR = `${settings} USE_NATIVE_TITLE_BAR`;
export const ENABLE_AUTO_UPDATES = `${settings} ENABLE_AUTO_UPDATES`;

export const TOGGLE_NOTIFICATION_SOUND = `${settings} TOGGLE_NOTIFICATION_SOUND`;
export const SET_NOTIFICATION_PROPERTY = `${settings} SET_NOTIFICATION_PROPERTY`;

export const RESTORE_DEFAULT_SETTINGS = `${settings} RESTORE_DEFAULT_SETTINGS`;

export type SettingActionTypes = {
  type: string;
  payload: any;
};
