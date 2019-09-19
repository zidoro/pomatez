import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

CountDown.propTypes = {
  duration: PropTypes.number,
  timerType: PropTypes.string
};

CountDown.defaultProps = {
  duration: 0,
  timerType: "Work"
};

function CountDown({ duration, timerType }) {
  const [time, setTime] = useState(0);

  let secs = time;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

  useEffect(() => {
    let count = duration;
    setTime(count);
    let interval = setInterval(() => {
      if (count <= 0) {
        count = 0;
        clearInterval(interval);
        setTime(0);
      } else {
        count--;
        setTime(count);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const setPad = num => (num < 10 ? "0" : "") + num;
  const resetPad = num => (num === 0 ? "0" : "") + num;
  return (
    <div className="countdown">
      <div className="countdown__timer">
        {resetPad(mins)} <span>:</span> {setPad(secs)}
      </div>
      <div className="countdown__heading">{timerType}</div>
    </div>
  );
}

export default CountDown;
