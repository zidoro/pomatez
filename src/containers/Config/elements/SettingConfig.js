import React, { useState } from "react";
import { animated } from "react-spring";
import useAnimation from "../../_hooks/useAnimation";

import { Header, Toggle, Shortcut } from "../../../components";

function SettingConfig() {
  const [isOnTop, setOnTop] = useState(false);
  const [isNotified, setNotified] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);

  const { o, x } = useAnimation({ axisX: 25 });
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
          isChecked={isOnTop}
          onChange={() => setOnTop(prevState => !prevState)}
        />
        <Toggle
          toggleName="Desktop Notification"
          switchId="desktop-notication"
          isChecked={isNotified}
          onChange={() => setNotified(prevState => !prevState)}
        />
        <Toggle
          toggleName="Enable Dark Mode"
          switchId="darkmode"
          isChecked={isDarkMode}
          onChange={() => setDarkMode(prevState => !prevState)}
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
