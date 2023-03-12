import { ConfigProps, SettingsProps } from "./types";

export const configPresets: Record<
  "standard" | "extended" | "ultradian",
  ConfigProps
> = {
  standard: {
    stayFocused: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionRounds: 4,
  },
  extended: {
    stayFocused: 50,
    shortBreak: 10,
    longBreak: 30,
    sessionRounds: 3,
  },
  ultradian: {
    stayFocused: 90,
    shortBreak: 30,
    longBreak: 60,
    sessionRounds: 2,
  },
};

export const defaultConfig = configPresets.standard;

export const defaultSettings: SettingsProps = {
  alwaysOnTop: false,
  fullscreenBreak: false,
  strictMode: false,
  darkMode: false,
  progressAnimation: true,
  autostartWork: false,
  minimizeToTray: false,
  closeToTray: false,
};
