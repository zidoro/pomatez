const settings = "[settings]";

export type SettingTypes = {
  alwaysOnTop: boolean;
  notificationSoundOn: boolean;
  enableNotifications: boolean;
  enableSpecialBreaks: boolean;
  enableDarkTheme: boolean;
  enableStickyNotes: boolean;
  enableStrictMode: boolean;
  enableWebBlocker: boolean;
  isSettingLock: boolean;
  enableTimerAnimation: boolean;
};

export const ALWAYS_ON_TOP = `${settings} ALWAYS_ON_TOP`;
export const TOGGLE_NOTIFICATION_SOUND = `${settings} TOGGLE_NOTIFICATION_SOUND`;
export const ENABLE_NOTIFICATION = `${settings} ENABLE_NOTIFICATION`;
export const ENABLE_SPECIAL_BREAKS = `${settings} ENABLE_SPECIAL_BREAKS`;
export const ENABLE_STICKY_NOTES = `${settings} ENABLE_STICKY_NOTES`;
export const ENABLE_DARK_THEME = `${settings} ENABLE_DARK_THEME`;

export const ENABLE_STRICT_MODE = `${settings} ENABLE_STRICT_MODE`;
export const ENABLE_WEB_BLOCKER = `${settings} ENABLE_WEB_BLOCKER`;

export const LOCK_SETTINGS = `${settings} LOCK_SETTINGS`;

export const ENABLE_TIMER_ANIMATION = `${settings} ENABLE_TIMER_ANIMATION`;

export const RESTORE_DEFAULT_SETTINGS = `${settings} RESTORE_DEFAULT_SETTINGS`;

interface SetAlwaysOnTop {
  type: typeof ALWAYS_ON_TOP;
  payload: SettingTypes["alwaysOnTop"];
}

interface TogglenotificationSoundOn {
  type: typeof TOGGLE_NOTIFICATION_SOUND;
  payload: SettingTypes["notificationSoundOn"];
}

interface SetEnableNotifications {
  type: typeof ENABLE_NOTIFICATION;
  payload: SettingTypes["enableNotifications"];
}

interface SetEnableSpecialBreaks {
  type: typeof ENABLE_SPECIAL_BREAKS;
  payload: SettingTypes["enableSpecialBreaks"];
}

interface SetEnableStickyNotes {
  type: typeof ENABLE_STICKY_NOTES;
  payload: SettingTypes["enableStickyNotes"];
}

interface SetEnableDarkTheme {
  type: typeof ENABLE_DARK_THEME;
  payload: SettingTypes["enableDarkTheme"];
}

interface SetEnableStrictMode {
  type: typeof ENABLE_STRICT_MODE;
  payload: SettingTypes["enableStrictMode"];
}

interface SetEnableWebBlocker {
  type: typeof ENABLE_WEB_BLOCKER;
  payload: SettingTypes["enableWebBlocker"];
}

interface LockSettings {
  type: typeof LOCK_SETTINGS;
  payload: SettingTypes["isSettingLock"];
}

interface SetEnableTimerAnimation {
  type: typeof ENABLE_TIMER_ANIMATION;
  payload: SettingTypes["enableTimerAnimation"];
}

export type SettingActionTypes =
  | SetAlwaysOnTop
  | SetEnableNotifications
  | SetEnableSpecialBreaks
  | SetEnableStickyNotes
  | SetEnableStrictMode
  | SetEnableWebBlocker
  | SetEnableDarkTheme
  | TogglenotificationSoundOn
  | LockSettings
  | SetEnableTimerAnimation;
