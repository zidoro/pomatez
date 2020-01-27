import React, { createContext, useReducer } from "react";
import { getFromStorage, pushToStorage } from "../helpers";
import { configReducer, configState } from "../reducers";

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
  const configStore = getFromStorage("configStore");

  const config = useReducer(
    configReducer,
    configStore ? configStore : configState
  );

  pushToStorage("configStore", config[0]);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
