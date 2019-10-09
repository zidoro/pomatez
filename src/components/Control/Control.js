import React, { useContext } from "react";
import {
  StoreContext,
  SET_RUNNING,
  SET_SILENT,
  SET_COUNTER
} from "../../models";
import { Next, Play, Reset, Volume } from "./elements";

function Control() {
  const [{ running, silent }, dispatchControl] = useContext(
    StoreContext
  ).control;

  const [{ duration }, dispatchTimer] = useContext(StoreContext).timer;

  const [{ sessionRounds }] = useContext(StoreContext).config;

  return (
    <div className="control">
      <div className="control__box">
        <div className="session">
          <p className="session__count">1 / {sessionRounds}</p>
          <p className="session__name">Sessions</p>
        </div>

        <div className="action">
          <div className="action__reset">
            <Reset
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

          <div className="action__play">
            <Play
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
            <div className="action__next">
              <Next />
            </div>

            <div className="action__volume">
              <Volume
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
