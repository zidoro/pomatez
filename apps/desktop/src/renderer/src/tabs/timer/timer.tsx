import { useActor } from "@xstate/react";
import {
  Counter,
  Priority,
  Control,
  VStack,
  CounterProps,
  TIMER_PROGRESS_CIRCUMFERENCE,
} from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";
import { useAppMachine } from "@renderer/contexts";

export default function Timer() {
  const machineActor = useAppMachine();

  const [state, send] = useActor(machineActor);

  const session = state.context.session;

  const config = state.context.config;

  const timer = state.context.timer;

  const sessionState = (
    state.value as {
      session: CounterProps["appState"];
    }
  ).session;

  const timeProgress =
    (timer.elapsed / timer.duration) * TIMER_PROGRESS_CIRCUMFERENCE;
  const timeRemaining = timer.duration - timer.elapsed;

  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <Counter
        appState={sessionState}
        timeProgress={timeProgress}
        timeRemaining={timeRemaining}
      />

      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

      <Control
        session={{
          maxRounds: config.sessionRounds,
          currentRound: session.round,
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
