import { action } from "easy-peasy";

export default {
  onTop: false,
  setOnTop: action(state => {
    state.onTop = !state.onTop;
  }),

  notify: true,
  setNotify: action(state => {
    state.notify = !state.notify;
  }),

  darkMode: false,
  setDarkMode: action(state => {
    state.darkMode = !state.darkMode;
  }),

  showSetting: false,
  setShowSetting: action(state => {
    state.showSetting = !state.showSetting;
  })
};
