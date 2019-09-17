import React, { useEffect, useContext } from "react";
import { animated } from "react-spring";

import { StoreContext, SET_TITLE, SHOW_SETTING } from "../../models";
import { useAnimate } from "../../hooks";

import { Nav, SettingConfig, TimerConfig } from "./elements";

function Config() {
  const { o, x } = useAnimate({ axisX: -25 });

  const [, dispatchNav] = useContext(StoreContext).nav;
  const [{ showSetting }, dispatchSetting] = useContext(StoreContext).setting;

  useEffect(
    () =>
      dispatchNav({
        type: SET_TITLE,
        payload: "User Configuration"
      }),
    [dispatchNav]
  );

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
        <Nav
          showSetting={showSetting}
          onClick={() => dispatchSetting({ type: SHOW_SETTING })}
        />
      </div>
    </animated.div>
  );
}

export default Config;
