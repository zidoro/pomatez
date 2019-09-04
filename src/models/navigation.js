import { action } from "easy-peasy";

export default {
  showConfig: false,
  setShowConfig: action(state => {
    state.showConfig = !state.showConfig;
  })
};
