import {
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_TIMER_TYPE,
  SET_ROUND
} from "../actions";

const timerState = {
  round: 1,
  timerType: "WORK",
  duration: 0,
  counter: 0,
  dashOffset: 0,
  finalDashOffset: 980
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case SET_TIMER_TYPE:
      return {
        ...state,
        timerType: action.payload
      };
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case SET_COUNTER:
      return {
        ...state,
        counter: action.payload
      };
    case SET_DASH_OFFSET:
      return {
        ...state,
        dashOffset: action.payload
      };
    case SET_ROUND:
      return {
        ...state,
        round: action.payload
      };
    default:
      return state;
  }
};

export { timerReducer, timerState };
