import React, { useEffect } from "react";
import { animated } from "react-spring";
import { useStore, useAnimate } from "../../hooks";

import Nav from "./elements/Nav";
import TimerConfig from "./elements/TimerConfig";
import SettingConfig from "./elements/SettingConfig";

function Config() {
  const { showSetting } = useStore().states;
  const { setTitle, setShowSetting } = useStore().actions;

  useEffect(() => {
    setTitle("User Configuration");
  }, [setTitle]);

  const { o, x } = useAnimate({ axisX: -25 });
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
