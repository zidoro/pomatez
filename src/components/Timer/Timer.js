import React from "react";
import { CountDown, Progress } from "./elements";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__counter">
        <Progress />
        <CountDown timerType="Work" />
      </div>
    </div>
  );
}

export default Timer;
