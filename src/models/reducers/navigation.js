import { SET_TITLE, SHOW_CONFIG } from "../actions";

const navState = {
  title: "",
  showConfig: false
};

const navReducer = (state, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SHOW_CONFIG:
      return {
        ...state,
        showConfig: action.payload
      };
    default:
      return state;
  }
};

export { navReducer, navState };
