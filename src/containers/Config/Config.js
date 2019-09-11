import React, { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { animated } from "react-spring";
import useAnimation from "../_hooks/useAnimation";

import Nav from "./elements/Nav";
import TimerConfig from "./elements/TimerConfig";
import SettingConfig from "./elements/SettingConfig";

function Config() {
  const setTitle = useStoreActions(({ nav }) => nav.setTitle);

  const [showSetting, setShowSetting] = useState(false);

  useEffect(() => {
    setTitle("User Configuration");
  }, [setTitle]);

  const { o, x } = useAnimation({ axisX: -25 });
  return (
    <animated.div
      className="config"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <div className="config_body">
        {showSetting ? <SettingConfig /> : <TimerConfig />}
      </div>

      <div className="config__nav">
        <Nav showSetting={showSetting} setShowSetting={setShowSetting} />
      </div>
    </animated.div>
  );
}

export default Config;
