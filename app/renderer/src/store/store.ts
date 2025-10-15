import { configureStore } from "@reduxjs/toolkit";
import debounce from "lodash.debounce";

import { saveToStorage, getFromStorage } from "utils";
import configReducer from "./config";
import settingReducer from "./settings";
import timerReducer from "./timer";
import undoableTasksReducer from "./tasks";
import updateReducer from "./update";

export type AppStateTypes = ReturnType<typeof store.getState>;
export type AppDispatchTypes = typeof store.dispatch;

const store = configureStore({
  reducer: {
    config: configReducer,
    settings: settingReducer,
    timer: timerReducer,
    tasks: undoableTasksReducer,
    update: updateReducer,
  },
});

if (!getFromStorage("state")) {
  saveToStorage("state", {
    config: store.getState().config,
    settings: store.getState().settings,
    tasks: store.getState().tasks.present,
  });
}

store.subscribe(
  debounce(() => {
    saveToStorage("state", {
      config: store.getState().config,
      settings: store.getState().settings,
      tasks: store.getState().tasks.present,
    });
  }, 1000)
);

export default store;
