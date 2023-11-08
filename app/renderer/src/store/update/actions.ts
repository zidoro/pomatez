import {
  UpdateTypes,
  UpdateActionTypes,
  UPDATE_BODY,
  UPDATE_VERSION,
} from "./types";

export const setUpdateBody = (
  updateBody: UpdateTypes["updateBody"]
): UpdateActionTypes => {
  return {
    type: UPDATE_BODY,
    payload: updateBody,
  };
};

export const setUpdateVersion = (
  updateVersion: UpdateTypes["updateVersion"]
): UpdateActionTypes => {
  return {
    type: UPDATE_VERSION,
    payload: updateVersion,
  };
};
