import React, { useContext, useEffect } from "react";
import { StoreContext, SET_TITLE } from "../../models";
import { Counter } from "../Counter";
import { Config } from "../Config";

const { remote } = window.require("electron");

function Main() {
  const [{ showConfig }, dispatch] = useContext(StoreContext).nav;

  useEffect(() => {
    let version = remote.app.getVersion();
    dispatch({
      type: SET_TITLE,
      payload: showConfig ? "User Configuration" : `Timeframe App ${version}`
    });
  }, [dispatch, showConfig]);

  return (
    <div className="app__body">
      <Counter showConfig={showConfig} />
      <Config showConfig={showConfig} />
    </div>
  );
}

export default Main;
