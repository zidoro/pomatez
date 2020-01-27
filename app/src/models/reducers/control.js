import { SET_RUNNING, SET_SILENT } from "../actions";

const controlState = {
  running: false,
  silent: false
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
    default:
      return state;
  }
};

export { controlReducer, controlState };
