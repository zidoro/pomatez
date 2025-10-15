import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";

export type UpdateTypes = {
  updateVersion: string;
  updateBody: string | undefined;
};

type UploadPayload<T extends keyof UpdateTypes> = PayloadAction<
  UpdateTypes[T]
>;

const defaultUpdateStatus: Readonly<UpdateTypes> = Object.freeze({
  updateBody: undefined,
  updateVersion: "",
});

const updateStatus =
  (getFromStorage("state") && getFromStorage("state").update) ||
  defaultUpdateStatus;

const initialState: UpdateTypes = updateStatus;

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdateBody(state, action: UploadPayload<"updateBody">) {
      state.updateBody = action.payload;
    },

    setUpdateVersion(state, action: UploadPayload<"updateVersion">) {
      state.updateVersion = action.payload;
    },
  },
});

export const { setUpdateBody, setUpdateVersion } = updateSlice.actions;

export default updateSlice.reducer;
