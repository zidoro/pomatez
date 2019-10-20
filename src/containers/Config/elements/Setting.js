import React, { useContext, useEffect } from "react";
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

  const [{ running, fullScreen }, dispatchControl] = useContext(
    StoreContext
  ).control;

  const [
    { onTop, notify, darkMode, fullScreenOnBreak },
    dispatchSetting
  ] = useContext(StoreContext).setting;

  useEffect(() => {
    document.addEventListener(
      "keydown",
      e => {
        let keyCode = e.keyCode;
        let keyChar = String.fromCharCode(keyCode);

        if (e.ctrlKey && e.shiftKey && keyChar === "D") {
          dispatchSetting({
            type: SET_DARKMODE,
            payload: true
          });
        } else if (e.ctrlKey && e.shiftKey && keyChar === "L") {
          dispatchSetting({
            type: SET_DARKMODE,
            payload: false
          });
        }
      },
      true
    );
  }, [dispatchSetting, darkMode, fullScreen]);

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
        <Shortcut
          shortcutName="Switch Dark Mode"
          shortcutKey="Ctrl + Shift + D"
        />
        <Shortcut
          shortcutName="Switch Light Mode"
          shortcutKey="Ctrl + Shift + L"
        />
        <Shortcut
          shortcutName="Quit Application"
          shortcutKey="Ctrl + Alt + Q"
        />
      </div>
    </animated.div>
  );
}

export default SettingConfig;
