import { action } from "easy-peasy";

export default {
  title: "Time Management App",
  setTitle: action((state, payload) => {
    state.title = payload;
  }),

  showConfig: true,
  setShowConfig: action(state => {
    state.showConfig = !state.showConfig;
  })
};
