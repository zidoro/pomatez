import React, { useReducer } from "react";
import {
  navReducer,
  navState,
  timerReducer,
  timerState,
  controlReducer,
  controlState,
  settingReducer,
  settingState,
  configReducer,
  configState
} from "./reducers";

const StoreContext = React.createContext();

const Provider = ({ children }) => {
  let store = JSON.parse(localStorage.getItem("store"));

  const nav = useReducer(navReducer, navState);
  const timer = useReducer(timerReducer, timerState);
  const config = useReducer(configReducer, store ? store.config : configState);
  const control = useReducer(controlReducer, controlState);
  const setting = useReducer(
    settingReducer,
    store ? store.setting : settingState
  );

  localStorage.setItem(
    "store",
    JSON.stringify({
      config: config[0],
      control: control[0],
      setting: setting[0]
    })
  );

  return (
    <StoreContext.Provider value={{ nav, timer, control, config, setting }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, Provider };
