const config = "[config]";

export type SpecialBreakTypes = {
  time: string;
  duration: string;
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

export const SET_STAY_FOCUS = `${config} SET_STAY_FOCUS`;
export const SET_SHORT_BREAK = `${config} SET_SHORT_BREAK`;
export const SET_LONG_BREAK = `${config} SET_LONG_BREAK`;
export const SET_SESSION_ROUNDS = `${config} SET_SESSION_ROUNDS`;
export const RESTORE_DEFAULT_CONFIG = `${config} RESTORE_DEFAULT_CONFIG`;

export const SET_FIRST_SPECIAL_BREAK = `${config} SET_FIRST_SPECIAL_BREAK`;
export const SET_SECOND_SPECIAL_BREAK = `${config} SET_SECOND_SPECIAL_BREAK`;
export const SET_THIRD_SPECIAL_BREAK = `${config} SET_THIRD_SPECIAL_BREAK`;
export const SET_FOUTH_SPECIAL_BREAK = `${config} SET_FOUTH_SPECIAL_BREAK`;

interface SetStayFocus {
  type: typeof SET_STAY_FOCUS;
  payload: ConfigTypes["stayFocus"];
}

interface SetShortBreak {
  type: typeof SET_SHORT_BREAK;
  payload: ConfigTypes["shortBreak"];
}

interface SetLongBreak {
  type: typeof SET_LONG_BREAK;
  payload: ConfigTypes["longBreak"];
}

interface SetSessionRounds {
  type: typeof SET_SESSION_ROUNDS;
  payload: ConfigTypes["sessionRounds"];
}

interface SetFirstSpecialBreak {
  type: typeof SET_FIRST_SPECIAL_BREAK;
  payload: any;
}

interface SetSecondSpecialBreak {
  type: typeof SET_FIRST_SPECIAL_BREAK;
  payload: any;
}

interface SetThirdSpecialBreak {
  type: typeof SET_FIRST_SPECIAL_BREAK;
  payload: any;
}

interface SetFourthSpecialBreak {
  type: typeof SET_FIRST_SPECIAL_BREAK;
  payload: any;
}

export type ConfigActionTypes =
  | SetStayFocus
  | SetShortBreak
  | SetLongBreak
  | SetSessionRounds
  | SetFirstSpecialBreak
  | SetSecondSpecialBreak
  | SetThirdSpecialBreak
  | SetFourthSpecialBreak;
