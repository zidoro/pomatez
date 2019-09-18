import React, { useContext } from "react";
import {
  StoreContext,
  SET_WORK_TIME,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_SESSION_ROUNDS,
  RESTORE_DEFAULT
} from "../../../models";
import { animated } from "react-spring";
import { useAnimate } from "../../../hooks";
import { Header, Slider } from "../../../components";

function TimerConfig() {
  const { o, x } = useAnimate({ axisX: -25 });

  const [
    { workingTime, shortBreak, longBreak, sessionRounds },
    dispatch
  ] = useContext(StoreContext).config;

  return (
    <animated.div
      className="timer-config"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <Header title="Timer" />
      <div className="config__sliders">
        <Slider
          timeType="Working Time"
          maximumX={60}
          valueX={workingTime}
          onChange={({ x }) => dispatch({ type: SET_WORK_TIME, payload: x })}
        />
        <Slider
          timeType="Short Break"
          maximumX={60}
          valueX={shortBreak}
          onChange={({ x }) => dispatch({ type: SET_SHORT_BREAK, payload: x })}
        />
        <Slider
          timeType="Long Break"
          maximumX={60}
          valueX={longBreak}
          onChange={({ x }) => dispatch({ type: SET_LONG_BREAK, payload: x })}
        />
        <Slider
          timeType="Session Rounds"
          rangeType="rounds"
          maximumX={10}
          valueX={sessionRounds}
          onChange={({ x }) =>
            dispatch({ type: SET_SESSION_ROUNDS, payload: x })
          }
        />
      </div>

      <div className="config__button-wrapper">
        <button
          className="btn btn-restore"
          onClick={() => dispatch({ type: RESTORE_DEFAULT })}
        >
          Restore Default
        </button>
      </div>
    </animated.div>
  );
}

export default TimerConfig;
