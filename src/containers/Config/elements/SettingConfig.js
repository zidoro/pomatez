import React, { useContext, useEffect } from "react";
import { animated } from "react-spring";
import {
  StoreContext,
  SET_ON_TOP,
  SET_NOTIFY,
  SET_FULL_SCREEN_ON_BREAK,
  SHOW_CONFIG,
  SET_RUNNING,
  SET_DARKMODE
} from "../../../models";
import { useAnimate } from "../../../hooks";

import { Header, Toggle, Shortcut } from "../../../components";
import { SHORT_BREAK, LONG_BREAK } from "../../../components/_helpers";

function SettingConfig() {
  const { o, x } = useAnimate({ axisX: 25 });

  const [, dispatchNav] = useContext(StoreContext).nav;

  const [{ running, fullScreen }, dispatchControl] = useContext(
    StoreContext
  ).control;

  const [{ timerType }] = useContext(StoreContext).timer;

  const [
    { onTop, notify, darkMode, fullScreenOnBreak },
    dispatchSetting
  ] = useContext(StoreContext).setting;

  useEffect(() => {
    window.addEventListener(
      "keydown",
      e => {
        let keyCode = e.keyCode;
        let keyChar = String.fromCharCode(keyCode);

        if (e.ctrlKey && e.shiftKey && keyChar === "D") {
          dispatchSetting({
            type: SET_DARKMODE,
            payload: !darkMode
          });
        }
      },
      true
    );
  }, [dispatchSetting, darkMode, fullScreen]);

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
            dispatchSetting({
              type: SET_ON_TOP,
              payload: !onTop
            })
          }
        />
        <Toggle
          toggleName="Show Notification"
          switchId="desktop-notication"
          isChecked={notify}
          onChange={() =>
            dispatchSetting({
              type: SET_NOTIFY,
              payload: !notify
            })
          }
        />
        <Toggle
          toggleName="Fullscreen On Break"
          switchId="fullscreen"
          isChecked={fullScreenOnBreak}
          onChange={() => {
            dispatchSetting({
              type: SET_FULL_SCREEN_ON_BREAK,
              payload: !fullScreenOnBreak
            });
            if (timerType === SHORT_BREAK || timerType === LONG_BREAK) {
              dispatchNav({
                type: SHOW_CONFIG,
                payload: false
              });
            }
            if (!running) {
              dispatchControl({
                type: SET_RUNNING,
                payload: true
              });
            }
          }}
        />
      </div>

      <div className="keyboard">
        <p className="section-header">Keyboard Shortcuts</p>
        <Shortcut
          shortcutName="Toggle Theme Mode"
          shortcutKey="Ctrl + Shift + D"
        />
        <Shortcut
          shortcutName="Quit Application"
          shortcutKey="Ctrl + Alt + Q"
        />
        <Shortcut
          shortcutName="Check for Updates"
          shortcutKey="Ctrl + Shift + U"
        />
      </div>
    </animated.div>
  );
}

export default SettingConfig;
