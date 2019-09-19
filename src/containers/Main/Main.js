import React, { useContext } from "react";
import { StoreContext } from "../../models";
import { Counter } from "../Counter";
import { Config } from "../Config";

function Main() {
  const [{ showConfig }] = useContext(StoreContext).nav;

  return (
    <div className="app__body">
      <Counter showConfig={showConfig} />
      <Config showConfig={showConfig} />
    </div>
  );
}

export default Main;
