import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { minutesToSeconds } from "@renderer/utils";
import { settingsAtom } from "./settings.atom";
import { configAtom } from "./config.atom";

type SessionType = "stayFocused" | "shortBreak" | "longBreak";

type TimerProps = {
  shouldFullScreenBreak: boolean;
  sessionType: SessionType;
  isRunning: boolean;
  round: number;
};

const defaultTimer: TimerProps = {
  shouldFullScreenBreak: false,
  sessionType: "stayFocused",
  isRunning: false,
  round: 1,
};

export const timerAtom = atomWithStorage("timer", defaultTimer);

// reset timer state on every onMount event
timerAtom.onMount = (set) => () => set(defaultTimer);

export const durationAtom = atomWithStorage("timer.duration", 0);

// calculate duration based on session type
durationAtom.read = (get) =>
  minutesToSeconds(get(configAtom)[get(timerAtom).sessionType]);

const elapsedAtom = atomWithStorage("timer.elapsed", 0);

const counterAtom = atom<{
  id: NodeJS.Timeout;
  started: number;
} | null>(null);

const invokeTimerAction = atom(
  null,
  (get, set, action: "start" | "stop") => {
    if (action === "start") {
      // if timer is already running, do nothing
      if (get(counterAtom) !== null) return;

      const tick = () => {
        const now = performance.now() / 1000;
        const counter = get(counterAtom);

        if (counter) {
          // update elapsed time
          set(elapsedAtom, now - counter.started);
        }

        const elapsedTime = get(elapsedAtom);

        // if time is up, reset timer
        if (elapsedTime >= get(durationAtom)) {
          setTimeout(() => {
            set(nextSessionAtom);
          }, 1000);
        } else {
          // otherwise, keep ticking
          set(counterAtom, {
            id: setTimeout(tick, 1000), // tick every second
            started: counter ? counter.started : now - elapsedTime,
          });
        }
      };
      tick(); // start ticking
    } else {
      const counter = get(counterAtom);
      if (counter) {
        clearTimeout(counter.id);
        set(counterAtom, null);
      }
    }
  }
);

export const timeRemainingAtom = atom((get) => {
  const duration = get(durationAtom);
  const elapsed = get(elapsedAtom);
  const remaining = duration - elapsed;

  // return time remaining in seconds
  return parseInt(remaining.toFixed());
});

export const timeProgressAtom = atom((get) => {
  const duration = get(durationAtom);
  const elapsed = get(elapsedAtom);
  const progress = elapsed / duration || 0;

  // return progress based on circle circumference
  return progress * TIMER_PROGRESS_CIRCUMFERENCE;
});

export const toggleTimerAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);
  const settings = get(settingsAtom);

  let shouldFullScreenBreak = false;

  if (
    !timer.isRunning &&
    timer.sessionType !== "stayFocused" &&
    settings.fullscreenBreak
  ) {
    shouldFullScreenBreak = true;
  }

  set(invokeTimerAction, timer.isRunning ? "stop" : "start");
  set(timerAtom, {
    ...timer,
    isRunning: !timer.isRunning,
    shouldFullScreenBreak,
  });
});

export const resetTimerAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);

  set(invokeTimerAction, "stop");
  set(timerAtom, {
    ...timer,
    isRunning: false,
  });
  set(elapsedAtom, 0);
});

export const nextSessionAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);
  const config = get(configAtom);
  const settings = get(settingsAtom);

  let newDuration = get(durationAtom);

  let newSessionType = timer.sessionType;
  let newSessionRound = timer.round;
  let shouldFullScreenBreak = false;
  let shouldAutoStart = false;

  switch (timer.sessionType) {
    case "stayFocused":
      if (timer.round < config.sessionRounds) {
        newSessionType = "shortBreak";
        newDuration = minutesToSeconds(config.shortBreak);
      } else {
        newSessionType = "longBreak";
        newDuration = minutesToSeconds(config.longBreak);
      }

      if (settings.autoStartBreak) {
        shouldAutoStart = true;

        if (settings.fullscreenBreak) {
          shouldFullScreenBreak = true;
        }
      }
      break;
    case "shortBreak":
    case "longBreak":
      newSessionType = "stayFocused";

      newSessionRound =
        timer.round < config.sessionRounds
          ? timer.round + 1
          : defaultTimer.round;
      newDuration = minutesToSeconds(config.stayFocused);

      if (settings.autoStartWork) {
        shouldAutoStart = true;
      }
      break;
    default:
      newSessionType = "stayFocused";
  }

  set(elapsedAtom, 0); // reset elapsed time first
  set(invokeTimerAction, "stop"); // stop timer to clear timeout
  set(durationAtom, newDuration); // update the duration
  set(timerAtom, {
    ...timer,
    round: newSessionRound,
    sessionType: newSessionType,
    isRunning: shouldAutoStart,
    shouldFullScreenBreak,
  });
  // start timer if auto start is enabled
  if (shouldAutoStart) {
    set(invokeTimerAction, "start");
  }
});

export const resetRoundAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);

  set(timerAtom, {
    ...timer,
    round: defaultTimer.round,
  });
});
