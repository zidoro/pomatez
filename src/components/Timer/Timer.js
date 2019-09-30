import React, { useContext, useEffect } from "react";
import {
  StoreContext,
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_PLAYING
} from "../../models";
import { CountDown, Progress } from "./elements";

function Timer() {
  const [{ workingTime }] = useContext(StoreContext).config;
  const [{ isPlaying }, dispatchControl] = useContext(StoreContext).control;

  const [
    { duration, counter, dashOffset, finalDashOffset },
    dispatchTimer
  ] = useContext(StoreContext).timer;

  useEffect(() => {
    dispatchTimer({ type: SET_DURATION, payload: workingTime * 60 });
    dispatchTimer({ type: SET_COUNTER, payload: workingTime * 60 });
  }, [dispatchTimer, workingTime]);

  useEffect(() => {
    let count = counter;
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        if (count <= 0) {
          count = 0;
          clearInterval(interval);
          dispatchTimer({ type: SET_COUNTER, payload: count });
          dispatchControl({ type: SET_PLAYING, payload: false });
        } else {
          count--;
          dispatchTimer({ type: SET_COUNTER, payload: count });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [dispatchTimer, counter, isPlaying, dispatchControl]);

  useEffect(
    () =>
      dispatchTimer({
        type: SET_DASH_OFFSET,
        payload: (duration - counter) * (finalDashOffset / duration)
      }),
    [dispatchTimer, duration, counter, finalDashOffset]
  );

  return (
    <div className="timer">
      <div className="timer__counter">
        <Progress dashOffset={dashOffset} />
        <CountDown counter={counter} timerType="Running" />
      </div>
    </div>
  );
}

export default Timer;
