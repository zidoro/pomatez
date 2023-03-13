import { useActor } from "@xstate/react";
import { Counter, Priority, Control, VStack } from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";
import { useAppMachine } from "@renderer/contexts";

export default function Timer() {
  const machineActor = useAppMachine();

  const [state, send] = useActor(machineActor);

  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <Counter />

      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

      <Control
        isPlaying={state.matches("timer.playing")}
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
      />
    </VStack>
  );
}
