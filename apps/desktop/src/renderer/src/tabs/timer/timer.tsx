import { Priority, Control, VStack } from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";
import { CounterProgress } from "@renderer/components";
import { useAppMachine } from "@renderer/hooks";

export default function Timer() {
  const [
    {
      context: { config, settings, timer },
    },
    send,
  ] = useAppMachine();

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
