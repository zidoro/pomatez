import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import { configReducer } from "./config";
import { settingReducer } from "./settings";
import { timerReducer } from "./timer";
import { tasksReducer } from "./tasks";

const rootReducer = combineReducers({
  config: configReducer,
  settings: settingReducer,
  timer: timerReducer,
  tasks: tasksReducer,
});

export type AppStateTypes = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, devToolsEnhancer({}));

export default store;
