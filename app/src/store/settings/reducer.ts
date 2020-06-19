import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  ENABLE_DARK_THEME,
  ENABLE_STRICT_MODE,
  RESTORE_DEFAULT_SETTINGS,
  TOGGLE_NOTIFICATION_SOUND,
  SET_NOTIFICATION_PROPERTY,
  ENABLE_FULLSCREEN_BREAK,
  ENABLE_TIMER_ANIMATION,
  USE_NATIVE_TITLE_BAR,
} from "./types";
import {
  saveToStorage,
  getFromStorage,
  isPreferredDark,
  detectOS,
} from "utils";

const defaultSettings: SettingTypes = {
  alwaysOnTop: false,
  enableFullscreenBreak: true,
  enableStrictMode: false,
  enableDarkTheme: isPreferredDark(),
  enableTimerAnimation: true,
  notificationSoundOn: true,
  notificationProperty: "extra",
  useNativeTitlebar: detectOS() === "Windows" ? false : true,
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
