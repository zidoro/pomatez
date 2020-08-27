import React from "react";
import { TimerTypes } from "store";
import { StyledCounterLabel } from "styles";

type Props = {
  timerType?: TimerTypes["timerType"];
};

const CounterLabel: React.FC<Props> = ({ timerType }) => {
  return (
    <StyledCounterLabel>
      {(timerType === "SHORT_BREAK" && "Short Break") ||
        (timerType === "LONG_BREAK" && "Long Break") ||
        (timerType === "SPECIAL_BREAK" && "Special Break") ||
        "Stay Focused"}
    </StyledCounterLabel>
  );
};

export default React.memo(CounterLabel);
