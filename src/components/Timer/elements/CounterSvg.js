import React from "react";

function CounterSvg() {
  return (
    <svg className="counter-svg">
      <defs>
        <filter id="inset-shadow">
          <feFlood flood-color="rgba(0,0,0,.25)" />
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
      />
    </svg>
  );
}

export default CounterSvg;
