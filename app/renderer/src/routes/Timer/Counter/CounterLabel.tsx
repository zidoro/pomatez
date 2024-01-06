import React from "react";
import { TimerStatus } from "store/timer/types";
import { StyledCounterLabel } from "styles";

type Props = {
  timerType?: TimerStatus;
};

const CounterLabel: React.FC<Props> = ({ timerType }) => {
  return (
    <StyledCounterLabel>
      {(timerType === TimerStatus.SHORT_BREAK && "Short Break") ||
        (timerType === TimerStatus.LONG_BREAK && "Long Break") ||
        (timerType === TimerStatus.SHORT_BREAK && "Special Break") ||
        "Stay Focused"}
    </StyledCounterLabel>
  );
};

export default React.memo(CounterLabel);
