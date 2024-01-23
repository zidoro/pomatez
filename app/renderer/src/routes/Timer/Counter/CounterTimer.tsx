import React from "react";
import { TimerStatus } from "store/timer/types";
import { StyledCounterTimer } from "styles";

type Props = {
  timerType?: TimerStatus;
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
          <span>{compact ? hours[hours.length - 1] : hours}</span>
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
