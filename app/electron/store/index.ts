import Store from "electron-store";
import { systemPreferences } from "electron";
import { isWindow } from "../helpers";

type StoreProps = {
  isDarkMode: boolean;
  useNativeTitlebar: boolean;
};

const store = new Store<StoreProps>();

if (store.get("isDarkMode") == null) {
  store.set("isDarkMode", systemPreferences.isDarkMode());
}

if (store.get("useNativeTitlebar") == null) {
  store.set("useNativeTitlebar", isWindow() ? false : true);
}

export default store;
