import {
  TimerTypes,
  TimerActionTypes,
  SET_PLAY,
  SET_TIMER_TYPE,
  SET_ROUND,
  SKIP_TIMER,
} from "./types";

const initialState: TimerTypes = {
  round: 1,
  playing: false,
  timerType: "STAY_FOCUS",
};

export const timerReducer = (
  state = initialState,
  action: TimerActionTypes
) => {
  switch (action.type) {
    case SET_PLAY:
      return {
        ...state,
        playing: action.payload,
      };
    case SET_TIMER_TYPE:
      return {
        ...state,
        timerType: action.payload,
      };
    case SET_ROUND:
      return {
        ...state,
        round: action.payload,
      };
    case SKIP_TIMER:
      return {
        ...state,
        timerType: action.payload,
      };
    default:
      return state;
  }
};
