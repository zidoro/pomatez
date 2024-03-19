import React, { useState, useEffect, useCallback } from "react";
import useStayAwake from "use-stay-awake";
import { setRound, setTimerType, setPlay } from "store";
import { useNotification } from "hooks";
import { padNum, isEqualToOne } from "utils";

import notificationIcon from "assets/logos/notification-dark.png";

import breakFinishedWav from "assets/audios/break-finished.wav";
import focusFinishedWav from "assets/audios/focus-finished.wav";
import sessionCompletedWav from "assets/audios/session-completed.wav";
import sixtySecondsLeftWav from "assets/audios/sixty-seconds-left.wav";
import specialBreakStartedWav from "assets/audios/special-break-started.wav";
import thirtySecondsLeftWav from "assets/audios/thirty-seconds-left.wav";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import { TimerStatus } from "store/timer/types";

type CounterProps = {
  count: number;
  duration: number;
  timerType?: TimerStatus;
  resetTimerAction?: () => void;
  shouldFullscreen?: boolean;
};

const CounterContext = React.createContext<CounterProps>({
  count: 0,
  duration: 0,
});

const CounterProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const { timer, config } = useAppSelector((state) => ({
    timer: state.timer,
    config: state.config,
  }));

  const settings = useAppSelector((state) => state.settings);

  const { preventSleeping, allowSleeping } = useStayAwake();

  const notification = useNotification(
    {
      icon: notificationIcon,
      mute: !settings.notificationSoundOn,
    },
    settings.notificationType !== "none"
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
      case TimerStatus.STAY_FOCUS:
        setTimerDuration(config.stayFocus);
        break;
      case TimerStatus.SHORT_BREAK:
        setTimerDuration(config.shortBreak);
        break;
      case TimerStatus.LONG_BREAK:
        setTimerDuration(config.longBreak);
        break;
      case TimerStatus.SPECIAL_BREAK:
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
    if (timer.playing && timer.timerType !== TimerStatus.STAY_FOCUS) {
      preventSleeping();
    } else {
      allowSleeping();
    }
  }, [timer.playing, timer.timerType, preventSleeping, allowSleeping]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const { firstBreak, secondBreak, thirdBreak, fourthBreak } =
      config.specialBreaks;

    if (timer.playing) {
      interval = setInterval(() => {
        const date = new Date();
        const currentTime =
          padNum(date.getHours()) + ":" + padNum(date.getMinutes());

        if (timer.timerType !== TimerStatus.SPECIAL_BREAK) {
          if (firstBreak && currentTime === firstBreak.fromTime) {
            dispatch(setTimerType(TimerStatus.SPECIAL_BREAK));
            setTimerDuration(firstBreak.duration);
            notification(
              "Special break started.",
              {
                body: `Enjoy your ${firstBreak.duration} ${
                  isEqualToOne(firstBreak.duration)
                    ? "minute"
                    : "minutes"
                } special break.`,
              },
              specialBreakStartedWav
            );
            return;
          }

          if (secondBreak && currentTime === secondBreak.fromTime) {
            dispatch(setTimerType(TimerStatus.SPECIAL_BREAK));
            setTimerDuration(secondBreak.duration);
            notification(
              "Special break started.",
              {
                body: `Enjoy your ${secondBreak.duration} ${
                  isEqualToOne(secondBreak.duration)
                    ? "minute"
                    : "minutes"
                } special break.`,
              },
              specialBreakStartedWav
            );
            return;
          }

          if (thirdBreak && currentTime === thirdBreak.fromTime) {
            dispatch(setTimerType(TimerStatus.SPECIAL_BREAK));
            setTimerDuration(thirdBreak.duration);
            notification(
              "Special break started.",
              {
                body: `Enjoy your ${thirdBreak.duration} ${
                  isEqualToOne(thirdBreak.duration)
                    ? "minute"
                    : "minutes"
                } special break.`,
              },
              specialBreakStartedWav
            );
            return;
          }

          if (fourthBreak && currentTime === fourthBreak.fromTime) {
            dispatch(setTimerType(TimerStatus.SPECIAL_BREAK));
            setTimerDuration(fourthBreak.duration);
            notification(
              "Special break started.",
              {
                body: `Enjoy your ${fourthBreak.duration} ${
                  isEqualToOne(fourthBreak.duration)
                    ? "minute"
                    : "minutes"
                } special break.`,
              },
              specialBreakStartedWav
            );
            return;
          }
        } else {
          return clearInterval(interval);
        }
      }, 500);
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
      case TimerStatus.STAY_FOCUS:
        setTimerDuration(config.stayFocus);
        break;
      case TimerStatus.SHORT_BREAK:
        setTimerDuration(config.shortBreak);
        break;
      case TimerStatus.LONG_BREAK:
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
    let timerInterval: NodeJS.Timeout;

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
    if (settings.notificationType === "extra") {
      if (count === 61) {
        if (timer.timerType === TimerStatus.SHORT_BREAK) {
          notification(
            "60 seconds left.",
            { body: "Prepare yourself to stay focused again." },
            settings.enableVoiceAssistance && sixtySecondsLeftWav
          );
        } else if (timer.timerType === TimerStatus.LONG_BREAK) {
          notification(
            "60 seconds left.",
            { body: "Prepare yourself to stay focused again." },
            settings.enableVoiceAssistance && sixtySecondsLeftWav
          );
        } else if (timer.timerType === TimerStatus.SPECIAL_BREAK) {
          notification(
            "60 seconds left.",
            { body: "Prepare yourself to stay focused again." },
            settings.enableVoiceAssistance && sixtySecondsLeftWav
          );
        }
      } else if (
        count === 31 &&
        timer.timerType === TimerStatus.STAY_FOCUS
      ) {
        notification(
          "30 seconds left.",
          { body: "Pause all media playing if there's one." },
          settings.enableVoiceAssistance && thirtySecondsLeftWav
        );
      }
    }

    if (count === 0) {
      switch (timer.timerType) {
        case TimerStatus.STAY_FOCUS:
          if (timer.round < config.sessionRounds) {
            setTimeout(() => {
              notification(
                "Focus time finished.",
                {
                  body: `Enjoy your ${config.shortBreak} ${
                    isEqualToOne(config.shortBreak)
                      ? "minute"
                      : "minutes"
                  } short break.`,
                },
                settings.enableVoiceAssistance && focusFinishedWav
              );

              dispatch(setTimerType(TimerStatus.SHORT_BREAK));
            }, 1000);
          } else {
            setTimeout(() => {
              notification(
                "Session rounds completed.",
                {
                  body: `Enjoy your ${config.longBreak} ${
                    isEqualToOne(config.longBreak)
                      ? "minute"
                      : "minutes"
                  } long break.`,
                },
                settings.enableVoiceAssistance && sessionCompletedWav
              );

              dispatch(setTimerType(TimerStatus.LONG_BREAK));
            }, 1000);
          }
          break;

        case TimerStatus.SHORT_BREAK:
          setTimeout(() => {
            notification(
              "Break time finished.",
              {
                body: `Stay focused as much as possible for ${
                  config.stayFocus
                } ${
                  isEqualToOne(config.stayFocus) ? "minute" : "minutes"
                }.`,
              },
              settings.enableVoiceAssistance && breakFinishedWav
            );

            dispatch(setTimerType(TimerStatus.STAY_FOCUS));
            dispatch(setRound(timer.round + 1));

            if (!settings.autoStartWorkTime) {
              dispatch(setPlay(false));
            }
          }, 1000);
          break;

        case TimerStatus.LONG_BREAK:
          setTimeout(() => {
            notification(
              "Break time finished.",
              {
                body: `Stay focused as much as possible for ${
                  config.stayFocus
                } ${
                  isEqualToOne(config.stayFocus) ? "minute" : "minutes"
                }.`,
              },
              settings.enableVoiceAssistance && breakFinishedWav
            );

            dispatch(setTimerType(TimerStatus.STAY_FOCUS));
            dispatch(setRound(1));

            if (!settings.autoStartWorkTime) {
              dispatch(setPlay(false));
            }
          }, 1000);
          break;

        case TimerStatus.SPECIAL_BREAK:
          setTimeout(() => {
            notification(
              "Break time finished.",
              {
                body: `Stay focused as much as possible for ${
                  config.stayFocus
                } ${
                  isEqualToOne(config.stayFocus) ? "minute" : "minutes"
                }.`,
              },
              settings.enableVoiceAssistance && breakFinishedWav
            );

            dispatch(setTimerType(TimerStatus.STAY_FOCUS));

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
    config.stayFocus,
    config.shortBreak,
    config.longBreak,
    config.sessionRounds,
    settings.notificationType,
    settings.autoStartWorkTime,
    settings.enableVoiceAssistance,
  ]);

  useEffect(() => {
    if (settings.enableFullscreenBreak) {
      if (timer.timerType !== TimerStatus.STAY_FOCUS) {
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
