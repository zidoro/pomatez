import Store from "electron-store";
import { nativeTheme } from "electron";
import { isWindow } from "./helpers";

type StoreProps = {
  userId?: string;
  isDarkMode?: boolean;
  useNativeTitlebar?: boolean;
  compactMode?: boolean;
  openAtLogin?: boolean;
};

const store = new Store<StoreProps>({
  defaults: {
    isDarkMode: nativeTheme.shouldUseDarkColors,
    useNativeTitlebar: !isWindow(),
    compactMode: false,
    openAtLogin: false,
  },
});

export default store;
