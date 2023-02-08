import { Controller, Counter, PriorityCard } from "@renderer/layouts";
import { StyledTimer } from "./timer.styled";

export default function Timer() {
  return (
    <StyledTimer>
      <Counter />
      <PriorityCard />
      <Controller />
    </StyledTimer>
  );
}
