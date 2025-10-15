import { createSlice } from "@reduxjs/toolkit";
import { defaultTimer } from "./defaultTimer";
import { TimerPayload } from "./types";

const timerSlice = createSlice({
  name: "timer",
  initialState: defaultTimer,
  reducers: {
    setPlay(state, action: TimerPayload<"playing">) {
      state.playing = action.payload;
    },

    setTimerType(state, action: TimerPayload<"timerType">) {
      state.timerType = action.payload;
    },

    setRound(state, action: TimerPayload<"round">) {
      state.round = action.payload;
    },

    skipTimer(state, action: TimerPayload<"timerType">) {
      state.timerType = action.payload;
    },

    restartTimer() {
      return defaultTimer;
    },
  },
});

export const {
  setPlay,
  setTimerType,
  setRound,
  skipTimer,
  restartTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
