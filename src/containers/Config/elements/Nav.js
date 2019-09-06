import React, { Fragment } from "react";
import { animated, useSpring, config } from "react-spring";

function Nav({ showSetting, setShowSetting }) {
  const { x } = useSpring({
    x: showSetting ? 50 : 0,
    config: config.stiff
  });
  return (
    <Fragment>
      <div className="nav">
        <div
          className={`nav__timer ${!showSetting && "active"}`}
          onClick={() => setShowSetting(false)}
        >
          <svg className="nav__timer--icon">
            <use xlinkHref="#icon-timer" />
          </svg>
        </div>
        <div
          className={`nav__setting ${showSetting && "active"}`}
          onClick={() => setShowSetting(true)}
        >
          <svg className="nav__setting--icon">
            <use xlinkHref="#icon-setting" />
          </svg>
        </div>
      </div>
      <animated.div
        className="active-indicator"
        style={{ left: x.interpolate(x => `${x}%`) }}
      />
    </Fragment>
  );
}

export default Nav;
