import React from "react";
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
  let secs = duration;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

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
