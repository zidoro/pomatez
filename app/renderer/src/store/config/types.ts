export type SpecialBreakTypes = {
  fromTime: string;
  toTime: string;
  duration: number;
};

export type ConfigTypes = {
  stayFocus: number;
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
