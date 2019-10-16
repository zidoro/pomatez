import React, { useEffect, useContext } from "react";
import { StoreContext } from "./models";
import { getSvg } from "./sprite";

import { Titlebar } from "./components";
import { Main } from "./containers";

const { remote } = window.require("electron");

function App() {
  const [{ darkMode }] = useContext(StoreContext).setting;

  useEffect(() => getSvg(), []);
  useEffect(() => {
    let theme = darkMode ? "dark" : "light";
    let mainElement = document.documentElement;
    mainElement.setAttribute("data-theme", theme);

    remote.getCurrentWindow().setBackgroundColor(darkMode ? "#222c33" : "#fff");
  }, [darkMode]);

  return (
    <div className="app">
      <Titlebar />
      <Main />
    </div>
  );
}

export default App;
