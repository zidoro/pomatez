import { CounterContext } from "contexts";
import React, { useCallback, useContext } from "react";
import { useAppSelector } from "hooks/storeHooks";
import { StyledTimer } from "styles";
import Control from "./Control";
import Counter from "./Counter";
import PriorityCard from "./PriorityCard";

export default function Timer() {
  const compactMode = useAppSelector(
    (state) => state.settings.compactMode
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
}
