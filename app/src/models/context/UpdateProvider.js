import React, { createContext, useReducer } from "react";
import { updateReducer, updateState } from "../reducers";

const UpdateContext = createContext();

const UpdateProvider = ({ children }) => {
  const update = useReducer(updateReducer, updateState);
  return (
    <UpdateContext.Provider value={update}>{children}</UpdateContext.Provider>
  );
};

export { UpdateContext, UpdateProvider };
