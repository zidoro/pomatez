export type SettingsProps = {
  alwaysOnTop: boolean;
  fullscreenBreak: boolean;
  strictMode: boolean;
  darkMode: boolean;
  progressAnimation: boolean;
  autostartBreak: boolean;
  autostartWork: boolean;
  minimizeToTray: boolean;
  closeToTray: boolean;
};

export const defaultSettings: SettingsProps = {
  alwaysOnTop: false,
  fullscreenBreak: false,
  strictMode: false,
  darkMode: false,
  progressAnimation: true,
  autostartBreak: true,
  autostartWork: true,
  minimizeToTray: false,
  closeToTray: false,
};
