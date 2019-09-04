import React from "react";
import { useStoreState } from "easy-peasy";
import { useTransition, animated, config } from "react-spring";

function Config() {
  const showConfig = useStoreState(({ nav }) => nav.showConfig);
  const transition = useTransition(showConfig, null, {
    from: { opacity: 0, transform: "translate3d(-50px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50px, 0, 0)" },
    config: config.stiff
  });
  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className="config" key={key} style={props}>
          Configuration
        </animated.div>
      )
  );
}

export default Config;
