import React, { useEffect, useContext } from "react";
import { StoreContext } from "./models";
import { getSvg } from "./sprite";

import { Titlebar } from "./components";
import { Main } from "./containers";

function App() {
  const [{ darkMode }] = useContext(StoreContext).setting;

  useEffect(() => getSvg(), []);
  useEffect(() => {
    let theme = darkMode ? "dark" : "light";
    let mainElement = document.documentElement;
    mainElement.setAttribute("data-theme", theme);
  }, [darkMode]);

  return (
    <div className="app">
      <Titlebar />
      <Main />
    </div>
  );
}

export default App;
