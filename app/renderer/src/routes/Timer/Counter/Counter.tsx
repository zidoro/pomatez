import { CounterContext } from "contexts";
import { useTime } from "hooks";
import React, { useContext } from "react";
import { useAppSelector } from "hooks/storeHooks";
import {
  StyledCounterContainer,
  StyledCounterProgress,
  StyledCounterWrapper,
} from "styles";
import CounterLabel from "./CounterLabel";
import CounterTimer from "./CounterTimer";
import CounterType from "./CounterType";

const Counter: React.FC = () => {
  const settings = useAppSelector((state) => state.settings);

  const { count, duration, timerType, shouldFullscreen } =
    useContext(CounterContext);

  const dashOffset = (duration - count) * (674 / duration);

  const { hours, minutes, seconds } = useTime(count);

  if (settings.compactMode) {
    return (
      <StyledCounterContainer
        className="compact"
        fullscreen={shouldFullscreen}
      >
        {shouldFullscreen ? (
          <>
            <StyledCounterProgress
              offset={dashOffset}
              type={timerType}
              animate={
                settings.enableProgressAnimation ? "true" : "false"
              }
            />
            <StyledCounterWrapper>
              <CounterType timerType={timerType} />
              <CounterTimer
                compact
                fullscreen={shouldFullscreen}
                timerType={timerType}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
              />
              <CounterLabel timerType={timerType} />
            </StyledCounterWrapper>
          </>
        ) : (
          <CounterTimer
            compact
            timerType={timerType}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        )}
      </StyledCounterContainer>
    );
  }

  return (
    <StyledCounterContainer fullscreen={shouldFullscreen}>
      <StyledCounterProgress
        offset={dashOffset}
        type={timerType}
        animate={settings.enableProgressAnimation ? "true" : "false"}
      />

      <StyledCounterWrapper>
        <CounterType timerType={timerType} />

        <CounterTimer
          hours={hours}
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
