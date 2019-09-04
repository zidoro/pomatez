import React from "react";
import { StoreProvider, createStore } from "easy-peasy";

import Main from "./containers/Main";
import { Titlebar } from "./components";

import models from "./models";

const store = createStore(models);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="app">
        <Titlebar />
        <Main />
      </div>
    </StoreProvider>
  );
}

export default App;
