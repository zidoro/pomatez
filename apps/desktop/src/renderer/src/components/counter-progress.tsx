import { useAtomValue } from "jotai";
import { Counter } from "@pomatez/ui";
import {
  settingsAtom,
  timeProgressAtom,
  timerAtom,
  timeRemainingAtom,
} from "@renderer/@data/atoms";

export function CounterProgress() {
  const timeRemaining = useAtomValue(timeRemainingAtom);
  const timeProgress = useAtomValue(timeProgressAtom);
  const timer = useAtomValue(timerAtom);

  const settings = useAtomValue(settingsAtom);

  return (
    <Counter
      appState={timer.sessionType}
      timeProgress={timeProgress}
      timeRemaining={timeRemaining}
      animationEnabled={settings.progressAnimation}
    />
  );
}
