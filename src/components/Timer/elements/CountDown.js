import React from "react";
import PropTypes from "prop-types";

CountDown.propTypes = {
  counter: PropTypes.number,
  timerType: PropTypes.string
};

CountDown.defaultProps = {
  counter: 0,
  // timerType: "Work"
};

function CountDown({ counter, timerType }) {
  let secs = counter;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

  const setPad = num => (num < 10 ? "0" : "") + num;
  return (
    <div className="countdown">
      <div className="countdown__timer">
        {setPad(mins)} <span>:</span> {setPad(secs)}
      </div>
      <div className="countdown__heading">{timerType}</div>
    </div>
  );
}

export default CountDown;
