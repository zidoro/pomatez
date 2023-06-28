import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { configAtom, defaultConfig } from "./config.atom";
import { minutesToSeconds } from "@renderer/utils";

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

const durationAtom = atomWithStorage(
  "timer.duration",
  minutesToSeconds(defaultConfig.stayFocused)
);

const elapsedAtom = atomWithStorage("timer.elapsed", 0);

const counterAtom = atom<{
  id: NodeJS.Timeout;
  started: number;
} | null>(null);

const invokeTimerAction = atom(
  null,
  (get, set, action: "start" | "stop") => {
    const timer = get(timerAtom);

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
            set(counterAtom, null);
            set(timerAtom, {
              ...timer,
              isRunning: false,
            });
            set(elapsedAtom, 0);
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
      const timer = get(counterAtom);
      if (timer) {
        clearTimeout(timer.id);
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

  // return progress based on circle circumference
  return (elapsed / duration) * TIMER_PROGRESS_CIRCUMFERENCE;
});

export const toggleTimerAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);

  set(invokeTimerAction, timer.isRunning ? "stop" : "start");
  set(timerAtom, {
    ...timer,
    isRunning: !timer.isRunning,
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

  let newDuration = get(durationAtom);

  let newSessionType = timer.sessionType;
  let newSessionRound = timer.round;

  switch (timer.sessionType) {
    case "stayFocused":
      if (timer.round < config.sessionRounds) {
        newSessionType = "shortBreak";
        newDuration = minutesToSeconds(config.shortBreak);
      } else {
        newSessionType = "longBreak";
        newDuration = minutesToSeconds(config.longBreak);
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
      break;
  }

  set(elapsedAtom, 0);
  set(counterAtom, null);
  set(durationAtom, newDuration);
  set(timerAtom, {
    ...timer,
    round: newSessionRound,
    sessionType: newSessionType,
  });
});

export const resetRoundAtom = atom(null, (get, set) => {
  const timer = get(timerAtom);

  set(timerAtom, {
    ...timer,
    round: defaultTimer.round,
  });
});
