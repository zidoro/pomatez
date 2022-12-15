import { CounterContext } from "contexts";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { AppStateTypes } from "store";
import { StyledTimer } from "styles";
import Control from "./Control";
import Counter from "./Counter";
import PriorityCard from "./PriorityCard";

export default () => {
  const compactMode = useSelector(
    (state: AppStateTypes) => state.settings.compactMode
  );
  const { resetTimerAction } = useContext(CounterContext);

  const onResetCallback = useCallback(() => {
    if (resetTimerAction) resetTimerAction();
  }, [resetTimerAction]);

  return (
    <StyledTimer className={compactMode ? "compact" : ""}>
      <Counter />
      {compactMode ? null : <PriorityCard />}
      <Control resetTimerAction={onResetCallback} />
    </StyledTimer>
  );
};
