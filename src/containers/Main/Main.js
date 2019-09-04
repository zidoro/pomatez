import React from "react";
import { useStoreState } from "easy-peasy";

import { Timer, Control } from "../../components";

function Main() {
  const showConfig = useStoreState(({ nav }) => nav.showConfig);
  console.log(showConfig);
  return (
    <div className="main">
      <div className="main__body">
        <Timer />
        <Control />
      </div>
    </div>
  );
}

export default Main;
