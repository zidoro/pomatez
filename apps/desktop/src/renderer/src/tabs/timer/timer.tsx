import { Counter, Priority, Control, VStack } from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";

export default function Timer() {
  return (
    <VStack sx={slideUpAndFadeAnimation}>
      <Counter />
      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      <Control />
    </VStack>
  );
}
