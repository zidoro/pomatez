import React, { createContext, useReducer } from "react";
import { settingReducer, settingState } from "../reducers";
import { getFromStorage, pushToStorage } from "../helpers";

const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const settingStore = getFromStorage("settingStore");

  const setting = useReducer(
    settingReducer,
    settingStore ? settingStore : settingState
  );

  pushToStorage("settingStore", setting[0]);

  return (
    <SettingContext.Provider value={setting}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
