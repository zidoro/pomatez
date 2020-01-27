import React, { createContext, useReducer } from "react";
import { controlReducer, controlState } from "../reducers";

const ControlContext = createContext();

const ControlProvider = ({ children }) => {
  const control = useReducer(controlReducer, controlState);
  return (
    <ControlContext.Provider value={control}>
      {children}
    </ControlContext.Provider>
  );
};

export { ControlContext, ControlProvider };
