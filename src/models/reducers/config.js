import {
  SET_WORK_TIME,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_SESSION_ROUNDS,
  RESTORE_DEFAULT
} from "../actions";

const configState = {
  workingTime: 1,
  shortBreak: 5,
  longBreak: 15,
  sessionRounds: 4
};

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_WORK_TIME:
      return {
        ...state,
        workingTime: action.payload
      };
    case SET_SHORT_BREAK:
      return {
        ...state,
        shortBreak: action.payload
      };
    case SET_LONG_BREAK:
      return {
        ...state,
        longBreak: action.payload
      };
    case SET_SESSION_ROUNDS:
      return {
        ...state,
        sessionRounds: action.payload
      };
    case RESTORE_DEFAULT:
      return {
        workingTime: 25,
        shortBreak: 5,
        longBreak: 15,
        sessionRounds: 4
      };
    default:
      return state;
  }
};

export { configReducer, configState };
