import { action } from "easy-peasy";

export default {
  title: "Time Management App",
  setTitle: action((state, payload) => {
    state.title = payload;
  }),

  showConfig: false,
  setShowConfig: action(state => {
    state.showConfig = !state.showConfig;
  })
};
