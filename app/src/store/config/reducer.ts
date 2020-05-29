import {
  ConfigTypes,
  ConfigActionTypes,
  SET_STAY_FOCUS,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_SESSION_ROUNDS,
  RESTORE_DEFAULT_CONFIG,
  SET_FIRST_SPECIAL_BREAK,
  SET_SECOND_SPECIAL_BREAK,
  SET_THIRD_SPECIAL_BREAK,
  SET_FOUTH_SPECIAL_BREAK,
} from "./types";
import { getFromStorage, saveToStorage } from "utils";

const defaultConfig: ConfigTypes = {
  stayFocus: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionRounds: 4,
  specialBreaks: {
    firstBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    secondBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    thirdBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    fourthBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
  },
};

const config = getFromStorage("config")
  ? getFromStorage("config")
  : defaultConfig;

const initialState: ConfigTypes = config;

export const configReducer = (
  state = initialState,
  action: ConfigActionTypes
) => {
  switch (action.type) {
    case SET_STAY_FOCUS: {
      const newState = {
        ...state,
        stayFocus: action.payload,
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_SHORT_BREAK: {
      const newState = {
        ...state,
        shortBreak: action.payload,
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_LONG_BREAK: {
      const newState = {
        ...state,
        longBreak: action.payload,
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_SESSION_ROUNDS: {
      const newState = {
        ...state,
        sessionRounds: action.payload,
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_FIRST_SPECIAL_BREAK: {
      const newState = {
        ...state,
        specialBreaks: {
          ...state.specialBreaks,
          firstBreak: action.payload,
        },
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_SECOND_SPECIAL_BREAK: {
      const newState = {
        ...state,
        specialBreaks: {
          ...state.specialBreaks,
          secondBreak: action.payload,
        },
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_THIRD_SPECIAL_BREAK: {
      const newState = {
        ...state,
        specialBreaks: {
          ...state.specialBreaks,
          thirdBreak: action.payload,
        },
      };

      saveToStorage("config", newState);

      return newState;
    }
    case SET_FOUTH_SPECIAL_BREAK: {
      const newState = {
        ...state,
        specialBreaks: {
          ...state.specialBreaks,
          fourthBreak: action.payload,
        },
      };

      saveToStorage("config", newState);

      return newState;
    }
    case RESTORE_DEFAULT_CONFIG:
      saveToStorage("config", defaultConfig);

      return defaultConfig;
    default:
      saveToStorage("config", state);

      return state;
  }
};
