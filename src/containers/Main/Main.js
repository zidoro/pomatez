import React, { useContext } from "react";
import { StoreContext } from "../../models";
import { Counter } from "../Counter";
import { Config } from "../Config";

function Main() {
  const [{ showConfig }] = useContext(StoreContext).nav;
  return showConfig ? <Config /> : <Counter />;
}

export default Main;
