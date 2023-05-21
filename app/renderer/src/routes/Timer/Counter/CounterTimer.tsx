import React from "react";
import { TimerTypes } from "store";
import { StyledCounterTimer } from "styles";

type Props = {
  timerType?: TimerTypes["timerType"];
  hours: string;
  minutes: string;
  seconds: string;
  compact?: boolean;
  fullscreen?: boolean;
};

const CounterTimer: React.FC<Props> = ({
  timerType,
  hours,
  minutes,
  seconds,
  compact,
  fullscreen,
}) => {
  return (
    <StyledCounterTimer
      hours={hours}
      type={timerType}
      className={compact ? "compact" : ""}
      fullscreen={fullscreen}
    >
      {Number(hours) > 0 && (
        <>
          <span>{hours}</span>
          <span>:</span>
        </>
      )}
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </StyledCounterTimer>
  );
};

export default React.memo(CounterTimer);
