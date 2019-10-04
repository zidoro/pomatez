import React, { useContext, useEffect } from "react";
import {
  StoreContext,
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_RUNNING
} from "../../models";
import { CountDown, Progress } from "./elements";
import AppIcon from "../../assets/electron.png";

function Timer() {
  const [{ workingTime }] = useContext(StoreContext).config;
  const [{ running, silent }, dispatchControl] = useContext(
    StoreContext
  ).control;

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

    if (running) {
      interval = setInterval(() => {
        if (count <= 0) {
          count = 0;
          clearInterval(interval);
          dispatchTimer({ type: SET_COUNTER, payload: duration });
          dispatchControl({ type: SET_RUNNING, payload: false });

          const notification = {
            title: "Work Time Finished",
            body: "It's time for you to take a short break",
            icon: AppIcon,
            silent: silent
          };

          new window.Notification(notification.title, notification);
        } else {
          count--;
          dispatchTimer({ type: SET_COUNTER, payload: count });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [dispatchTimer, counter, running, dispatchControl, duration, silent]);

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
        <CountDown counter={counter} timerType="Work" />
      </div>
    </div>
  );
}

export default Timer;
