import React from "react";
import { animated } from "react-spring";
import { useAnimate } from "../../../hooks";
import { Header, Slider } from "../../../components";

function TimerConfig() {
  const { o, x } = useAnimate({ axisX: -25 });
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
        <Slider maximumX={60} valueX={25} timeType="Working Time" />
        <Slider maximumX={60} valueX={5} timeType="Short Break" />
        <Slider maximumX={60} valueX={15} timeType="Long Break" />
        <Slider
          maximumX={10}
          valueX={4}
          timeType="Session Rounds"
          rangeType="rounds"
        />
      </div>

      <div className="config__button-wrapper">
        <button className="btn btn-restore">Restore Default</button>
      </div>
    </animated.div>
  );
}

export default TimerConfig;
