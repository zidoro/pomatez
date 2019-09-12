import React from "react";
import { CounterNum, CounterSvg } from "./elements";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__counter">
        <CounterSvg duration={25} />
        <CounterNum duration={25} countDownName="Work" />
      </div>
    </div>
  );
}

export default Timer;
