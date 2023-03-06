import {
  Counter,
  Priority,
  Control,
  VStack,
  styled,
} from "@pomatez/ui";
import { slideUpAndFadeAnimation } from "@renderer/utils";

const StyledContainer = styled(VStack, slideUpAndFadeAnimation);

export default function Timer() {
  return (
    <StyledContainer>
      <Counter />
      <Priority title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      <Control />
    </StyledContainer>
  );
}
