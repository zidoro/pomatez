import React, { useContext, useEffect } from "react";
import { StoreContext, SET_TITLE } from "../../models";
import { Timer, Control } from "../../components";
import { useAnimate } from "../../hooks";
import { animated } from "react-spring";

function Counter() {
  const { o, x } = useAnimate({ axisX: -25 });
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

export default Counter;
