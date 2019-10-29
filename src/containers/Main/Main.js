import React from "react";
import Counter from "../Counter";
import Config from "../Config";

function Main({ showConfig }) {
  return (
    <div className="app__body">
      <Counter />
      <Config showConfig={showConfig} />
    </div>
  );
}

export default React.memo(Main);
