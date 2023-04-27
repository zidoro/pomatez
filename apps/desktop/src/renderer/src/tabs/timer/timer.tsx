import { useActor } from "@xstate/react";
import { Priority, Control, VStack } from "@pomatez/ui";
import {
  interpretState,
  slideUpAndFadeAnimation,
} from "@renderer/utils";
import { useAppMachine } from "@renderer/contexts";
import { CounterProgress } from "@renderer/components";

export default function Timer() {
  const machineActor = useAppMachine();

  const [state, send] = useActor(machineActor);

  const sessionState = interpretState(state.value).session;

  const config = state.context.config;

  const timer = state.context.timer;

  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <CounterProgress />

      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

      <Control
        appState={sessionState}
        session={{
          maxRounds: config.sessionRounds,
          currentRound: timer.sessionRound,
        }}
        isRunning={state.matches("timer.running")}
        isMuted={state.matches("sound.speakerOff")}
        isCompact={state.matches("mode.compact")}
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
