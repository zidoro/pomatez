import { Counter, TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { useAppMachineValue } from "@renderer/hooks";

export function CounterProgress() {
  const {
    context: { timer },
  } = useAppMachineValue();

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
