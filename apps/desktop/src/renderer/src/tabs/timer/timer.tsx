import { Priority, Control, VStack } from "@pomatez/ui";
import { useAppMachine, useSyncData } from "@renderer/hooks";
import { slideUpAndFadeAnimation } from "@renderer/utils";
import { CounterProgress } from "@renderer/components";

export default function Timer() {
  const machineActor = useAppMachine();

  const { config, settings, timer } = useSyncData();

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
          machineActor.send("timer.toggle");
        }}
        onToggleSound={() => {
          machineActor.send("sound.toggle");
        }}
        onToggleCompact={() => {
          machineActor.send("mode.toggle");
        }}
        onResetTimer={() => {
          machineActor.send("timer.reset");
        }}
        onNextEvent={() => {
          machineActor.send("session.next");
        }}
        onResetElapsed={() => {
          machineActor.send("session.reset");
        }}
      />
    </VStack>
  );
}
