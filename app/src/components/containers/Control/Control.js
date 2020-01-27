import React, { useContext, useCallback, useMemo } from "react";
import {
  SettingContext,
  ControlContext,
  TimerContext,
  ConfigContext,
  SET_RUNNING,
  SET_SILENT,
  SET_COUNTER,
  SET_TIMER_TYPE,
  SET_ROUND
} from "../../../models";
import { Next, Play, Reset, Volume } from "./elements";
import { addClass, WORK, SHORT_BREAK, LONG_BREAK } from "../../../helpers";

function Control() {
  const [{ fullScreen }] = useContext(SettingContext);

  const [{ running, silent }, dispatchControl] = useContext(ControlContext);

  const [{ duration, round, timerType }, dispatchTimer] = useContext(
    TimerContext
  );

  const [{ sessionRounds }] = useContext(ConfigContext);

  const onResetCallback = useCallback(() => {
    dispatchTimer({
      type: SET_COUNTER,
      payload: duration
    });
    dispatchControl({
      type: SET_RUNNING,
      payload: false
    });
  }, [dispatchTimer, dispatchControl, duration]);

  const onPlayingCallback = useCallback(
    () =>
      dispatchControl({
        type: SET_RUNNING,
        payload: !running
      }),
    [dispatchControl, running]
  );

  const onNextCallback = useCallback(() => {
    switch (timerType) {
      case WORK:
        if (round !== sessionRounds) {
          dispatchTimer({
            type: SET_TIMER_TYPE,
            payload: SHORT_BREAK
          });
        } else {
          dispatchTimer({
            type: SET_TIMER_TYPE,
            payload: LONG_BREAK
          });
        }
        break;

      case SHORT_BREAK:
        dispatchTimer({
          type: SET_TIMER_TYPE,
          payload: WORK
        });
        dispatchTimer({
          type: SET_ROUND,
          payload: round + 1
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
        break;
      default:
        return null;
    }

    dispatchControl({
      type: SET_RUNNING,
      payload: true
    });
  }, [dispatchControl, dispatchTimer, round, sessionRounds, timerType]);

  const onVolumeCallback = useCallback(
    () =>
      dispatchControl({
        type: SET_SILENT,
        payload: !silent
      }),
    [dispatchControl, silent]
  );

  return useMemo(() => {
    return (
      <div
        className="control"
        style={{
          opacity: fullScreen ? "0" : "1",
          visibility: fullScreen ? "hidden" : "visible"
        }}
      >
        <div className="control__box">
          <div className="session">
            <p className="session__count">
              {round} / {sessionRounds}
            </p>
            <p className="session__name">Session</p>
          </div>

          <div className="action">
            <div className={`action__reset ${addClass(timerType)}`}>
              <Reset timerType={timerType} onClick={onResetCallback} />
            </div>

            <div className={`action__play ${addClass(timerType)}`}>
              <Play
                timerType={timerType}
                running={running}
                onClick={onPlayingCallback}
              />
            </div>

            <div className="action__right">
              <div className={`action__next ${addClass(timerType)}`}>
                <Next timerType={timerType} onClick={onNextCallback} />
              </div>

              <div className={`action__volume ${addClass(timerType)}`}>
                <Volume
                  timerType={timerType}
                  silent={silent}
                  onClick={onVolumeCallback}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    fullScreen,
    onNextCallback,
    onPlayingCallback,
    onResetCallback,
    onVolumeCallback,
    round,
    running,
    sessionRounds,
    silent,
    timerType
  ]);
}

export default Control;
