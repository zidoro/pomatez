import React from "react";
import ReactDOM from "react-dom";
import {
  ConfigProvider,
  ControlProvider,
  NavProvider,
  SettingProvider,
  TimerProvider,
  UpdateProvider
} from "./models";
import App from "./App";

import "./stylesheets/main.scss";

ReactDOM.render(
  <NavProvider>
    <UpdateProvider>
      <ControlProvider>
        <SettingProvider>
          <ConfigProvider>
            <TimerProvider>
              <App />
            </TimerProvider>
          </ConfigProvider>
        </SettingProvider>
      </ControlProvider>
    </UpdateProvider>
  </NavProvider>,
  document.getElementById("root")
);
