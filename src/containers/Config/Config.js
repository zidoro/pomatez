import React, { useContext, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { StoreContext, SHOW_SETTING } from "../../models";
import { Nav, SettingConfig, TimerConfig } from "./elements";

const { remote } = window.require("electron");

function Config({ showConfig }) {
  const { o, x, v } = useSpring({
    to: {
      o: showConfig ? 1 : 0,
      x: showConfig ? 0 : -32,
      v: showConfig ? "visible" : "hidden"
    },
    config: config.stiff
  });

  const [{ onTop, showSetting }, dispatchSetting] = useContext(
    StoreContext
  ).setting;

  useEffect(() => {
    remote.getCurrentWindow().setAlwaysOnTop(onTop);
  }, [onTop]);

  return (
    <animated.div
      className="config"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`),
        visibility: v
      }}
    >
      <div className="config__body">
        {showSetting ? <SettingConfig /> : <TimerConfig />}
      </div>

      <div className="config__nav">
        <Nav
          showSetting={showSetting}
          onClick={() =>
            dispatchSetting({
              type: SHOW_SETTING,
              payload: !showSetting
            })
          }
        />
      </div>
    </animated.div>
  );
}

export default Config;
