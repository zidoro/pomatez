import React, { createContext, useReducer } from "react";
import { timerReducer, timerState } from "../reducers";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const timer = useReducer(timerReducer, timerState);
  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
