import { useAtom, useAtomValue } from "jotai";
import { Priority, Control, VStack } from "@pomatez/ui";

import { slideUpAndFadeAnimation } from "@renderer/utils";
import { CounterProgress } from "@renderer/components";
import {
  configAtom,
  settingsAtom,
  timerAtom,
} from "@renderer/@data/atoms";

export default function Timer() {
  const [settings, setSettings] = useAtom(settingsAtom);

  const [timer, setTimer] = useAtom(timerAtom);

  const config = useAtomValue(configAtom);

  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <CounterProgress />

      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

      <Control
        appState={timer.sessionType}
        session={{
          maxRounds: config.sessionRounds,
          currentRound: timer.sessionRound,
        }}
        isRunning={timer.isRunning}
        isMuted={settings.isMuted}
        isCompact={settings.isCompact}
        onPlayPause={() => {
          setTimer((prev) => ({
            ...prev,
            isRunning: !prev.isRunning,
          }));
        }}
        onToggleSound={() => {
          setSettings((prev) => ({
            ...prev,
            isMuted: !prev.isMuted,
          }));
        }}
        onToggleCompact={() => {
          setSettings((prev) => ({
            ...prev,
            isCompact: !prev.isCompact,
          }));
        }}
        onResetTimer={() => {
          setTimer((prev) => ({
            ...prev,
            elapsed: 0,
          }));
        }}
        onNextEvent={() => {}}
        onResetElapsed={() => {}}
      />
    </VStack>
  );
}
