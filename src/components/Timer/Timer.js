import React, { useContext, useEffect } from "react";
import {
  StoreContext,
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_TIMER_TYPE,
  SET_ROUND,
  SET_FULL_SCREEN
} from "../../models";

import icon from "../../assets/electron.png";

import { CountDown, Progress } from "./elements";
import { WORK, SHORT_BREAK, LONG_BREAK } from "../_helpers";

const { remote } = window.require("electron");

function Timer() {
  const [{ workingTime, shortBreak, longBreak, sessionRounds }] = useContext(
    StoreContext
  ).config;
  const [{ running, silent, fullScreen }, dispatchControl] = useContext(
    StoreContext
  ).control;

  const [
    { timerType, duration, counter, dashOffset, finalDashOffset, round },
    dispatchTimer
  ] = useContext(StoreContext).timer;

  const [{ notify, darkMode, fullScreenOnBreak }] = useContext(
    StoreContext
  ).setting;

  useEffect(() => {
    let win = remote.getCurrentWindow();
    win.setFullScreen(fullScreen);

    if (fullScreenOnBreak) {
      dispatchControl({
        type: SET_FULL_SCREEN,
        payload: timerType === SHORT_BREAK || timerType === LONG_BREAK
      });
    }
  }, [dispatchControl, timerType, fullScreen, fullScreenOnBreak]);

  useEffect(() => {
    switch (timerType) {
      case WORK:
        dispatchTimer({
          type: SET_TIMER_TYPE,
          payload: WORK
        });

        dispatchTimer({
          type: SET_DURATION,
          payload: workingTime * 60
        });

        dispatchTimer({
          type: SET_COUNTER,
          payload: workingTime * 60
        });
        break;

      case SHORT_BREAK:
        dispatchTimer({
          type: SET_TIMER_TYPE,
          payload: SHORT_BREAK
        });

        dispatchTimer({
          type: SET_DURATION,
          payload: shortBreak * 60
        });

        dispatchTimer({
          type: SET_COUNTER,
          payload: shortBreak * 60
        });
        break;

      case LONG_BREAK:
        dispatchTimer({
          type: SET_TIMER_TYPE,
          payload: LONG_BREAK
        });

        dispatchTimer({
          type: SET_DURATION,
          payload: longBreak * 60
        });

        dispatchTimer({
          type: SET_COUNTER,
          payload: longBreak * 60
        });

        dispatchTimer({
          type: SET_ROUND,
          payload: 0
        });
        break;

      default:
        return null;
    }
  }, [dispatchTimer, timerType, workingTime, shortBreak, longBreak]);

  useEffect(() => {
    function setNotification(title, body) {
      if (notify) {
        new window.Notification(title, {
          body,
          icon,
          silent
        });
      }
    }

    let count = counter;
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        if (count <= 0) {
          count = 0;
          clearInterval(interval);

          switch (timerType) {
            case WORK:
              if (round !== sessionRounds) {
                dispatchTimer({
                  type: SET_TIMER_TYPE,
                  payload: SHORT_BREAK
                });

                setNotification(
                  "Work Time Finished",
                  "It's time for you to take a short break"
                );
              } else {
                dispatchTimer({
                  type: SET_TIMER_TYPE,
                  payload: LONG_BREAK
                });

                setNotification(
                  "Session Rounds Completed",
                  "It's time to take long break now"
                );
              }
              break;

            case SHORT_BREAK:
              dispatchTimer({
                type: SET_ROUND,
                payload: round + 1
              });

              dispatchTimer({
                type: SET_TIMER_TYPE,
                payload: WORK
              });

              setNotification(
                "Short Break Finished",
                "It's time to focus and work again"
              );
              break;

            case LONG_BREAK:
              dispatchTimer({
                type: SET_TIMER_TYPE,
                payload: WORK
              });

              dispatchTimer({
                type: SET_ROUND,
                payload: round + 1
              });

              setNotification(
                "Long Break Finished",
                "It's time to go back to work"
              );
              break;
            default:
              return null;
          }
        } else {
          count--;
          dispatchTimer({ type: SET_COUNTER, payload: count });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    dispatchTimer,
    counter,
    running,
    dispatchControl,
    duration,
    silent,
    notify,
    workingTime,
    shortBreak,
    longBreak,
    sessionRounds,
    round,
    timerType
  ]);

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
        <Progress
          dashOffset={dashOffset}
          timerType={timerType}
          darkMode={darkMode}
        />
        <CountDown counter={counter} timerType={timerType} />
      </div>
    </div>
  );
}

export default Timer;
