import {
  SettingTypes,
  SettingActionTypes,
  ALWAYS_ON_TOP,
  ENABLE_SPECIAL_BREAKS,
  ENABLE_STICKY_NOTES,
  ENABLE_STRICT_MODE,
  ENABLE_WEB_BLOCKER,
  RESTORE_DEFAULT_SETTINGS,
  ENABLE_DARK_THEME,
  TOGGLE_NOTIFICATION_SOUND,
  ENABLE_TIMER_ANIMATION,
  SET_NOTIFICATION_PROPERTY,
} from "./types";
import { saveToStorage, getFromStorage, isPreferredDark } from "utils";

const defaultSettings: SettingTypes = {
  alwaysOnTop: false,
  notificationSoundOn: true,
  enableSpecialBreaks: true,
  enableStickyNotes: false,
  enableStrictMode: true,
  enableWebBlocker: true,
  enableDarkTheme: isPreferredDark(),
  enableTimerAnimation: true,
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
    case ENABLE_SPECIAL_BREAKS: {
      const newState = {
        ...state,
        enableSpecialBreaks: action.payload,
      };

      saveToStorage("settings", newState);

      return newState;
    }
    case ENABLE_STICKY_NOTES: {
      const newState = {
        ...state,
        enableStickyNotes: action.payload,
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
    case ENABLE_WEB_BLOCKER: {
      const newState = {
        ...state,
        enableWebBlocker: action.payload,
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
