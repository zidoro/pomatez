import React, { useContext, useEffect, useCallback } from "react";
import { animated } from "react-spring";
import {
  ControlContext,
  SettingContext,
  SET_ON_TOP,
  SET_NOTIFY,
  SET_FULL_SCREEN_ON_BREAK,
  SET_RUNNING,
  SET_DARKMODE
} from "../../../models";

import { Header, Toggle, Shortcut } from "../../../components";

function Setting({ style }) {
  const [{ running }, dispatchControl] = useContext(ControlContext);

  const [{ onTop, notify, fullScreenOnBreak }, dispatchSetting] = useContext(
    SettingContext
  );

  const handleKeyPress = useCallback(
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
    [dispatchSetting]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
    return () => document.removeEventListener("keydown", handleKeyPress, false);
  }, [handleKeyPress]);

  return (
    <animated.div className="setting" style={style}>
      <Header title="Setting" />

      <div className="feature">
        <p className="section-header">App Features</p>
        <Toggle
          toggleName="Always On Top"
          switchId="on-top"
          isChecked={onTop}
          onChange={useCallback(
            () =>
              dispatchSetting({
                type: SET_ON_TOP,
                payload: !onTop
              }),
            [dispatchSetting, onTop]
          )}
        />
        <Toggle
          toggleName="Show Notification"
          switchId="desktop-notication"
          isChecked={notify}
          onChange={useCallback(
            () =>
              dispatchSetting({
                type: SET_NOTIFY,
                payload: !notify
              }),
            [dispatchSetting, notify]
          )}
        />
        <Toggle
          toggleName="Fullscreen On Break"
          switchId="fullscreen"
          isChecked={fullScreenOnBreak}
          onChange={useCallback(() => {
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
          }, [dispatchSetting, dispatchControl, fullScreenOnBreak, running])}
        />
      </div>

      <div className="keyboard">
        <p className="section-header">Keyboard Shortcuts</p>
        <Shortcut
          shortcutName="Switch to Dark Mode"
          shortcutKey="Ctrl + Shift + D"
        />
        <Shortcut
          shortcutName="Switch to Light Mode"
          shortcutKey="Ctrl + Shift + L"
        />
        <Shortcut
          shortcutName="Show the Application"
          shortcutKey="Ctrl + Alt + S"
        />
      </div>
    </animated.div>
  );
}

export default Setting;
