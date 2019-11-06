import React, { useContext, useEffect, useCallback, useMemo } from "react";
import {
  NavContext,
  ConfigContext,
  ControlContext,
  TimerContext,
  SettingContext,
  SET_DURATION,
  SET_DASH_OFFSET,
  SET_COUNTER,
  SET_TIMER_TYPE,
  SET_ROUND,
  SET_FULL_SCREEN,
  SHOW_CONFIG
} from "../../models";
import { CountDown, Progress } from "./elements";
import { WORK, SHORT_BREAK, LONG_BREAK, addClass } from "../_helpers";

import icon from "../../assets/icons/48x48.png";

const { remote } = window.require("electron");

const say = window.require("say");

function Timer() {
  let win = remote.getCurrentWindow();

  const [{ showConfig }, dispatchNav] = useContext(NavContext);

  const [{ workingTime, shortBreak, longBreak, sessionRounds }] = useContext(
    ConfigContext
  );

  const [{ running, silent }] = useContext(ControlContext);

  const [
    { timerType, duration, counter, dashOffset, finalDashOffset, round },
    dispatchTimer
  ] = useContext(TimerContext);

  const [
    { onTop, notify, darkMode, fullScreenOnBreak, fullScreen },
    dispatchSetting
  ] = useContext(SettingContext);

  const setNotification = useCallback(
    (title, body) => {
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
          say.speak(`${title}, ${body}`);
        }
      }
    },
    [notify, silent, win]
  );

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
          dispatchSetting({
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
          dispatchSetting({
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
          dispatchSetting({
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
    fullScreen,
    onTop,
    timerType,
    win,
    fullScreenOnBreak,
    dispatchNav,
    showConfig,
    counter,
    dispatchSetting
  ]);

  const setTimer = useCallback(() => {
    switch (timerType) {
      case WORK:
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

  useEffect(() => setTimer(), [setTimer]);

  useEffect(() => {
    let count = counter;
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        // Added 1sec due to delay showing notification
        if (count === 61) {
          if (timerType === SHORT_BREAK) {
            setNotification(
              "60 Seconds Left for Short Break",
              "Please prepare yourself to get back to work. Do your task and focus again."
            );
          } else if (timerType === LONG_BREAK) {
            setNotification(
              "60 Seconds Left for Long Break",
              "Please prepare yourself to get back to work. Relax, focus and continue doing your task."
            );
          }
        }

        if (count === 31) {
          if (timerType === WORK) {
            setNotification(
              "30 Seconds Left to Work",
              "Please finalize your task. Paused all media playing if there's one."
            );
          }
        }

        if (count <= 0) {
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
          clearInterval(interval);
          return;
        }
        count--;
        dispatchTimer({ type: SET_COUNTER, payload: count });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    dispatchTimer,
    counter,
    running,
    duration,
    silent,
    notify,
    workingTime,
    shortBreak,
    longBreak,
    sessionRounds,
    round,
    timerType,
    win,
    setNotification
  ]);

  useEffect(
    () =>
      dispatchTimer({
        type: SET_DASH_OFFSET,
        payload: (duration - counter) * (finalDashOffset / duration)
      }),
    [dispatchTimer, duration, counter, finalDashOffset]
  );

  return useMemo(() => {
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
  }, [counter, darkMode, dashOffset, fullScreen, timerType]);
}

export default Timer;
