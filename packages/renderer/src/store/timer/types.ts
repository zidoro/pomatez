const timer = "[timer]";

export type TimerTypes = {
  round: number;
  playing: boolean;
  timerType: "STAY_FOCUS" | "SHORT_BREAK" | "LONG_BREAK" | "SPECIAL_BREAK";
};

export const SET_PLAY = `${timer} SET_PLAY`;
export const SKIP_TIMER = `${timer} SKIP_TIMER`;
export const RESTART_TIMER = `${timer} RESTART_TIMER`;

export const SET_TIMER_TYPE = `${timer} SET_TIMER_TYPE`;
export const SET_ROUND = `${timer} SET_ROUND`;

export const STAY_FOCUS = "STAY_FOCUS";
export const SHORT_BREAK = "SHORT_BREAK";
export const LONG_BREAK = "LONG_BREAK";
export const SPECIAL_BREAK = "SPECIAL_BREAK";

interface SetPlay {
  type: typeof SET_PLAY;
  payload?: TimerTypes["playing"];
}

interface SkipTimer {
  type: typeof SKIP_TIMER;
  payload?: any;
}

interface RestartTimer {
  type: typeof RESTART_TIMER;
  payload?: any;
}

interface SetTimerType {
  type: typeof SET_TIMER_TYPE;
  payload?: TimerTypes["timerType"];
}

interface SetRound {
  type: typeof SET_ROUND;
  payload?: TimerTypes["round"];
}

export type TimerActionTypes =
  | SetPlay
  | SkipTimer
  | RestartTimer
  | SetTimerType
  | SetRound;
