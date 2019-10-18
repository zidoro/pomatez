import { SET_RUNNING, SET_SILENT, SET_FULL_SCREEN } from "../actions";

const controlState = {
  running: false,
  silent: false,
  fullScreen: false
};

const controlReducer = (state, action) => {
  switch (action.type) {
    case SET_RUNNING:
      return {
        ...state,
        running: action.payload
      };
    case SET_SILENT:
      return {
        ...state,
        silent: action.payload
      };
    case SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen: action.payload
      };
    default:
      return state;
  }
};

export { controlReducer, controlState };
