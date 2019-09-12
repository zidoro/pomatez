import React from "react";
import PropTypes from "prop-types";

function CounterSvg({ duration }) {
  let timeDuration = duration * 60;
  return (
    <svg className="counter-svg">
      <defs>
        <filter id="inset-shadow">
          <feFlood floodColor="rgba(0,0,0,.25)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
      </defs>
      <circle
        className="counter-svg__circle"
        id="circle-base"
        cx="160"
        cy="160"
        r="156"
        filter="url(#inset-shadow)"
      />
      <circle
        className="counter-svg__circle"
        id="circle-counter"
        cx="160"
        cy="160"
        r="156"
        style={{ animationDuration: `${timeDuration}s` }}
      />
    </svg>
  );
}

CounterSvg.defaultProps = {
  duration: 0
};

CounterSvg.propTypes = {
  duration: PropTypes.number
};

export default CounterSvg;
