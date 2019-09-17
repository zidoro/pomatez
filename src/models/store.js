import React, { useReducer } from "react";
import {
  navReducer,
  navState,
  timerReducer,
  timerState,
  controlReducer,
  controlState,
  settingReducer,
  settingState
} from "./reducers";

const StoreContext = React.createContext();

const Provider = ({ children }) => {
  const nav = useReducer(navReducer, navState);
  const timer = useReducer(timerReducer, timerState);
  const control = useReducer(controlReducer, controlState);
  const setting = useReducer(settingReducer, settingState);
  return (
    <StoreContext.Provider value={{ nav, timer, control, setting }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, Provider };
