import { PayloadAction } from "@reduxjs/toolkit";

export type SpecialBreakTypes = {
  fromTime: string;
  toTime: string;
  duration: number;
};

export type ConfigTypes = {
  stayFocused: number;
  shortBreak: number;
  longBreak: number;
  sessionRounds: number;
  specialBreaks: {
    firstBreak?: SpecialBreakTypes;
    secondBreak?: SpecialBreakTypes;
    thirdBreak?: SpecialBreakTypes;
    fourthBreak?: SpecialBreakTypes;
  };
};

export type ConfigPayload<T extends keyof ConfigTypes> = PayloadAction<
  ConfigTypes[T]
>;
