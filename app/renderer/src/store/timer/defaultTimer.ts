import { TimerStatus, TimerTypes } from "./types";

export const defaultTimer: Readonly<TimerTypes> = Object.freeze({
  round: 1,
  playing: false,
  timerType: TimerStatus.STAY_FOCUS,
});
