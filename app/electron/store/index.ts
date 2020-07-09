import Store from "electron-store";
import { systemPreferences } from "electron";

type StoreProps = {
  userId: string;
  isDarkMode: boolean;
  useNativeTitlebar: boolean;
};

const store = new Store<StoreProps>();

if (store.get("isDarkMode") == null) {
  store.set("isDarkMode", systemPreferences.isDarkMode());
}

if (store.get("useNativeTitlebar") == null) {
  store.set("useNativeTitlebar", false);
}

export default store;
