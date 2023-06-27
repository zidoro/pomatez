import { useAtomValue } from "jotai";
import { Counter, TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { timerAtom } from "@renderer/@data/atoms";

export function CounterProgress() {
  const timer = useAtomValue(timerAtom);

  const timeProgress =
    (timer.elapsed / timer.duration) * TIMER_PROGRESS_CIRCUMFERENCE;
  const timeRemaining = timer.duration - timer.elapsed;

  return (
    <Counter
      appState={timer.sessionType}
      timeProgress={timeProgress}
      timeRemaining={timeRemaining}
    />
  );
}
