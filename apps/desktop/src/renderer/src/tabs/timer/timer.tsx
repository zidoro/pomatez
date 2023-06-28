import { useAtomValue, useSetAtom } from "jotai";
import { Priority, Control, VStack } from "@pomatez/ui";

import { slideUpAndFadeAnimation } from "@renderer/utils";
import { CounterProgress } from "@renderer/components";
import {
  configAtom,
  nextSessionAtom,
  resetRoundAtom,
  resetTimerAtom,
  settingsAtom,
  timerAtom,
  toggleCompactAtom,
  toggleSoundAtom,
  toggleTimerAtom,
} from "@renderer/@data/atoms";

export default function Timer() {
  const toggleTimer = useSetAtom(toggleTimerAtom);
  const nextSession = useSetAtom(nextSessionAtom);
  const resetTimer = useSetAtom(resetTimerAtom);
  const resetRound = useSetAtom(resetRoundAtom);

  const toggleSound = useSetAtom(toggleSoundAtom);
  const toggleCompact = useSetAtom(toggleCompactAtom);

  const settings = useAtomValue(settingsAtom);
  const config = useAtomValue(configAtom);
  const timer = useAtomValue(timerAtom);

  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <CounterProgress />

      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

      <Control
        appState={timer.sessionType}
        session={{
          maxRounds: config.sessionRounds,
          currentRound: timer.round,
        }}
        isCompact={settings.isCompact}
        isRunning={timer.isRunning}
        isMuted={settings.isMuted}
        onPlayPause={toggleTimer}
        onResetTimer={resetTimer}
        onNextEvent={nextSession}
        onResetRound={resetRound}
        onToggleSound={toggleSound}
        onToggleCompact={toggleCompact}
      />
    </VStack>
  );
}
