import { ConfigTypes } from "./types";

export const defaultConfig: Readonly<ConfigTypes> = Object.freeze({
  stayFocus: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionRounds: 4,
  specialBreaks: {
    firstBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    secondBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    thirdBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
    fourthBreak: {
      fromTime: "",
      toTime: "",
      duration: 0,
    },
  },
});
