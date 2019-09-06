import React, { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { animated } from "react-spring";
import useAnimation from "../_hooks/useAnimation";

import { Timer, Control } from "../../components";

function Main() {
  const setTitle = useStoreActions(({ nav }) => nav.setTitle);

  useEffect(() => {
    setTitle("Time Management App");
  }, [setTitle]);

  const { o, x } = useAnimation({ axisX: -25 });
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
