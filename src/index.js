import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./models";
import App from "./App";

import "./stylesheets/main.scss";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
