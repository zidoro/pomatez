import {
  SET_ON_TOP,
  SET_NOTIFY,
  SET_DARKMODE,
  SHOW_SETTING,
  SET_FULL_SCREEN_ON_BREAK
} from "../actions";

const getDefaultTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const settingState = {
  onTop: false,
  notify: true,
  darkMode: getDefaultTheme(),
  showSetting: false,
  fullScreenOnBreak: true
};

const settingReducer = (state, action) => {
  switch (action.type) {
    case SET_ON_TOP:
      return {
        ...state,
        onTop: action.payload
      };
    case SET_NOTIFY:
      return {
        ...state,
        notify: action.payload
      };
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.payload
      };
    case SHOW_SETTING:
      return {
        ...state,
        showSetting: action.payload
      };
    case SET_FULL_SCREEN_ON_BREAK:
      return {
        ...state,
        fullScreenOnBreak: action.payload
      };
    default:
      return state;
  }
};

export { settingReducer, settingState };
