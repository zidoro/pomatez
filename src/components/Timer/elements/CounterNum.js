import React from "react";
import PropTypes from "prop-types";
import { useDuration } from "../hooks";

function CounterNum({ duration, countDownName }) {
  const { mins, secs } = useDuration(duration);

  function setPad(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function resetPad(num) {
    return (num === 0 ? "0" : "") + num;
  }

  return (
    <div className="counter-num">
      <div className="counter-num__timer">
        {resetPad(mins)} <span>:</span> {setPad(secs)}
      </div>
      <div className="counter-num__heading">{countDownName}</div>
    </div>
  );
}

CounterNum.defaultProps = {
  duration: 0,
  countDownName: "Work"
};

CounterNum.propTypes = {
  duration: PropTypes.number,
  countDownName: PropTypes.string
};

export default CounterNum;
