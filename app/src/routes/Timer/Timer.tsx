import React, { useContext, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CounterContext } from "contexts";
import { StyledTimer } from "styles";

import Counter from "./Counter";
import TimerNote from "./TimerNote";
import Control from "./Control";

type Props = {} & RouteComponentProps;

const Timer: React.FC<Props> = () => {
  const { resetTimerAction } = useContext(CounterContext);

  const onResetCallback = useCallback(() => {
    if (resetTimerAction) resetTimerAction();
  }, [resetTimerAction]);

  return (
    <StyledTimer>
      <Counter />
      <TimerNote />
      <Control resetTimerAction={onResetCallback} />
    </StyledTimer>
  );
};

export default Timer;
