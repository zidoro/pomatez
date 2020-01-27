import React, { createContext, useReducer } from "react";
import { navReducer, navState } from "../reducers";

const NavContext = createContext();

const NavProvider = ({ children }) => {
  const nav = useReducer(navReducer, navState);
  return <NavContext.Provider value={nav}>{children}</NavContext.Provider>;
};

export { NavContext, NavProvider };
