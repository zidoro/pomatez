import React, { useContext } from "react";
import {
  StoreContext,
  SET_RUNNING,
  SET_SILENT,
  SET_COUNTER
} from "../../models";
import { Next, Play, Reset, Volume } from "./elements";
import { addClass } from "../_helpers";

function Control() {
  const [{ running, silent }, dispatchControl] = useContext(
    StoreContext
  ).control;

  const [{ duration, round, timerType }, dispatchTimer] = useContext(
    StoreContext
  ).timer;

  const [{ sessionRounds }] = useContext(StoreContext).config;

  return (
    <div className="control">
      <div className="control__box">
        <div className="session">
          <p className="session__count">
            {round} / {sessionRounds}
          </p>
          <p className="session__name">Session</p>
        </div>

        <div className="action">
          <div className={`action__reset ${addClass(timerType)}`}>
            <Reset
              timerType={timerType}
              onClick={() => {
                dispatchTimer({
                  type: SET_COUNTER,
                  payload: duration
                });
                dispatchControl({
                  type: SET_RUNNING,
                  payload: false
                });
              }}
            />
          </div>

          <div className={`action__play ${addClass(timerType)}`}>
            <Play
              timerType={timerType}
              running={running}
              onClick={() =>
                dispatchControl({
                  type: SET_RUNNING,
                  payload: !running
                })
              }
            />
          </div>

          <div className="action__right">
            <div className={`action__next ${addClass(timerType)}`}>
              <Next timerType={timerType} />
            </div>

            <div className={`action__volume ${addClass(timerType)}`}>
              <Volume
                timerType={timerType}
                silent={silent}
                onClick={() =>
                  dispatchControl({
                    type: SET_SILENT,
                    payload: !silent
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;
