import React, { useEffect } from "react";
import { StoreProvider, createStore } from "easy-peasy";
import { getSvg } from "./sprite";

import Home from "./containers/Home";
import { Titlebar } from "./components";

import models from "./models";

const store = createStore(models);

function App() {
  useEffect(() => getSvg(), []);
  return (
    <StoreProvider store={store}>
      <div className="app">
        <Titlebar />
        <Home />
      </div>
    </StoreProvider>
  );
}

export default App;
