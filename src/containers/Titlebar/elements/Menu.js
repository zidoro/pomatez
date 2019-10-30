import React from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "react-spring";

Menu.propTypes = {
  showConfig: PropTypes.bool,
  onClick: PropTypes.func
};

Menu.defaultProps = {
  showConfig: false
};

function Menu({ showConfig, onClick }) {
  const { t, b, tw, mt } = useSpring({
    to: {
      t: showConfig ? -45 : 0,
      b: showConfig ? 45 : 0,
      tw: showConfig ? 1.1 : 2,
      mt: showConfig ? 0.5 : 0.6
    },
    config: {
      mass: 1,
      tension: 120,
      friction: 14,
      clamp: true
    }
  });
  return (
    <div className={`menu ${showConfig ? "active" : ""}`} onClick={onClick}>
      <div className="menu-box">
        <animated.div
          className="menu-box__icon"
          style={{
            width: tw.interpolate(tw => `${tw}rem`),
            transform: t.interpolate(t => `rotate(${t}deg)`)
          }}
        ></animated.div>
        <animated.div
          className="menu-box__icon"
          style={{
            marginTop: mt.interpolate(mt => `${mt}rem`),
            transform: b.interpolate(b => `rotate(${b}deg)`)
          }}
        ></animated.div>
      </div>
    </div>
  );
}

export default React.memo(Menu);
