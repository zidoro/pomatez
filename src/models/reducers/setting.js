import { SET_ON_TOP, SET_NOTIFY, SET_DARKMODE, SHOW_SETTING } from "../actions";

const settingState = {
  onTop: false,
  notify: true,
  darkMode: false,
  showSetting: false
};

const settingReducer = (state, action) => {
  switch (action.type) {
    case SET_ON_TOP:
      return {
        ...state,
        onTop: !state.onTop
      };
    case SET_NOTIFY:
      return {
        ...state,
        notify: !state.notify
      };
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case SHOW_SETTING:
      return {
        ...state,
        showSetting: !state.showSetting
      };
    default:
      return state;
  }
};

export { settingReducer, settingState };
