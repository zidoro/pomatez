import React from "react";
import { useStoreState } from "easy-peasy";
import { useTransition, animated, config } from "react-spring";
import { Timer, Control } from "../../components";

function Main() {
  const showConfig = useStoreState(({ nav }) => nav.showConfig);
  const transition = useTransition(!showConfig, null, {
    from: { opacity: 0, transform: "translate3d(-50px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50px, 0, 0)" },
    config: config.wobbly
  });
  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className="main" key={key} style={props}>
          <Timer />
          <Control />
        </animated.div>
      )
  );
}

export default Main;
