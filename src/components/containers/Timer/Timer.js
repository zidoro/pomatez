import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { currentWindow } from "window-electron";

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
} from "../../../models";
import { CountDown, Progress } from "./elements";
import { WORK, SHORT_BREAK, LONG_BREAK, addClass } from "../../../helpers";

import notificationBell from "../../../assets/bell/notification-bell.wav";

import workTimeFinished from "../../../assets/voices/work-time-finished.wav";
import shortBreakFinished from "../../../assets/voices/short-break-finished.wav";
import longBreakFinished from "../../../assets/voices/long-break-finished.wav";
import sessionRoundsCompleted from "../../../assets/voices/session-rounds-completed.wav";
import thirtySecondsLeftToWork from "../../../assets/voices/30-seconds-left-to-work.wav";
import sixtySecondsLeftForShorBreak from "../../../assets/voices/60-seconds-left-for-shortbreak.wav";
import sixtySecondsLeftForLongBreak from "../../../assets/voices/60-seconds-left-for-longbreak.wav";

import icon from "../../../assets/icons/48x48.png";

function Timer() {
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
    ({ title, body, audioFile }) => {
      const bellSound = new Audio(notificationBell);
      if (notify) {
        let notification = new window.Notification(title, {
          body,
          icon,
          silent: true
        });

        if (!silent) bellSound.play();

        notification.addEventListener("click", () => {
          if (!currentWindow.isVisible()) {
            currentWindow.show();
          }
        });
        if (!silent) {
          const speechSound = new Audio(audioFile);
          setTimeout(() => speechSound.play(), 1000);
        }
      }
    },
    [notify, silent]
  );

  useEffect(() => {
    if (fullScreen) {
      currentWindow.setFullScreen(true);
      currentWindow.setSkipTaskbar(true);
      currentWindow.setVisibleOnAllWorkspaces(true);
      currentWindow.setAlwaysOnTop(true, "screen-saver");
      setTimeout(() => currentWindow.show(), 500);
    } else if (!fullScreen && !currentWindow.isVisible()) {
      if (timerType === SHORT_BREAK || timerType === LONG_BREAK) {
        currentWindow.setVisibleOnAllWorkspaces(true);
        currentWindow.show();
      }
    } else {
      currentWindow.setFullScreen(false);
      currentWindow.setSkipTaskbar(false);
      currentWindow.setVisibleOnAllWorkspaces(false);
      currentWindow.setAlwaysOnTop(onTop, "screen-saver");
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
            setNotification({
              title: "60 Seconds Left for Short Break",
              body:
                "Please prepare yourself to get back to work. Do your task and focus again.",
              audioFile: sixtySecondsLeftForShorBreak
            });
          } else if (timerType === LONG_BREAK) {
            setNotification({
              title: "60 Seconds Left for Long Break",
              body:
                "Please prepare yourself to get back to work. Relax, focus and continue doing your task.",
              audioFile: sixtySecondsLeftForLongBreak
            });
          }
        }

        if (count === 31) {
          if (timerType === WORK) {
            if (!currentWindow.isVisible()) currentWindow.show();
            setNotification({
              title: "30 Seconds Left to Work",
              body:
                "Please finalize your task. Paused all media playing if there's one.",
              audioFile: thirtySecondsLeftToWork
            });
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

                setNotification({
                  title: "Work Time Finished",
                  body: "It is time to take a short break.",
                  audioFile: workTimeFinished
                });
              } else {
                dispatchTimer({
                  type: SET_TIMER_TYPE,
                  payload: LONG_BREAK
                });

                setNotification({
                  title: "Session Rounds Completed",
                  body: "It is time to take long break now.",
                  audioFile: sessionRoundsCompleted
                });
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

              setNotification({
                title: "Short Break Finished",
                body: "It is time to focus and work again.",
                audioFile: shortBreakFinished
              });
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

              setNotification({
                title: "Long Break Finished",
                body: "It is time to go back in work.",
                audioFile: longBreakFinished
              });
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
