import React from "react";
import { animated, useSpring, config } from "react-spring";
import { Timer, Control } from "../../components";

function Counter() {
  const { o, x } = useSpring({
    from: { o: 0, x: -32 },
    to: {
      o: 1,
      x: 0
    },
    config: config.stiff
  });

  return (
    <animated.div
      className="counter"
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

export default Counter;
