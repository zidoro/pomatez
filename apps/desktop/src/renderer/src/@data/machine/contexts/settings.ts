export type SettingsProps = {
  alwaysOnTop: boolean;
  fullscreenBreak: boolean;
  strictMode: boolean;
  darkMode: boolean;
  progressAnimation: boolean;
  autoStartBreak: boolean;
  autoStartWork: boolean;
  minimizeToTray: boolean;
  closeToTray: boolean;
  isCompact: boolean;
  isMuted: boolean;
};

export const defaultSettings: SettingsProps = {
  alwaysOnTop: false,
  fullscreenBreak: true,
  strictMode: false,
  darkMode: false,
  progressAnimation: true,
  autoStartBreak: true,
  autoStartWork: true,
  minimizeToTray: false,
  closeToTray: false,
  isCompact: false,
  isMuted: false,
};
