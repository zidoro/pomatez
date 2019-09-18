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
  const nav = useReducer(navReducer, navState);
  const timer = useReducer(timerReducer, timerState);
  const config = useReducer(configReducer, configState);
  const control = useReducer(controlReducer, controlState);
  const setting = useReducer(settingReducer, settingState);
  return (
    <StoreContext.Provider value={{ nav, timer, control, config, setting }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, Provider };
