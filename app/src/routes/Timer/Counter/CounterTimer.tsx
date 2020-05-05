import React from "react";
import { TimerTypes } from "store";
import { StyledCounterTimer } from "styles";
import { padNum } from "utils";

type Props = {
  timerType?: TimerTypes["timerType"];
  minutes: number;
  seconds: number;
};

const CounterTimer: React.FC<Props> = ({ timerType, minutes, seconds }) => {
  return (
    <StyledCounterTimer type={timerType}>
      <span>{padNum(minutes)}</span>
      <span>:</span>
      <span>{padNum(seconds)}</span>
    </StyledCounterTimer>
  );
};

export default React.memo(CounterTimer);
