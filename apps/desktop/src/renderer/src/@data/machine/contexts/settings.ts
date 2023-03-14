export type SettingsProps = {
  alwaysOnTop: boolean;
  fullscreenBreak: boolean;
  strictMode: boolean;
  darkMode: boolean;
  progressAnimation: boolean;
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
  autostartWork: false,
  minimizeToTray: false,
  closeToTray: false,
};
