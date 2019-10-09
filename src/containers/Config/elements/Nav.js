import React, { Fragment, useContext } from "react";
import { animated, useSpring, config } from "react-spring";
import { StoreContext, SHOW_SETTING } from "../../../models";

function Nav() {
  const [{ showSetting }, dispatch] = useContext(StoreContext).setting;

  const { x } = useSpring({
    x: showSetting ? 50 : 0,
    config: config.stiff
  });

  return (
    <Fragment>
      <div className="nav">
        <div
          className={`nav__timer ${!showSetting && "active"}`}
          onClick={() =>
            dispatch({
              type: SHOW_SETTING,
              payload: false
            })
          }
        >
          <svg className="nav__timer--icon">
            <use xlinkHref="#icon-timer" />
          </svg>
        </div>
        <div
          className={`nav__setting ${showSetting && "active"}`}
          onClick={() =>
            dispatch({
              type: SHOW_SETTING,
              payload: true
            })
          }
        >
          <svg className="nav__setting--icon">
            <use xlinkHref="#icon-setting" />
          </svg>
        </div>

        {/* <div
          className={`nav__key ${showSetting && "active"}`}
          onClick={onClick}
        >
          <svg className="nav__key--icon">
            <use xlinkHref="#icon-keyboard" />
          </svg>
        </div> */}
      </div>
      <animated.div
        className="active-indicator"
        style={{ left: x.interpolate(x => `${x}%`) }}
      />
    </Fragment>
  );
}

export default Nav;
