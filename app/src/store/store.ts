import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import debounce from "lodash.debounce";

import { saveToStorage } from "utils";
import { configReducer } from "./config";
import { settingReducer } from "./settings";
import { timerReducer } from "./timer";
import { undoableTasksReducer } from "./tasks";

const rootReducer = combineReducers({
  config: configReducer,
  settings: settingReducer,
  timer: timerReducer,
  tasks: undoableTasksReducer,
});

export type AppStateTypes = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, devToolsEnhancer({}));

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
