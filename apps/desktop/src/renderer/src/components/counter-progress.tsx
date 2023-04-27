import { useSelector } from "@xstate/react";
import { Counter, TIMER_PROGRESS_CIRCUMFERENCE } from "@pomatez/ui";
import { useAppMachine } from "@renderer/contexts";
import { interpretState } from "@renderer/utils";

export function CounterProgress() {
  const machineActor = useAppMachine();

  const state = useSelector(machineActor, (state) => state);

  const sessionState = interpretState(state.value).session;

  const timer = state.context.timer;

  const timeProgress =
    (timer.elapsed / timer.duration) * TIMER_PROGRESS_CIRCUMFERENCE;
  const timeRemaining = timer.duration - timer.elapsed;

  return (
    <Counter
      appState={sessionState}
      timeProgress={timeProgress}
      timeRemaining={timeRemaining}
    />
  );
}
