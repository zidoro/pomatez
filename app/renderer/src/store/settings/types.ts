import { PayloadAction } from "@reduxjs/toolkit";

export type SettingTypes = {
  ignoreUpdate: string;
  alwaysOnTop: boolean;
  compactMode: boolean;
  enableFullscreenBreak: boolean;
  enableDarkTheme: boolean;
  followSystemTheme: boolean;
  enableStrictMode: boolean;
  enableProgressAnimation: boolean;
  enableVoiceAssistance: boolean;
  useNativeTitlebar: boolean;
  notificationSoundOn: boolean;
  closeToTray: boolean;
  minimizeToTray: boolean;
  autoStartWorkTime: boolean;
  notificationType: NotificationTypes;
  openAtLogin: boolean;
};

export const enum NotificationTypes {
  NONE = "none",
  NORMAL = "normal",
  EXTRA = "extra",
}

export type SettingsPayload<T extends keyof SettingTypes> =
  PayloadAction<SettingTypes[T]>;
