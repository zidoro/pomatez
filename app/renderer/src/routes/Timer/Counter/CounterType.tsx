import React from "react";
import { TimerTypes } from "store";
import { StyledCounterType } from "styles";
import { SVG } from "components";

type Props = {
  timerType?: TimerTypes["timerType"];
};

const CounterType: React.FC<Props> = ({ timerType }) => {
  return (
    <StyledCounterType>
      {(timerType === "SHORT_BREAK" && <SVG name="headset" />) ||
        (timerType === "LONG_BREAK" && <SVG name="cafe" />) ||
        (timerType === "SPECIAL_BREAK" && <SVG name="fast-food" />) || (
          <SVG name="bonfire" />
        )}
    </StyledCounterType>
  );
};

export default React.memo(CounterType);
