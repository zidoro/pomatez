import { getFromStorage, isPreferredDark, detectOS } from "utils";
import {
  UpdateTypes,
  UpdateActionTypes,
  UPDATE_BODY,
  UPDATE_VERSION,
} from "./types";

const defaultSettings: UpdateTypes = {
  updateBody: undefined,
  updateVersion: "",
};

const settings =
  (getFromStorage("state") && getFromStorage("state").settings) ||
  defaultSettings;

const initialState: UpdateTypes = settings;

export const updateReducer = (
  state = initialState,
  action: UpdateActionTypes
) => {
  switch (action.type) {
    case UPDATE_BODY:
      return {
        ...state,
        updateBody: action.payload,
      };
    case UPDATE_VERSION:
      return {
        ...state,
        updateVersion: action.payload,
      };
    default:
      return state;
  }
};
