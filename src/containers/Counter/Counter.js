import React, { useContext, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { StoreContext, SET_TITLE } from "../../models";
import { Timer, Control } from "../../components";

function Counter({ showConfig }) {
  const { o, x } = useSpring({
    from: { o: 0, x: -32 },
    to: {
      o: showConfig ? 0 : 1,
      x: showConfig ? 32 : 0
    },
    config: config.stiff
  });
  const [, dispatch] = useContext(StoreContext).nav;

  useEffect(
    () =>
      dispatch({
        type: SET_TITLE,
        payload: "Time Management App"
      }),
    [dispatch]
  );

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
