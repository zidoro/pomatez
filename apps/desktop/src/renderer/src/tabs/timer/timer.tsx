import {
  Counter,
  Priority,
  Control,
  VStack,
  keyframes,
  styled,
} from "@pomatez/ui";

const slideUpAndFade = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(1.2rem)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const StyledContainer = styled(VStack, {
  animation: `${slideUpAndFade} 160ms ease`,
});

export default function Timer() {
  return (
    <StyledContainer>
      <Counter />
      <Priority />
      <Control />
    </StyledContainer>
  );
}
