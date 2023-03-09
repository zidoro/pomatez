import { createMachine } from "xstate";
import { Counter, Priority, Control, VStack } from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";

const timerMachine = createMachine({
  id: "timer",
  initial: "idle",
  context: {
    sessionRounds: 4,
    stayFocused: 25,
    shortBreak: 5,
    longBreak: 15,
    currentRound: 0,
    currentSession: "stayFocused",
    isPaused: false,
    isRunning: false,
    isFinished: false,
  },
  states: {
    idle: {
      on: {
        START: "stayFocused",
      },
    },
    stayFocused: {
      on: {
        SHORT_BREAK: "shortBreak",
        LONG_BREAK: "longBreak",
        FINISH: "finished",
      },
    },
    shortBreak: {
      on: {
        STAY_FOCUSED: "stayFocused",
        LONG_BREAK: "longBreak",
        FINISH: "finished",
      },
    },
    longBreak: {
      on: {
        STAY_FOCUSED: "stayFocused",
        SHORT_BREAK: "shortBreak",
        FINISH: "finished",
      },
    },
    finished: {
      type: "final",
    },
  },
});

export default function Timer() {
  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <Counter />
      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      <Control />
    </VStack>
  );
}
