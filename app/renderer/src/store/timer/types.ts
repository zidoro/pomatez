import type { PayloadAction } from "@reduxjs/toolkit";

export type TimerTypes = {
  round: number;
  playing: boolean;
  timerType: TimerStatus;
};

export const enum TimerStatus {
  STAY_FOCUS = "STAY_FOCUS",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
  SPECIAL_BREAK = "SPECIAL_BREAK",
}

export type TimerPayload<T extends keyof TimerTypes> = PayloadAction<
  TimerTypes[T]
>;
