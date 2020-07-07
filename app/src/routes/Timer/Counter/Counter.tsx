import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { CounterContext } from "contexts";
import { AppStateTypes, SettingTypes } from "store";
import { useTime } from "hooks";

import {
  StyledCounterContainer,
  StyledCounterWrapper,
  StyledCounterProgress,
} from "styles";

import CounterType from "./CounterType";
import CounterLabel from "./CounterLabel";
import CounterTimer from "./CounterTimer";

const Counter: React.FC = () => {
  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { count, duration, timerType, shouldFullscreen } = useContext(
    CounterContext
  );

  const dashOffset = (duration - count) * (674 / duration);

  const { minutes, seconds } = useTime(count);

  return (
    <StyledCounterContainer fullscreen={shouldFullscreen}>
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
