import { Counter, TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { useSyncData } from "@renderer/contexts";

export function CounterProgress() {
  const { timer } = useSyncData();

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
