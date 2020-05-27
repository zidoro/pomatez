import React, { useContext, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CounterContext, ElectronContext } from "contexts";
import { AppStateTypes } from "store";

import {
  StyledCounterContainer,
  StyledCounterWrapper,
  StyledCounterProgress,
} from "styles";

import CounterType from "./CounterType";
import CounterLabel from "./CounterLabel";
import CounterTimer from "./CounterTimer";

const Counter: React.FC = () => {
  const settings = useSelector((state: AppStateTypes) => state.settings);

  const { shouldFullscreenCallback } = useContext(ElectronContext);

  const { count, duration, timerType } = useContext(CounterContext);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  const dashOffset = (duration - count) * (674 / duration);

  const shouldFullscreen = useCallback(() => {
    if (settings.enableStrictMode) {
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
  }, [settings.enableStrictMode, timerType]);

  useEffect(() => {
    if (shouldFullscreenCallback) {
      shouldFullscreenCallback(shouldFullscreen());
    }
  }, [shouldFullscreen, shouldFullscreenCallback]);

  return (
    <StyledCounterContainer fullscreen={shouldFullscreen()}>
      <StyledCounterProgress
        offset={dashOffset}
        type={timerType}
        animate={settings.enableTimerAnimation ? "true" : "false"}
      />

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
