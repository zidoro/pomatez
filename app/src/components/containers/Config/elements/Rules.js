import React, { useContext, useCallback } from "react";
import {
  ControlContext,
  ConfigContext,
  SET_WORK_TIME,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_SESSION_ROUNDS,
  RESTORE_DEFAULT,
  SET_RUNNING
} from "../../../../models";
import { animated } from "react-spring";
import { Header, Slider } from "../../../common";

function Rules({ style }) {
  const [, dispatchControl] = useContext(ControlContext);

  const [
    { workingTime, shortBreak, longBreak, sessionRounds },
    dispatchConfig
  ] = useContext(ConfigContext);

  return (
    <animated.div className="rules" style={style}>
      <Header title="Rules" />
      <div className="config__sliders">
        <Slider
          timeType="Working Time"
          max={60}
          value={workingTime}
          onChange={useCallback(
            ({ target }) => {
              dispatchConfig({
                type: SET_WORK_TIME,
                payload: parseInt(target.value)
              });
              dispatchControl({ type: SET_RUNNING, payload: false });
            },
            [dispatchConfig, dispatchControl]
          )}
        />
        <Slider
          timeType="Short Break"
          max={60}
          value={shortBreak}
          onChange={useCallback(
            ({ target }) => {
              dispatchConfig({
                type: SET_SHORT_BREAK,
                payload: parseInt(target.value)
              });
              dispatchControl({ type: SET_RUNNING, payload: false });
            },
            [dispatchConfig, dispatchControl]
          )}
        />
        <Slider
          timeType="Long Break"
          max={60}
          value={longBreak}
          onChange={useCallback(
            ({ target }) => {
              dispatchConfig({
                type: SET_LONG_BREAK,
                payload: parseInt(target.value)
              });
              dispatchControl({ type: SET_RUNNING, payload: false });
            },
            [dispatchConfig, dispatchControl]
          )}
        />
        <Slider
          timeType={`Session Round${sessionRounds > 1 ? "s" : ""}`}
          rangeType={`round${sessionRounds > 1 ? "s" : ""}`}
          max={10}
          value={sessionRounds}
          onChange={useCallback(
            ({ target }) => {
              dispatchConfig({
                type: SET_SESSION_ROUNDS,
                payload: parseInt(target.value)
              });
              dispatchControl({ type: SET_RUNNING, payload: false });
            },
            [dispatchConfig, dispatchControl]
          )}
        />
      </div>

      <div className="config__button-wrapper">
        <button
          className="btn"
          onClick={useCallback(() => {
            dispatchConfig({
              type: RESTORE_DEFAULT
            });
            dispatchControl({
              type: SET_RUNNING,
              payload: false
            });
          }, [dispatchConfig, dispatchControl])}
        >
          Restore Default
        </button>
      </div>
    </animated.div>
  );
}

export default Rules;
