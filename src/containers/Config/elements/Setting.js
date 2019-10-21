import React, { useContext, useEffect, useCallback } from "react";
import { animated } from "react-spring";
import {
  StoreContext,
  SET_ON_TOP,
  SET_NOTIFY,
  SET_FULL_SCREEN_ON_BREAK,
  SET_RUNNING,
  SET_DARKMODE
} from "../../../models";
import { useAnimate } from "../../../hooks";

import { Header, Toggle, Shortcut } from "../../../components";

function SettingConfig() {
  const { o, x } = useAnimate({ axisX: 25 });

  const [{ running }, dispatchControl] = useContext(StoreContext).control;

  const [{ onTop, notify, fullScreenOnBreak }, dispatchSetting] = useContext(
    StoreContext
  ).setting;

  const handleKeyPress = useCallback(
    e => {
      let keyCode = e.keyCode;
      let keyChar = String.fromCharCode(keyCode);

      if (e.ctrlKey && keyChar === "D") {
        dispatchSetting({
          type: SET_DARKMODE,
          payload: true
        });
      } else if (e.ctrlKey && keyChar === "L") {
        dispatchSetting({
          type: SET_DARKMODE,
          payload: false
        });
      } else if (keyCode === 32) {
        dispatchControl({
          type: SET_RUNNING,
          payload: !running
        });
      }
    },
    [dispatchSetting, dispatchControl, running]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <animated.div
      className="setting"
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
        <Shortcut shortcutName="Switch to Dark Mode" shortcutKey="Ctrl + D" />
        <Shortcut shortcutName="Switch to Light Mode" shortcutKey="Ctrl + L" />
        <Shortcut
          shortcutName="Quit Application"
          shortcutKey="Ctrl + Alt + Q"
        />
      </div>
    </animated.div>
  );
}

export default SettingConfig;
