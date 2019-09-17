import { SET_DURATION, SET_COUNTDOWN, SET_DASH_OFFSET } from "../actions";

const timerState = {
  duration: 0,
  countDown: 0,
  dashOffset: 0
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload * 60
      };
    case SET_COUNTDOWN:
      return {
        ...state,
        countDown: action.payload
      };
    case SET_DASH_OFFSET:
      return {
        ...state,
        dashOffset: action.payload
      };
    default:
      return state;
  }
};

export { timerReducer, timerState };
