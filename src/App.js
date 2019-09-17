import React, { useEffect } from "react";
import { Provider } from "./models";
import { getSvg } from "./sprite";

import { Titlebar } from "./components";
import { Main } from "./containers";

function App() {
  useEffect(() => getSvg(), []);
  return (
    <Provider>
      <div className="app">
        <Titlebar />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
