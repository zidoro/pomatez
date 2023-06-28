import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type SettingsProps = {
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

const defaultSettings: SettingsProps = {
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

export const settingsAtom = atomWithStorage<SettingsProps>(
  "settings",
  defaultSettings
);

export const toggleSoundAtom = atom(null, (get, set) => {
  const settings = get(settingsAtom);

  set(settingsAtom, {
    ...settings,
    isMuted: !settings.isMuted,
  });
});

export const toggleCompactAtom = atom(null, (get, set) => {
  const settings = get(settingsAtom);

  set(settingsAtom, {
    ...settings,
    isCompact: !settings.isCompact,
  });
});
