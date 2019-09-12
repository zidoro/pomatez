import React, { useEffect } from "react";
import { animated } from "react-spring";
import { useStore, useAnimate } from "../../hooks";
import { Timer, Control } from "../../components";

function Main() {
  const { setTitle } = useStore().actions;
  const { o, x } = useAnimate({ axisX: -25 });

  useEffect(() => {
    setTitle("Time Management App");
  }, [setTitle]);

  return (
    <animated.div
      className="main"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <Timer />
      <Control />
    </animated.div>
  );
}

export default Main;
