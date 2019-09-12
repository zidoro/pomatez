import React from "react";
import { useStore } from "../hooks";

import Main from "./Main";
import Config from "./Config";

function Home() {
  const { showConfig } = useStore().states;
  return showConfig ? <Config /> : <Main />;
}

export default Home;
