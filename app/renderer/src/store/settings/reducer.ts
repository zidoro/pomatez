import { getFromStorage, isPreferredDark, detectOS } from "utils";
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
  ENABLE_PROGRESS_ANIMATION,
  USE_NATIVE_TITLE_BAR,
  CLOSE_TO_TRAY,
  MINIMIZE_TO_TRAY,
  AUTO_START_WORK_TIME,
  ENABLE_VOICE_ASSISTANCE,
  ENABLE_COMPACT_MODE,
} from "./types";

const defaultSettings: SettingTypes = {
  alwaysOnTop: false,
  compactMode: false,
  enableFullscreenBreak: false,
  enableStrictMode: false,
  enableDarkTheme: isPreferredDark(),
  enableProgressAnimation: true,
  enableVoiceAssistance: false,
  notificationSoundOn: true,
  notificationType: "none",
  closeToTray: true,
  minimizeToTray: false,
  autoStartWorkTime: false,
  useNativeTitlebar: detectOS() === "Windows" ? false : true,
};

const settings =
  (getFromStorage("state") && getFromStorage("state").settings) ||
  defaultSettings;

const initialState: SettingTypes = settings;

export const settingReducer = (
  state = initialState,
  action: SettingActionTypes
) => {
  switch (action.type) {
    case ALWAYS_ON_TOP:
      return {
        ...state,
        alwaysOnTop: action.payload,
      };
    case TOGGLE_NOTIFICATION_SOUND:
      return {
        ...state,
        notificationSoundOn: !state.notificationSoundOn,
      };
    case ENABLE_COMPACT_MODE:
      return {
        ...state,
        compactMode: Boolean(action.payload),
      };
    case ENABLE_FULLSCREEN_BREAK:
      return {
        ...state,
        enableFullscreenBreak: action.payload,
      };
    case ENABLE_DARK_THEME:
      return {
        ...state,
        enableDarkTheme: action.payload,
      };
    case ENABLE_STRICT_MODE:
      return {
        ...state,
        enableStrictMode: action.payload,
      };
    case ENABLE_PROGRESS_ANIMATION:
      return {
        ...state,
        enableProgressAnimation: action.payload,
      };
    case ENABLE_VOICE_ASSISTANCE:
      return {
        ...state,
        enableVoiceAssistance: action.payload,
      };
    case USE_NATIVE_TITLE_BAR:
      return {
        ...state,
        useNativeTitlebar: action.payload,
      };
    case SET_NOTIFICATION_PROPERTY:
      return {
        ...state,
        notificationType: action.payload,
      };
    case CLOSE_TO_TRAY:
      return {
        ...state,
        closeToTray: action.payload,
      };
    case MINIMIZE_TO_TRAY:
      return {
        ...state,
        minimizeToTray: action.payload,
      };
    case AUTO_START_WORK_TIME:
      return {
        ...state,
        autoStartWorkTime: action.payload,
      };
    case RESTORE_DEFAULT_SETTINGS:
      return defaultSettings;
    default:
      return state;
  }
};
