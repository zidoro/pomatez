import React, { useContext, useEffect } from "react";
import { animated } from "react-spring";
import { currentWindow } from "../../../helpers/window-electron";

import { SettingContext } from "../../../models";
import { useAnimateLeft, useAnimateRight } from "../../../hooks";
import { Nav, Setting, Rules } from "./elements";

function Config({ showConfig }) {
  const [{ onTop, showSetting }] = useContext(SettingContext);

  const configTransition = useAnimateLeft({ condition: showConfig, x: 32 });

  const contentTransition = useAnimateRight({ condition: showSetting, x: 25 });

  useEffect(() => currentWindow.setAlwaysOnTop(onTop, "screen-saver"), [onTop]);

  return configTransition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className="config" key={key} style={props}>
          <div className="config__body">
            {contentTransition.map(({ item, key, props }) =>
              item ? (
                <Setting key={key} style={props} />
              ) : (
                <Rules key={key} style={props} />
              )
            )}
          </div>

          <div className="config__nav">
            <Nav />
          </div>
        </animated.div>
      )
  );
}

export default Config;
