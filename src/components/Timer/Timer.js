import React, { useContext, useEffect } from "react";
import {
  StoreContext,
  SET_DURATION,
  SET_COUNTER,
  SET_DASH_OFFSET
} from "../../models";
import { CountDown, Progress } from "./elements";

function Timer() {
  const [{ workingTime }] = useContext(StoreContext).config;

  const [{ isPlaying }] = useContext(StoreContext).control;

  const [
    { duration, counter, dashOffset, finalDashOffset },
    dispatch
  ] = useContext(StoreContext).timer;

  useEffect(
    () =>
      dispatch({
        type: SET_DURATION,
        payload: workingTime
      }),
    [dispatch, workingTime]
  );

  useEffect(() => {
    let interval;
    let count = duration;
    dispatch({ type: SET_COUNTER, payload: count });
    if (isPlaying) {
      interval = setInterval(() => {
        if (count <= 0) {
          count = 0;
          clearInterval(interval);
          dispatch({ type: SET_COUNTER, payload: count });
        } else {
          count--;
          dispatch({ type: SET_COUNTER, payload: count });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [dispatch, duration, isPlaying]);

  useEffect(
    () =>
      dispatch({
        type: SET_DASH_OFFSET,
        payload: (duration - counter) * (finalDashOffset / duration)
      }),
    [dispatch, duration, counter, finalDashOffset]
  );

  return (
    <div className="timer">
      <div className="timer__counter">
        <Progress dashOffset={dashOffset} />
        <CountDown counter={counter} timerType="Work" />
      </div>
    </div>
  );
}

export default Timer;
