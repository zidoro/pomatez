import React from "react";
import { useStoreState } from "easy-peasy";
import Main from "./Main";
import Config from "./Config";

function Home() {
  const showConfig = useStoreState(({ nav }) => nav.showConfig);
  return showConfig ? <Config /> : <Main />;
}

export default Home;
