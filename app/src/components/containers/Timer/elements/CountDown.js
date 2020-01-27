import React from "react";
import PropTypes from "prop-types";
import { addClass } from "../../../../helpers";

CountDown.propTypes = {
  counter: PropTypes.number,
  timerType: PropTypes.string.isRequired
};

CountDown.defaultProps = {
  counter: 0
};

function CountDown({ counter, timerType }) {
  let secs = counter;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

  const setPad = num => (num < 10 ? "0" : "") + num;
  return (
    <div className="countdown">
      <div className={`countdown__timer ${addClass(timerType)}`}>
        {setPad(mins)} <span>:</span> {setPad(secs)}
      </div>
      <div className="countdown__heading">{timerType}</div>
    </div>
  );
}

export default React.memo(CountDown);
