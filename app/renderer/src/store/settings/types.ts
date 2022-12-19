const settings = "[settings]";

export type SettingTypes = {
	alwaysOnTop: boolean;
	compactMode: boolean;
	enableFullscreenBreak: boolean;
	enableDarkTheme: boolean;
	enableStrictMode: boolean;
	enableProgressAnimation: boolean;
	enableVoiceAssistance: boolean;
	useNativeTitlebar: boolean;
	notificationSoundOn: boolean;
	closeToTray: boolean;
	minimizeToTray: boolean;
	autoStartWorkTime: boolean;
	notificationProperty: "none" | "normal" | "extra";
};

export const ALWAYS_ON_TOP = `${settings} ALWAYS_ON_TOP`;
export const ENABLE_DARK_THEME = `${settings} ENABLE_DARK_THEME`;

export const ENABLE_COMPACT_MODE = `${settings} ENABLE_COMPACT_MODE`;
export const ENABLE_FULLSCREEN_BREAK = `${settings} ENABLE_FULLSCREEN_BREAK`;
export const ENABLE_STRICT_MODE = `${settings} ENABLE_STRICT_MODE`;

export const ENABLE_PROGRESS_ANIMATION = `${settings} ENABLE_PROGRESS_ANIMATION`;
export const ENABLE_VOICE_ASSISTANCE = `${settings} ENABLE_VOICE_ASSISTANCE`;

export const USE_NATIVE_TITLE_BAR = `${settings} USE_NATIVE_TITLE_BAR`;
export const ENABLE_AUTO_UPDATES = `${settings} ENABLE_AUTO_UPDATES`;

export const TOGGLE_NOTIFICATION_SOUND = `${settings} TOGGLE_NOTIFICATION_SOUND`;
export const SET_NOTIFICATION_PROPERTY = `${settings} SET_NOTIFICATION_PROPERTY`;

export const CLOSE_TO_TRAY = `${settings} CLOSE_TO_TRAY`;
export const MINIMIZE_TO_TRAY = `${settings} MINIMIZE_TO_TRAY`;
export const AUTO_START_WORK_TIME = `${settings} AUTO_START_WORK_TIME`;

export const RESTORE_DEFAULT_SETTINGS = `${settings} RESTORE_DEFAULT_SETTINGS`;

export type SettingActionTypes = {
	type: string;
	payload: any;
};
