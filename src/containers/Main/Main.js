import React, { useContext, useEffect } from "react";
import { StoreContext, SET_TITLE } from "../../models";
import { Counter } from "../Counter";
import { Config } from "../Config";

function Main() {
  const [{ showConfig }, dispatch] = useContext(StoreContext).nav;

  useEffect(
    () =>
      dispatch({
        type: SET_TITLE,
        payload: showConfig ? "User Configuration" : "Time Management App"
      }),
    [dispatch, showConfig]
  );

  return (
    <div className="app__body">
      <Counter showConfig={showConfig} />
      <Config showConfig={showConfig} />
    </div>
  );
}

export default Main;
