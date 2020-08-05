import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStayAwake from "use-stay-awake";
import {
  AppStateTypes,
  STAY_FOCUS,
  SHORT_BREAK,
  setRound,
  setTimerType,
  LONG_BREAK,
  TimerTypes,
  SPECIAL_BREAK,
  SettingTypes,
  setPlay,
} from "store";
import { useNotification } from "hooks";
import { padNum } from "utils";

import shortBreakStart from "assets/audios/short-break-start.wav";
import shortBreakFinished from "assets/audios/short-break-finished.wav";
import longBreakStart from "assets/audios/long-break-start.wav";
import longBreakFinished from "assets/audios/long-break-finished.wav";
import specialBreakStart from "assets/audios/special-break-start.wav";
import specialBreakFinished from "assets/audios/special-break-finished.wav";

import sixtySecondsLeftSpecialBreak from "assets/audios/sixty-seconds-left-special-break.wav";
import sixtySecondsLeftShortBreak from "assets/audios/sixty-seconds-left-short-break.wav";
import sixtySecondsLeftLongBreak from "assets/audios/sixty-seconds-left-long-break.wav";
import thirtySecondsLeftToWork from "assets/audios/thirty-seconds-left-to-work.wav";

import notificationIconDark from "assets/logos/notification-dark.png";

type CounterProps = {
  count: number;
  duration: number;
  timerType?: TimerTypes["timerType"];
  resetTimerAction?: () => void;
  shouldFullscreen?: boolean;
};

const CounterContext = React.createContext<CounterProps>({
  count: 0,
  duration: 0,
});

const CounterProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const { timer, config } = useSelector((state: AppStateTypes) => ({
    timer: state.timer,
    config: state.config,
  }));

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { preventSleeping, allowSleeping } = useStayAwake();

  const notification = useNotification(
    {
      icon: notificationIconDark,
      mute: !settings.notificationSoundOn,
    },
    settings.notificationProperty !== "none"
  );

  const [shouldFullscreen, setShouldFullscreen] = useState(false);

  const [count, setCount] = useState(config.stayFocus * 60);

  const [duration, setDuration] = useState(config.stayFocus * 60);

  const setTimerDuration = useCallback((time: number) => {
    setDuration(time * 60);
    setCount(time * 60);
  }, []);

  const resetTimerAction = useCallback(() => {
    switch (timer.timerType) {
      case STAY_FOCUS:
        setTimerDuration(config.stayFocus);
        break;
      case SHORT_BREAK:
        setTimerDuration(config.shortBreak);
        break;
      case LONG_BREAK:
        setTimerDuration(config.longBreak);
        break;
      case SPECIAL_BREAK:
        setDuration(duration);
        setCount(duration);
        break;
    }
  }, [
    config.longBreak,
    config.stayFocus,
    config.shortBreak,
    timer.timerType,
    duration,
    setDuration,
    setTimerDuration,
  ]);

  useEffect(() => {
    if (timer.playing && timer.timerType !== STAY_FOCUS) {
      preventSleeping();
    } else {
      allowSleeping();
    }
  }, [timer.playing, timer.timerType, preventSleeping, allowSleeping]);

  useEffect(() => {
    let interval: number;

    const {
      firstBreak,
      secondBreak,
      thirdBreak,
      fourthBreak,
    } = config.specialBreaks;

    if (timer.playing) {
      interval = setInterval(() => {
        const d = new Date();
        const ct = padNum(d.getHours()) + ":" + padNum(d.getMinutes());

        if (timer.timerType !== SPECIAL_BREAK) {
          switch (ct) {
            case firstBreak.fromTime:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(firstBreak.duration);
              notification(
                "Special Break",
                {
                  body:
                    "You can now do the things you really want to do at this moment.",
                },
                specialBreakStart
              );
              break;
            case secondBreak.fromTime:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(secondBreak.duration);
              notification(
                "Special Break",
                {
                  body:
                    "You can now do the things you really want to do at this moment.",
                },
                specialBreakStart
              );
              break;
            case thirdBreak.fromTime:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(thirdBreak.duration);
              notification(
                "Special Break",
                {
                  body:
                    "You can now do the things you really want to do at this moment.",
                },
                specialBreakStart
              );
              break;
            case fourthBreak.fromTime:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(fourthBreak.duration);
              notification(
                "Special Break",
                {
                  body:
                    "You can now do the things you really want to do at this moment.",
                },
                specialBreakStart
              );
              break;
            default:
              return;
          }
        } else {
          return clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    config.specialBreaks,
    timer.timerType,
    timer.playing,
    dispatch,
    notification,
    setTimerDuration,
  ]);

  useEffect(() => {
    switch (timer.timerType) {
      case STAY_FOCUS:
        setTimerDuration(config.stayFocus);
        break;
      case SHORT_BREAK:
        setTimerDuration(config.shortBreak);
        break;
      case LONG_BREAK:
        setTimerDuration(config.longBreak);
        break;
    }
  }, [
    setTimerDuration,
    timer.timerType,
    config.stayFocus,
    config.shortBreak,
    config.longBreak,
  ]);

  useEffect(() => {
    let timerInterval: number;

    if (timer.playing) {
      timerInterval = setInterval(() => {
        setCount((prevState) => {
          let remaining = prevState - 1;
          return remaining;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timer.playing]);

  useEffect(() => {
    if (settings.notificationProperty === "extra") {
      if (count === 61) {
        if (timer.timerType === SHORT_BREAK) {
          notification(
            "60 Seconds Left for Short Break",
            { body: "Please prepare yourself getting  back to work." },
            settings.enableVoiceAssistance && sixtySecondsLeftShortBreak
          );
        } else if (timer.timerType === LONG_BREAK) {
          notification(
            "60 Seconds Left for Long Break",
            { body: "Please prepare yourself getting  back to work." },
            settings.enableVoiceAssistance && sixtySecondsLeftLongBreak
          );
        } else if (timer.timerType === SPECIAL_BREAK) {
          notification(
            "60 Seconds Left for Special Break",
            { body: "Please prepare yourself getting  back to work." },
            settings.enableVoiceAssistance && sixtySecondsLeftSpecialBreak
          );
        }
      } else if (count === 31 && timer.timerType === STAY_FOCUS) {
        notification(
          "30 Seconds Left to Work",
          { body: "Please pause all media playing if there's one." },
          settings.enableVoiceAssistance && thirtySecondsLeftToWork
        );
      }
    }

    if (count === 0) {
      switch (timer.timerType) {
        case STAY_FOCUS:
          if (timer.round < config.sessionRounds) {
            setTimeout(() => {
              notification(
                "Work Time Finished",
                { body: "It is time to take a short break." },
                settings.enableVoiceAssistance && shortBreakStart
              );

              dispatch(setTimerType("SHORT_BREAK"));
            }, 1000);
          } else {
            setTimeout(() => {
              notification(
                "Session Rounds Completed",
                { body: "It is time to take a long break." },
                settings.enableVoiceAssistance && longBreakStart
              );

              dispatch(setTimerType("LONG_BREAK"));
            }, 1000);
          }
          break;

        case SHORT_BREAK:
          setTimeout(() => {
            notification(
              "Short Break Finished",
              { body: "It is time to focus and work again." },
              settings.enableVoiceAssistance && shortBreakFinished
            );

            dispatch(setTimerType("STAY_FOCUS"));
            dispatch(setRound(timer.round + 1));

            if (!settings.autoStartWorkTime) {
              dispatch(setPlay(false));
            }
          }, 1000);
          break;

        case LONG_BREAK:
          setTimeout(() => {
            notification(
              "Long Break Finished",
              { body: "It is time to focus and work again." },
              settings.enableVoiceAssistance && longBreakFinished
            );

            dispatch(setTimerType("STAY_FOCUS"));
            dispatch(setRound(1));

            if (!settings.autoStartWorkTime) {
              dispatch(setPlay(false));
            }
          }, 1000);
          break;

        case SPECIAL_BREAK:
          setTimeout(() => {
            notification(
              "Special Break Finished",
              { body: "It is time to focus and work again." },
              settings.enableVoiceAssistance && specialBreakFinished
            );

            dispatch(setTimerType("STAY_FOCUS"));

            if (!settings.autoStartWorkTime) {
              dispatch(setPlay(false));
            }
          }, 1000);
          break;
      }
    }
  }, [
    count,
    timer.round,
    timer.playing,
    timer.timerType,
    dispatch,
    notification,
    config.sessionRounds,
    settings.notificationProperty,
    settings.autoStartWorkTime,
    settings.enableVoiceAssistance,
  ]);

  useEffect(() => {
    if (settings.enableFullscreenBreak) {
      if (timer.timerType !== STAY_FOCUS) {
        setShouldFullscreen(true);
      } else {
        setShouldFullscreen(false);
      }
    }
  }, [settings.enableFullscreenBreak, timer.timerType]);

  return (
    <CounterContext.Provider
      value={{
        count,
        duration,
        resetTimerAction,
        shouldFullscreen,
        timerType: timer.timerType,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
