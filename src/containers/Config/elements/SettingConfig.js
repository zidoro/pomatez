import React from "react";
import { animated } from "react-spring";
import useAnimation from "../../_hooks/useAnimation";

import { Header } from "../../../components";

function SettingConfig() {
  const { o, x } = useAnimation({ axisX: 25 });
  return (
    <animated.div
      className="setting-config"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <Header title="Setting" />
    </animated.div>
  );
}

export default SettingConfig;
