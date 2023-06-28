import { minutesToSeconds } from "@renderer/utils";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { durationAtom, timerAtom } from "./timer.atom";

type ConfigProps = {
  stayFocused: number;
  shortBreak: number;
  longBreak: number;
  sessionRounds: number;
};

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

export const defaultConfig = import.meta.env.DEV
  ? {
      stayFocused: 0.1,
      shortBreak: 0.2,
      longBreak: 0.25,
      sessionRounds: 2,
    }
  : configPresets.standard;

export const configAtom = atomWithStorage<ConfigProps>(
  "config",
  defaultConfig
);

export const changeConfigAtom = atom(
  null,
  (get, set, config: Partial<ConfigProps>) => {
    const prev = get(configAtom);
    const timer = get(timerAtom);

    if (timer.isRunning) {
      set(timerAtom, {
        ...timer,
        isRunning: false,
      });
    }

    set(durationAtom, minutesToSeconds(get(configAtom).stayFocused));

    set(configAtom, {
      ...prev,
      ...config,
    });
  }
);
