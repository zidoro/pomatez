import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import { ConfigTypes } from "./types";
import { defaultConfig } from "./defaultConfig";

const config =
  (getFromStorage("state") && getFromStorage("state").config) ||
  defaultConfig;

const initialState: ConfigTypes = config;

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setStayFocus(
      state,
      action: PayloadAction<ConfigTypes["stayFocus"]>
    ) {
      state.stayFocus = action.payload;
    },
    setShorBreak(
      state,
      action: PayloadAction<ConfigTypes["shortBreak"]>
    ) {
      state.shortBreak = action.payload;
    },
    setLongBreak(
      state,
      action: PayloadAction<ConfigTypes["longBreak"]>
    ) {
      state.longBreak = action.payload;
    },
    setSessionRounds(
      state,
      action: PayloadAction<ConfigTypes["sessionRounds"]>
    ) {
      state.sessionRounds = action.payload;
    },
    restoreDefaultConfig() {
      return defaultConfig;
    },
    setFirstSpecialBreak(
      state,
      action: PayloadAction<ConfigTypes["specialBreaks"]["firstBreak"]>
    ) {
      state.specialBreaks.firstBreak = action.payload;
    },
    setSecondSpecialBreak(
      state,
      action: PayloadAction<ConfigTypes["specialBreaks"]["secondBreak"]>
    ) {
      state.specialBreaks.secondBreak = action.payload;
    },
    setThirdSpecialBreak(
      state,
      action: PayloadAction<ConfigTypes["specialBreaks"]["thirdBreak"]>
    ) {
      state.specialBreaks.thirdBreak = action.payload;
    },
    setFourthSpecialBreak(
      state,
      action: PayloadAction<ConfigTypes["specialBreaks"]["fourthBreak"]>
    ) {
      state.specialBreaks.fourthBreak = action.payload;
    },
  },
});

export const {
  restoreDefaultConfig,
  setFourthSpecialBreak,
  setLongBreak,
  setSecondSpecialBreak,
  setSessionRounds,
  setShorBreak,
  setStayFocus,
  setThirdSpecialBreak,
  setFirstSpecialBreak,
} = configSlice.actions;

export default configSlice.reducer;
