import { minutesToSeconds } from "@renderer/utils";
import { defaultConfig } from "./config";

export type TimerProps = {
  sessionRound: number;
  interval: number;
  elapsed: number;
  duration: number;
  shouldFullScreenBreak: boolean;
};

const duration = minutesToSeconds(defaultConfig.stayFocused);

export const defaultTimer: TimerProps = {
  sessionRound: 1,
  interval: 1,
  elapsed: 0,
  duration,
  shouldFullScreenBreak: false,
};
