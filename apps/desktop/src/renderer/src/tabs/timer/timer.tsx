import { useActor } from "@xstate/react";
import { Priority, Control, VStack } from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";
import { useAppMachine, useSyncData } from "@renderer/contexts";
import { CounterProgress } from "@renderer/components";

export default function Timer() {
  const machineActor = useAppMachine();

  const [state, send] = useActor(machineActor);

  const { config, timer } = useSyncData();

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
        isRunning={state.matches("timer.running")} // TODO: Sync this states
        isMuted={state.matches("sound.speakerOff")} // TODO: Sync this states
        isCompact={state.matches("mode.compact")} // TODO: Sync this states
        onPlayPause={() => {
          send("timer.toggle");
        }}
        onToggleSound={() => {
          send("sound.toggle");
        }}
        onToggleCompact={() => {
          send("mode.toggle");
        }}
        onResetTimer={() => {
          send("timer.reset");
        }}
        onNextEvent={() => {
          send("session.next");
        }}
        onResetElapsed={() => {
          send("session.reset");
        }}
      />
    </VStack>
  );
}
