import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  ENABLE_STRICT_MODE,
  RESTORE_DEFAULT_SETTINGS,
  ENABLE_DARK_THEME,
  TOGGLE_NOTIFICATION_SOUND,
  ENABLE_TIMER_ANIMATION,
  SET_NOTIFICATION_PROPERTY,
  ENABLE_FULLSCREEN_BREAK,
  USE_NATIVE_TITLE_BAR,
  ENABLE_AUTO_UPDATES,
} from "./types";
import { saveToStorage, getFromStorage, isPreferredDark } from "utils";

const defaultSettings: SettingTypes = {
  alwaysOnTop: false,
  enableFullscreenBreak: true,
  enableStrictMode: false,
  enableDarkTheme: isPreferredDark(),
  enableTimerAnimation: true,
  useNativeTitlebar: false,
  enableAutoUpdates: true,
  notificationSoundOn: true,
  notificationProperty: "extra",
};

const settings = getFromStorage("settings")
  ? getFromStorage("settings")
  : defaultSettings;

const initialState: SettingTypes = settings;

export const settingReducer = (
  state = initialState,
  action: SettingActionTypes
) => {
  switch (action.type) {
    case ALWAYS_ON_TOP: {
      const newState = {
        ...state,
        alwaysOnTop: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case TOGGLE_NOTIFICATION_SOUND: {
      const newState = {
        ...state,
        notificationSoundOn: !state.notificationSoundOn,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_FULLSCREEN_BREAK: {
      const newState = {
        ...state,
        enableFullscreenBreak: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_DARK_THEME: {
      const newState = {
        ...state,
        enableDarkTheme: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_STRICT_MODE: {
      const newState = {
        ...state,
        enableStrictMode: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_TIMER_ANIMATION: {
      const newState = {
        ...state,
        enableTimerAnimation: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case USE_NATIVE_TITLE_BAR: {
      const newState = {
        ...state,
        useNativeTitlebar: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_AUTO_UPDATES: {
      const newState = {
        ...state,
        enableAutoUpdates: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case SET_NOTIFICATION_PROPERTY: {
      const newState = {
        ...state,
        notificationProperty: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case RESTORE_DEFAULT_SETTINGS:
      saveToStorage("settings", defaultSettings);

      return defaultSettings;
    default:
      saveToStorage("settings", state);

      return state;
  }
};
