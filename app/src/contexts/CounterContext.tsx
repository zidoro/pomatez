import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  STAY_FOCUS,
  SHORT_BREAK,
  setRound,
  setTimerType,
  LONG_BREAK,
  TimerTypes,
  SPECIAL_BREAK,
} from "store";
import { useNotification } from "hooks";

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

import notificationIcon from "assets/logos/notification.png";
import notificationIconDark from "assets/logos/notification-dark.png";

type CounterProps = {
  count: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration?: React.Dispatch<React.SetStateAction<number>>;
  timerType?: TimerTypes["timerType"];
  resetTimerAction?: () => void;
};

const CounterContext = React.createContext<CounterProps>({
  count: 0,
  duration: 0,
});

const CounterProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const {
    round,
    playing,
    timerType,
    stayFocus,
    shortBreak,
    longBreak,
    sessionRounds,
    specialBreaks,
    enableSpecialBreaks,
    notificationSoundOn,
    enableNotifications,
    darkMode,
  } = useSelector(({ timer, config, settings }: AppStateTypes) => ({
    round: timer.round,
    playing: timer.playing,
    timerType: timer.timerType,
    stayFocus: config.stayFocus,
    shortBreak: config.shorBreak,
    longBreak: config.longBreak,
    sessionRounds: config.sessionRounds,
    specialBreaks: config.specialBreaks,
    enableSpecialBreaks: settings.enableSpecialBreaks,
    notificationSoundOn: settings.notificationSoundOn,
    enableNotifications: settings.enableNotifications,
    darkMode: settings.enableDarkTheme,
  }));

  const notification = useNotification(
    {
      icon: darkMode ? notificationIconDark : notificationIcon,
      mute: !notificationSoundOn,
    },
    enableNotifications
  );

  const [count, setCount] = useState(stayFocus * 60);

  const [duration, setDuration] = useState(stayFocus * 60);

  const setTimerDuration = useCallback((time: number) => {
    setDuration(time * 60);
    setCount(time * 60);
  }, []);

  const resetTimerAction = useCallback(() => {
    switch (timerType) {
      case STAY_FOCUS:
        setTimerDuration(stayFocus);
        break;
      case SHORT_BREAK:
        setTimerDuration(shortBreak);
        break;
      case LONG_BREAK:
        setTimerDuration(longBreak);
        break;
      case SPECIAL_BREAK:
        setDuration(duration);
        setCount(duration);
        break;
    }
  }, [
    longBreak,
    setTimerDuration,
    stayFocus,
    shortBreak,
    timerType,
    setDuration,
    duration,
  ]);

  useEffect(() => {
    let interval: number;

    const { firstBreak, secondBreak, thirdBreak, fourthBreak } = specialBreaks;

    if (enableSpecialBreaks && playing) {
      interval = setInterval(() => {
        const d = new Date();
        const ct = d.getHours() + ":" + d.getMinutes();

        if (timerType !== SPECIAL_BREAK) {
          switch (ct) {
            case firstBreak.time:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(firstBreak.duration);
              notification(
                "Special Break",
                { body: "It is time to take your special break with joy." },
                specialBreakStart
              );
              break;
            case secondBreak.time:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(secondBreak.duration);
              notification(
                "Special Break",
                { body: "It is time to take your special break with joy." },
                specialBreakStart
              );
              break;
            case thirdBreak.time:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(thirdBreak.duration);
              notification(
                "Special Break",
                { body: "It is time to take your special break with joy." },
                specialBreakStart
              );
              break;
            case fourthBreak.time:
              dispatch(setTimerType("SPECIAL_BREAK"));
              setTimerDuration(fourthBreak.duration);
              notification(
                "Special Break",
                { body: "It is time to take your this break with joy." },
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
    enableSpecialBreaks,
    setTimerDuration,
    specialBreaks,
    timerType,
    dispatch,
    playing,
    notification,
  ]);

  useEffect(() => {
    switch (timerType) {
      case STAY_FOCUS:
        setTimerDuration(stayFocus);
        break;
      case SHORT_BREAK:
        setTimerDuration(shortBreak);
        break;
      case LONG_BREAK:
        setTimerDuration(longBreak);
        break;
    }
  }, [setTimerDuration, timerType, stayFocus, shortBreak, longBreak]);

  useEffect(() => {
    let interval: number;
    let counter = count;

    if (playing) {
      interval = setInterval(() => {
        counter--;
        setCount(counter);
        if (counter === 60) {
          if (timerType === SHORT_BREAK) {
            notification(
              "60 Seconds Left for Short Break",
              { body: "Please prepare yourself getting  back to work." },
              sixtySecondsLeftShortBreak
            );
          } else if (timerType === LONG_BREAK) {
            notification(
              "60 Seconds Left for Long Break",
              { body: "Please prepare yourself getting  back to work." },
              sixtySecondsLeftLongBreak
            );
          } else if (timerType === SPECIAL_BREAK) {
            notification(
              "60 Seconds Left for Special Break",
              { body: "Please prepare yourself getting  back to work." },
              sixtySecondsLeftSpecialBreak
            );
          }
        }

        // Added 1 second due to notification delay
        if (counter === 30 && timerType === STAY_FOCUS) {
          notification(
            "30 Seconds Left to Work",
            { body: "Please pause all media playing if there's one." },
            thirtySecondsLeftToWork
          );
        }

        if (counter === 0) {
          switch (timerType) {
            case STAY_FOCUS:
              if (round < sessionRounds) {
                dispatch(setTimerType("SHORT_BREAK"));
                notification(
                  "Work Time Finished",
                  { body: "It is time to take a short break." },
                  shortBreakStart
                );
              } else {
                dispatch(setTimerType("LONG_BREAK"));
                notification(
                  "Session Rounds Completed",
                  { body: "It is time to take a long break." },
                  longBreakStart
                );
              }
              break;

            case SHORT_BREAK:
              dispatch(setTimerType("STAY_FOCUS"));
              dispatch(setRound(round + 1));
              notification(
                "Short Break Finished",
                { body: "It is time to focus and work again." },
                shortBreakFinished
              );
              break;

            case LONG_BREAK:
              dispatch(setTimerType("STAY_FOCUS"));
              dispatch(setRound(1));
              notification(
                "Long Break Finished",
                { body: "It is time to focus and work again." },
                longBreakFinished
              );
              break;

            case SPECIAL_BREAK:
              dispatch(setTimerType("STAY_FOCUS"));
              notification(
                "Special Break Finished",
                { body: "It is time to focus and work again." },
                specialBreakFinished
              );
              break;
          }
          return clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    playing,
    count,
    round,
    sessionRounds,
    shortBreak,
    longBreak,
    timerType,
    dispatch,
    duration,
    notification,
  ]);

  return (
    <CounterContext.Provider
      value={{
        count,
        setCount,
        duration,
        setDuration,
        timerType,
        resetTimerAction,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
