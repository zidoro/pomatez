import React from "react";
import CounterSvg from "./elements/CounterSvg";
import CounterNum from "./elements/CounterNum";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__counter">
        <CounterSvg />
        <CounterNum />
      </div>
    </div>
  );
}

export default Timer;
