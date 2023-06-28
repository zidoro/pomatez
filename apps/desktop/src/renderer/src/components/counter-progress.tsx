import { useAtomValue } from "jotai";
import { Counter } from "@pomatez/ui";
import {
  timeProgressAtom,
  timerAtom,
  timeRemainingAtom,
} from "@renderer/@data/atoms";

export function CounterProgress() {
  const timeRemaining = useAtomValue(timeRemainingAtom);
  const timeProgress = useAtomValue(timeProgressAtom);
  const timer = useAtomValue(timerAtom);

  return (
    <Counter
      appState={timer.sessionType}
      timeProgress={timeProgress}
      timeRemaining={timeRemaining}
    />
  );
}
