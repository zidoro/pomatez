import { SET_UPDATING, SET_DOWNLOAD_COMPLETED } from "../actions";

const updateState = {
  updating: false,
  downloadCompleted: false
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case SET_UPDATING:
      return {
        ...state,
        updating: action.payload
      };
    case SET_DOWNLOAD_COMPLETED:
      return {
        ...state,
        downloadCompleted: action.payload
      };
    default:
      return state;
  }
};

export { updateReducer, updateState };
