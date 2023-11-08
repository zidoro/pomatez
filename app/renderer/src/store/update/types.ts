const update = "[update]";

export type UpdateTypes = {
  updateVersion: string;
  updateBody: string | undefined;
};
export const UPDATE_BODY = `${update} UPDATE_BODY`;
export const UPDATE_VERSION = `${update} UPDATE_VERSION`;

export type UpdateActionTypes = {
  type: string;
  payload: any;
};
