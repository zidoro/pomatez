import React from "react";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__circle">
        <div className="counter">
          <h3 className="counter__heading">
            25 <span>:</span>00
          </h3>
          <p className="counter__title">Work</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
