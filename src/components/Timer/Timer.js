import React, { useContext, useEffect } from "react";
import {
  StoreContext,
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_TIMER_TYPE,
  SET_ROUND,
  SET_FULL_SCREEN,
  SHOW_CONFIG
} from "../../models";

import icon from "../../assets/icons/48x48.png";

import { CountDown, Progress } from "./elements";
import { WORK, SHORT_BREAK, LONG_BREAK, addClass } from "../_helpers";

const { remote } = window.require("electron");

const say = window.require("say");

function Timer() {
  let win = remote.getCurrentWindow();

  const [{ showConfig }, dispatchNav] = useContext(StoreContext).nav;

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

  const [{ onTop, notify, darkMode, fullScreenOnBreak }] = useContext(
    StoreContext
  ).setting;

  useEffect(() => {
    if (fullScreen) {
      win.setFullScreen(true);
      win.setSkipTaskbar(true);
      win.setVisibleOnAllWorkspaces(true);
      win.setAlwaysOnTop(true, "screen-saver");
      setTimeout(() => win.show(), 500);
    } else if (!fullScreen && !win.isVisible()) {
      if (timerType === SHORT_BREAK || timerType === LONG_BREAK) {
        win.setVisibleOnAllWorkspaces(true);
        win.show();
      }
    } else {
      win.setFullScreen(false);
      win.setSkipTaskbar(false);
      win.setVisibleOnAllWorkspaces(false);
      win.setAlwaysOnTop(onTop, "screen-saver");
    }

    if (fullScreenOnBreak) {
      switch (timerType) {
        case WORK:
          dispatchControl({
            type: SET_FULL_SCREEN,
            payload: false
          });
          if (counter === 5 && showConfig) {
            dispatchNav({
              type: SHOW_CONFIG,
              payload: false
            });
          }
          break;
        case SHORT_BREAK:
          if (showConfig) {
            dispatchNav({
              type: SHOW_CONFIG,
              payload: false
            });
          }
          dispatchControl({
            type: SET_FULL_SCREEN,
            payload: true
          });
          break;
        case LONG_BREAK:
          if (showConfig) {
            dispatchNav({
              type: SHOW_CONFIG,
              payload: false
            });
          }
          dispatchControl({
            type: SET_FULL_SCREEN,
            payload: true
          });
          break;
        default:
          return null;
      }
    } else {
      if (timerType === WORK) {
        if (counter === 5 && showConfig) {
          dispatchNav({
            type: SHOW_CONFIG,
            payload: false
          });
        }
      }
    }
  }, [
    dispatchControl,
    timerType,
    fullScreen,
    fullScreenOnBreak,
    dispatchNav,
    showConfig,
    counter,
    onTop,
    win
  ]);

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
    function readMessage(title, body) {
      say.speak(`${title}, ${body}`);
    }

    function setNotification(title, body) {
      if (notify) {
        let notification = new window.Notification(title, {
          body,
          icon,
          silent
        });
        notification.addEventListener("click", () => {
          if (!win.isVisible()) {
            win.show();
          }
        });
        if (!silent) {
          readMessage(title, body);
        }
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
                  "It is time to take a short break."
                );
              } else {
                dispatchTimer({
                  type: SET_TIMER_TYPE,
                  payload: LONG_BREAK
                });

                setNotification(
                  "Session Rounds Completed",
                  "It is time to take long break now."
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
                "It is time to focus and work again."
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
                "It is time to go back in work."
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
    timerType,
    win
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
      <div
        className={`timer__counter ${fullScreen ? addClass(timerType) : ""}`}
      >
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
