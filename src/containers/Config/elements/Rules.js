import React, { useContext } from "react";
import {
  StoreContext,
  SET_WORK_TIME,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_SESSION_ROUNDS,
  RESTORE_DEFAULT,
  SET_RUNNING
} from "../../../models";
import { animated } from "react-spring";
import { useAnimate } from "../../../hooks";
import { Header, Slider } from "../../../components";

function TimerConfig() {
  const { o, x } = useAnimate({ axisX: -25 });

  const [, dispatchControl] = useContext(StoreContext).control;

  const [
    { workingTime, shortBreak, longBreak, sessionRounds },
    dispatchConfig
  ] = useContext(StoreContext).config;

  return (
    <animated.div
      className="rules"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <Header title="Rules" />
      <div className="config__sliders">
        <Slider
          timeType="Working Time"
          max={60}
          value={workingTime}
          onChange={({ target }) => {
            dispatchConfig({
              type: SET_WORK_TIME,
              payload: parseInt(target.value)
            });
            dispatchControl({ type: SET_RUNNING, payload: false });
          }}
        />
        <Slider
          timeType="Short Break"
          max={60}
          value={shortBreak}
          onChange={({ target }) => {
            dispatchConfig({
              type: SET_SHORT_BREAK,
              payload: parseInt(target.value)
            });
            dispatchControl({ type: SET_RUNNING, payload: false });
          }}
        />
        <Slider
          timeType="Long Break"
          max={60}
          value={longBreak}
          onChange={({ target }) => {
            dispatchConfig({
              type: SET_LONG_BREAK,
              payload: parseInt(target.value)
            });
            dispatchControl({ type: SET_RUNNING, payload: false });
          }}
        />
        <Slider
          timeType="Session Rounds"
          rangeType="round"
          max={10}
          value={sessionRounds}
          onChange={({ target }) => {
            dispatchConfig({
              type: SET_SESSION_ROUNDS,
              payload: parseInt(target.value)
            });
            dispatchControl({ type: SET_RUNNING, payload: false });
          }}
        />
      </div>

      <div className="config__button-wrapper">
        <button
          className="btn btn-restore"
          onClick={() => {
            dispatchConfig({ type: RESTORE_DEFAULT });
            dispatchControl({ type: SET_RUNNING, payload: false });
          }}
        >
          Restore Default
        </button>
      </div>
    </animated.div>
  );
}

export default TimerConfig;
