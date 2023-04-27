export type ConfigProps = {
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

export const defaultConfig = {
  stayFocused: 0.25,
  shortBreak: 0.25,
  longBreak: 0.5,
  sessionRounds: 2,
};
