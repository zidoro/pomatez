import { NotificationTypes, SettingTypes } from "./types";
import { detectOS, isPreferredDark } from "utils";

export const defaultSettings: Readonly<SettingTypes> = Object.freeze({
  alwaysOnTop: false,
  compactMode: false,
  ignoreUpdate: "",
  enableFullscreenBreak: false,
  enableStrictMode: false,
  enableDarkTheme: isPreferredDark(),
  followSystemTheme: true,
  enableProgressAnimation: true,
  enableVoiceAssistance: false,
  notificationSoundOn: true,
  notificationType: NotificationTypes.NONE,
  closeToTray: true,
  minimizeToTray: false,
  autoStartWorkTime: false,
  useNativeTitlebar: detectOS() === "Windows" ? false : true,
  openAtLogin: false,
  enableRPC: true,
});
