import React, { Fragment, useContext, useCallback } from "react";
import { animated, useSpring, config } from "react-spring";
import { StoreContext, SHOW_SETTING } from "../../../models";

function Nav() {
  const [{ showSetting }, dispatchSetting] = useContext(StoreContext).setting;

  const { x } = useSpring({
    x: showSetting ? 50 : 0,
    config: config.stiff
  });

  return (
    <Fragment>
      <div className="nav">
        <div
          className={`nav__timer ${!showSetting && "active"}`}
          onClick={useCallback(
            () =>
              dispatchSetting({
                type: SHOW_SETTING,
                payload: false
              }),
            [dispatchSetting]
          )}
        >
          <svg className="nav__timer--icon">
            <use xlinkHref="#icon-timer" />
          </svg>
        </div>
        <div
          className={`nav__setting ${showSetting && "active"}`}
          onClick={useCallback(
            () =>
              dispatchSetting({
                type: SHOW_SETTING,
                payload: true
              }),
            [dispatchSetting]
          )}
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
