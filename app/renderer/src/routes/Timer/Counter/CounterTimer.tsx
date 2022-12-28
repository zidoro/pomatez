import React from "react";
import { TimerTypes } from "store";
import { StyledCounterTimer } from "styles";

type Props = {
  timerType?: TimerTypes["timerType"];
  minutes: string;
  seconds: string;
  compact?: boolean;
  fullscreen?: boolean;
};

const CounterTimer: React.FC<Props> = ({
  timerType,
  minutes,
  seconds,
  compact,
  fullscreen,
}) => {
  return (
    <StyledCounterTimer
      type={timerType}
      className={compact ? "compact" : ""}
      fullscreen={fullscreen}
    >
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </StyledCounterTimer>
  );
};

export default React.memo(CounterTimer);
