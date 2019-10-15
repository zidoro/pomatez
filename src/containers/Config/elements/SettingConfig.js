import React, { useContext } from "react";
import { animated } from "react-spring";
import { StoreContext, SET_ON_TOP, SET_NOTIFY } from "../../../models";
import { useAnimate } from "../../../hooks";

import { Header, Toggle, Shortcut } from "../../../components";

function SettingConfig() {
  const { o, x } = useAnimate({ axisX: 25 });

  const [{ onTop, notify }, dispatch] = useContext(StoreContext).setting;

  return (
    <animated.div
      className="setting-config"
      style={{
        opacity: o.interpolate(o => `${o}`),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
    >
      <Header title="Setting" />

      <div className="feature">
        <p className="section-header">App Features</p>
        <Toggle
          toggleName="Always On Top"
          switchId="on-top"
          isChecked={onTop}
          onChange={() =>
            dispatch({
              type: SET_ON_TOP,
              payload: !onTop
            })
          }
        />
        <Toggle
          toggleName="Desktop Notification"
          switchId="desktop-notication"
          isChecked={notify}
          onChange={() =>
            dispatch({
              type: SET_NOTIFY,
              payload: !notify
            })
          }
        />
        <Toggle
          toggleName="Enable Dark Mode"
          switchId="darkmode"
          isChecked={true}
        />
      </div>

      <div className="keyboard">
        <p className="section-header">Keyboard Shortcuts</p>
        <Shortcut
          shortcutName="Exit Full Screen Break"
          shortcutKey="Press Esc"
        />
        <Shortcut shortcutName="About the App" shortcutKey="Ctrl + H" />
        <Shortcut
          shortcutName="Check for Updates"
          shortcutKey="Ctrl + Shift + U"
        />
      </div>
    </animated.div>
  );
}

export default SettingConfig;
