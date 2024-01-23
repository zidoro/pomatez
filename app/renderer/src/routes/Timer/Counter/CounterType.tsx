import React from "react";
import { TimerStatus } from "store/timer/types";
import { StyledCounterType } from "styles";
import { SVG } from "components";

type Props = {
  timerType?: TimerStatus;
};

const CounterType: React.FC<Props> = ({ timerType }) => {
  return (
    <StyledCounterType>
      {(timerType === TimerStatus.SHORT_BREAK && <SVG name="mug" />) ||
        (timerType === TimerStatus.LONG_BREAK && <SVG name="nap" />) ||
        (timerType === TimerStatus.SPECIAL_BREAK && (
          <SVG name="fast-food" />
        )) || <SVG name="laptop" />}
    </StyledCounterType>
  );
};

export default React.memo(CounterType);
