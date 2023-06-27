import { atomWithStorage } from "jotai/utils";
import { SessionType } from "@renderer/@data/types";
import { minutesToSeconds } from "@renderer/utils";
import { defaultConfig } from "./config.atom";

export type TimerProps = {
  sessionRound: number;
  interval: number;
  elapsed: number;
  duration: number;
  shouldFullScreenBreak: boolean;
  sessionType: SessionType;
  isRunning: boolean;
};

const duration = minutesToSeconds(defaultConfig.stayFocused);

export const defaultTimer: TimerProps = {
  sessionRound: 1,
  interval: 1,
  elapsed: 0,
  duration,
  shouldFullScreenBreak: false,
  sessionType: "stayFocused",
  isRunning: false,
};

export const timerAtom = atomWithStorage<TimerProps>(
  "timer",
  defaultTimer
);
