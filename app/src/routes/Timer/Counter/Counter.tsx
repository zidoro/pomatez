import React, { useContext, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CounterContext, ElectronContext } from "contexts";
import {
  StyledCounterContainer,
  StyledCounterWrapper,
  StyledCounterProgress,
} from "styles";

import CounterType from "./CounterType";
import CounterLabel from "./CounterLabel";
import CounterTimer from "./CounterTimer";
import { AppStateTypes } from "store";

const Counter: React.FC = () => {
  const onStrictMode = useSelector(
    (state: AppStateTypes) => state.settings.enableStrictMode
  );

  const { shouldFullscreenCallback } = useContext(ElectronContext);

  const { count, duration, timerType } = useContext(CounterContext);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  const dashOffset = (duration - count) * (674 / duration);

  const shouldFullscreen = useCallback(() => {
    if (onStrictMode) {
      switch (timerType) {
        case "SHORT_BREAK":
          return true;
        case "LONG_BREAK":
          return true;
        case "SPECIAL_BREAK":
          return true;
        default:
          return false;
      }
    }
    return false;
  }, [onStrictMode, timerType]);

  useEffect(() => {
    if (shouldFullscreenCallback) {
      shouldFullscreenCallback(shouldFullscreen());
    }
  }, [shouldFullscreen, shouldFullscreenCallback]);

  return (
    <StyledCounterContainer fullscreen={shouldFullscreen()}>
      <StyledCounterProgress offset={dashOffset} type={timerType} />

      <StyledCounterWrapper>
        <CounterType timerType={timerType} />

        <CounterTimer
          timerType={timerType}
          minutes={minutes}
          seconds={seconds}
        />

        <CounterLabel timerType={timerType} />
      </StyledCounterWrapper>
    </StyledCounterContainer>
  );
};

export default React.memo(Counter);
