import React, { useContext, useEffect } from "react";
import { StoreContext, SET_DURATION } from "../../models";
import { CountDown, Progress } from "./elements";

function Timer() {
  const [{ workingTime }] = useContext(StoreContext).config;

  const [{ duration, dashOffset }, dispatch] = useContext(StoreContext).timer;

  useEffect(
    () =>
      dispatch({
        type: SET_DURATION,
        payload: workingTime
      }),
    [dispatch, workingTime]
  );

  return (
    <div className="timer">
      <div className="timer__counter">
        <Progress dashOffset={dashOffset} />
        <CountDown duration={duration} timerType="Work" />
      </div>
    </div>
  );
}

export default Timer;
