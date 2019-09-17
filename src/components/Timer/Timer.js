import React, { useContext, useEffect } from "react";
import { StoreContext, SET_DURATION, SET_COUNTDOWN } from "../../models";
import { CountDown, Progress } from "./elements";

function Timer() {
  const [{ duration, countDown, dashOffset }, dispatch] = useContext(
    StoreContext
  ).timer;

  useEffect(() => {
    dispatch({ type: SET_DURATION, payload: 5 });
    dispatch({ type: SET_COUNTDOWN, payload: duration });
  }, [dispatch, duration]);

  return (
    <div className="timer">
      <div className="timer__counter">
        <Progress dashOffset={dashOffset} />
        <CountDown duration={countDown} timerType="Work" />
      </div>
    </div>
  );
}

export default Timer;
