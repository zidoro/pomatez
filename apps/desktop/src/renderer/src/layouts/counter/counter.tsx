import { Icon } from "@renderer/components";
import {
  StyledCounter,
  StyledCounterWrapper,
  StyledCounterIcon,
  StyledCounterProgress,
  StyledCounterTimer,
  StyledCounterType,
} from "./counter.styled";

export function Counter() {
  return (
    <StyledCounter>
      <StyledCounterProgress id="progress-svg" />

      <StyledCounterWrapper>
        <StyledCounterIcon>
          <Icon name="laptop" />
        </StyledCounterIcon>

        <StyledCounterTimer>
          <span>25</span>
          <span>:</span>
          <span>00</span>
        </StyledCounterTimer>

        <StyledCounterType>Stay Focused</StyledCounterType>
      </StyledCounterWrapper>
    </StyledCounter>
  );
}
